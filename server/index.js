const Koa = require('koa');
const http = require('http');
const logger = require('koa-logger');
const { normalTpl, ejsTpl, pugTpl } = require('./tpl');
const ejs = require('ejs')
const pug = require('pug');
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchemas,initAdmin } = require('./database/init.js');
const mongoose = require('mongoose');
const R = require('ramda');
const MIDDLEWARES = ['common','router','parcel'];//中间件文件的name

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                // initWith是每一个router
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES);
}

(async () => {
    await connect();
    initSchemas();
    initAdmin();
    // require('./tasks/movie')
    // require('./tasks/api')
    const app = new Koa();
    await useMiddlewares(app);
    app.listen(4455);
})();





// app.use(views(resolve(__dirname, './views'), {
//     extension: 'pug'
// }))

// app.use(async (ctx, next) => {
//     ctx.type = 'text/html;charset=utf-8';
//     ctx.body = pug.render(pugTpl, {
//         you: 'pug',
//         me: 'HaoLLL'
//     })
// });

//render经过views的执行 被挂载到ctx上下文中
// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         you: 'pug with koa-views',
//         me: 'HaoLLL'
//     })
// })