const {
    checkPassword
} = require('../service/admin');

const Router = require('koa-router');
const mongoose = require('mongoose');
const router = new Router();

const {
    controller,
    get,
    post,
    put,
    auth,
    admin,
    required
} = require('../lib/decorator');

const {
    getAllMovies,
} = require('../service/movie');

//controller层
@controller('/admin')
export class adminController {
    @get('/movie/list')
    @auth
    @admin('admin')
    // post请求可以检查字段个数是不是正确
    async getMovieList(ctx, next) {
        const Movie = mongoose.model('Movie');
        const movies = await getAllMovies()
        ctx.body = {
            success: true,
            data: movies
        }
    }

    @post('/login')
    // @required({
    //     body: ['email', 'password']
    // })
    async login(ctx, next) {
        const { email, password } = ctx.request.body;
        console.log(email + "" + password);
        const matchData = await checkPassword(email, password);
        if (!matchData.user) {
            return (ctx.body = {
                success: false,
                err: '用户不存在'
            })
        }
        if (matchData.match) {
            ctx.session.user = {
                _id:matchData.user._id,
                email:matchData.user.email,
                role:matchData.user.role,
                username:matchData.user.username
            }
            return (ctx.body = {
                success: true
            })
        }
        return (ctx.body = {
            success: false,
            err: '密码不正确'

        })
    }
}


module.exports = adminController;