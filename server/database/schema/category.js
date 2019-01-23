const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
    name:{
        unique:true,
        type:String
    },
    movies:[{
        type:ObjectId,
        ref:'Movie'
    }],
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
mongoose.model('Category',CategorySchema);