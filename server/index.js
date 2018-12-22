const Koa = require('koa');
const app = new Koa();
const http = require('http');
const logger = require('koa-logger');

app.use(async (ctx, next) => {
    ctx.body="电影首页";
});
app.listen(4455);