const Koa = require('koa');
const app = new Koa();
const http = require('http');
const logger = require('koa-logger');
const { normalTpl, ejsTpl, pugTpl } = require('./tpl');
const ejs = require('ejs')
const pug = require('pug');
const views = require('koa-views');
const { resolve } = require('path');

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

// app.use(async (ctx, next) => {
//     ctx.type = 'text/html;charset=utf-8';
//     ctx.body = pug.render(pugTpl, {
//         you: 'pug',
//         me: 'HaoLLL'
//     })
// });

//render经过views的执行 被挂载到ctx上下文中
app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'pug with koa-views',
        me: 'HaoLLL'
    })
})
app.listen(4455);