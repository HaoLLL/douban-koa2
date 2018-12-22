const Koa = require('koa');
const app = new Koa();
const http = require('http');
const logger = require('koa-logger');
const { normalTpl, ejsTpl, pugTpl } = require('./tpl');
const ejs = require('ejs')
const pug = require('pug');

app.use(async (ctx, next) => {
    ctx.type = 'text/html;charset=utf-8';
    ctx.body = pug.render(pugTpl,{
        you: 'pug',
        me: 'HaoLLL'
    })
});
app.listen(4455);