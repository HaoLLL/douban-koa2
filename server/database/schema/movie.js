const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Mixed,ObjectId} = Schema.Types;

const MovieSchema = new Schema({
    doubanId:{
        unique:true,
        type:String
    },
    category:[{
        type:ObjectId,
        ref:'Category'
    }],
    rate:Number,
    title:String,
    summary:String,
    video:String,
    poster:String,
    cover:String,


    //图床上面的id
    videoKey:String,
    posterKey:String,
    coverkey:String,

    rawTitle:String,
    movieTypes:[String],
    pubdate:Mixed,
    year:Number,

    tags:Array,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    }else{
        this.meta.updatedAt = Date.now();
    }
    next();
})
mongoose.model('Movie',MovieSchema);