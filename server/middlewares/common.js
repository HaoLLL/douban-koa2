const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
export const addBodyParser = app => {
    app.use(bodyParser());
}
export const addLogger = app => {
    app.use(logger());
}

export const addSession = app => {
    app.keys = ['imooc-trailer'];
    const CONFIG = {
        key: 'koa:sess',
        maxAge: 86400000,//24小时
        overwrite: true,
        httpOnly: false,
        signed: true,
        rolling: false
    }
    app.use(session(CONFIG, app));
}