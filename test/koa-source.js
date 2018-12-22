const mid1 = async (ctx, next) => {
    ctx.title = "A1";
    await next();
    ctx.title +="A2";
}

const mid2 = async (ctx, next) => {
    ctx.title += "B1";
    await next();

    ctx.title +="B2";
}

const mid3 = async (ctx, next) => {
    ctx.title += "C1";
    await next();
    ctx.title +="C2";
}
const middleware = [mid1, mid2, mid3];

//koa2源码
// function compose(middleware) {
//     return function (context, next) {
//         // last called middleware #
//         let index = -1
//         return dispatch(0)
//         function dispatch(i) {
//             index = i
//             let fn = middleware[i]
//             if (i === middleware.length) fn = next
//             if (!fn) return Promise.resolve()
//             return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
//         }
//     }
// }
const ctx = {};
const compose = function (middleware) {
    //递归的使用:一些重复的步骤 for循环/操作外面套一个递归方法 next中:1.拿到func 2.调用func并传入next 匿名函数中:从0执行next()
    //1.不把next透漏出去        next()中取出func[i] 执行func(ctx) 再执行next() 
    //2.next透露出去 外部函数中执行next         next()中取出func[i] 执行func(ctx,next) 本质上和不透露没区别
    //3.返回promise(next中的promise)+await这个promise = 让程序停止在await的时候 无法通过递归实现洋葱
    let index = 0;

    return function () {
        const next = function () {
            if (index == middleware.length) {
                return;
            }
            const func = middleware[index];
            index++;
            return Promise.resolve(func(ctx,next));
        }
        const func1 = middleware[0];
        return func1(ctx, next);
    }
}
compose(middleware)().then(()=>{
    console.log(ctx);

});

const tail1 = function(i){
    if(i>3){
        return;
    }else{
        console.log('修改前',i);        
        tail(i+1);
        console.log("修改后",i);
    }
}
const tail2 = function(i){
    if(i>3){
        return i;
    }else{
        console.log("修改之前:",i)
        return tail2(i+1);      
    }
}
