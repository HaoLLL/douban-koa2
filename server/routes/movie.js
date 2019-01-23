const{ 
    getAllMovies,
    getMovieDetail ,
    getRelativeMovies
} =require('../service/movie');

const Router = require('koa-router');
const mongoose = require('mongoose');
const router = new Router();

const { 
    controller,
    get,
    post,
    put
} = require('../lib/decorator');

//controller层
@controller('/api/v0/movies')
export class movieController {
    @get('/')
    // post请求可以检查字段个数是不是正确
    async getMovie(ctx, next) {
        const {type,year} =ctx.query;
        const Movie = mongoose.model('Movie');
        const movies = await getAllMovies(type,year)
        ctx.body = {
            success:true,
            data:movies
        }
    }
    // @post()
    // @required({body:['username','password']})

    //拿到单部和同类型的电影
    @get('/:id')
    async getMovieDetail(ctx, next) {
        const Movie = mongoose.model('Movie');
        const id = ctx.params.id;
        const movie = await getMovieDetail(id);
        const relativeMovies = await getRelativeMovies(movie);
        // const movie = await Movie.findOne({ _id: id });
        ctx.body = {
            data:{
                movie,
                relativeMovies
            },
            success:true
        }
    };
}


module.exports = movieController;