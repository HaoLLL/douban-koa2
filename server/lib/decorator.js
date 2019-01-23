const Router = require('koa-router');
const glob = require('glob');
const { resolve } = require('path');
const _ = require('lodash');

const symbolPrefix = Symbol('prefix');
const routerMap = new Map();
const isArray = c => _.isArray(c) ? c : [c];
const R = require('ramda');

//所有route的导出类
export class Route {
    constructor(app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router();
    }

    init() {
        glob.sync(resolve(this.apiPath, './**/*.js')).forEach((item) => {
            require(item);//执行有装饰器的文件 用到下面的函数 开始处理controller装饰器 get装饰器
        })

        //conf(target类:target:类；method:'get'字符串;path:path(二级路径)) controller:一个类中的方法
        for (let [conf, controller] of routerMap) {
            const controllers = isArray(controller);//可以是中间件数组
            let prefixPath = conf.target[symbolPrefix];//存在原型对象中
            if (prefixPath) prefixPath = normalizePath(prefixPath);
            const routerPath = prefixPath + conf.path;
            // this.router.get('/', async (ctx, next) => {
            // });
            //其实是存储
            this.router[conf.method](routerPath, ...controllers);
        }

        this.app.use(this.router.routes()).use(this.router.allowedMethods())

    }
}
export const normalizePath = path => path.startsWith('/') ? path : `/${path}`;

//Symbol函数 有静态属性 静态方法 绝对不会重复 根路径
export const controller = path => target => (target.prototype[symbolPrefix] = path)

//target:class key:方法 descriptor(写 枚举 配置) 
//给一个path 自动封装成router的参数 修饰一个class
// routerMap中:{{target类:target:类；getmethod:getmethod;path:path(二级路径)}:一个类中的方法}
export const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path);
    routerMap.set({
        target: target,
        ...conf
    }, target[key])//[Function:run]
}
export const get = path => router({
    method: 'get',
    path: path
})

export const post = path => router({
    method: 'post',
    path: path
})

export const put = path => router({
    method: 'put',
    path: path
})

export const del = path => router({
    method: 'del',
    path: path
})

export const use = path => router({
    method: 'use',
    path: path
})

export const all = path => router({
    method: 'all',
    path: path
})

const changeToArr = R.unless(
    R.is(isArray),
    R.of
)

const decorate = (args, middleware) => {
    let [target, key, descriptor] = args;
    target[key] = isArray(target[key]);
    target[key].unshift(middleware);
    return descriptor

}

// const convert = middleware => (target, key, descriptor) => {
//     return (target, key, descriptor) => {
//         target[key] = R.compose(
//             R.concat(
//                 changeToArr(middleware)
//             ),
//             changeToArr
//         )(target[key]);
//         return descriptor;
//     }
// }
const convert = middleware => (...args) => decorate(args, middleware)

// 通过convert转成一个中间件
export const auth = convert(async (ctx, next) => {
    if (!ctx.session.user) {
        return ctx.body = {
            success: false,
            code: 401,
            err: '登录信息失效,重新登录'
        }
    }
    await next();
})

export const admin = roleExpected => convert(async (ctx, next) => {
    const { role } = ctx.session.user;
    // 可以建立一个规则
    /**
     * const rule={规定权限组 命中以后可以访问资源
     * admin:[1,4,5]
     * superAdmin:[1,2,3,4]
     * }
     */

    if (!role || role !== roleExpected) {
        return ctx.body = {
            success: false,
            code: 403,
            err: '你没有权限,来错了地方'
        }
    }
    await next();
})


export const required = rules => convert(async (ctx, next) => {
    let errors = [];
    R.forEachObjIndexed(
        (value, key) => {
            errors = errors.concat(
                R.filter(i => !R.has(i, ctx.request[key]))(rules)
            )
        }
    )
    // R.forEachObjIndexed(
    //     (val, key) => {
    //       errs = errs.concat(
    //         R.filter(
    //           name => !R.has(name, ctx.request[key])
    //         )(val)
    //       )
    //     }
    //   )(paramsObj)

    //   if (!R.isEmpty(errs)) {
    //     return (
    //       ctx.body = {
    //         success: false,
    //         errCode: 412,
    //         errMsg: `${R.join(', ', errs)} is required`
    //       }
    //     )
    //   }
    if (errors) return (
        ctx.body = {
            success: false,
            errCode: 412,
            errMsg: `${R.join(', ', errors)} is required`
        }
    )
})