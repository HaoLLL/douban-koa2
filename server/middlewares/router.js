const {Route}  = require('../lib/decorator');
const {resolve} = require('path');
export const router = app =>{
    const apiPath = resolve(__dirname,'../routes');//确定那些文件有装饰器
    const router =new Route(app,apiPath);
    router.init();//require()的时候执行装饰器

}