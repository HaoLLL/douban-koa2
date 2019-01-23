const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1/douban-test';
const glob = require('glob');
const {resolve} = require('path');
const bcrypt = require('bcryptjs');

//使用原生的promise
mongoose.Promise = global.Promise;
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','./**/*.js')).forEach((item)=>{
        require(item);
    })

}
exports.initAdmin = async()=>{
    const User = mongoose.model('User');
    let user = await User.findOne({
        username:'HaoLLL'
    })
    if(!user){
        const user = new User({
            username:'HaoLLL',
            email:'m13522389185@163.com',
            password:'511528haolei',
            role:'admin'
        })
        await user.save()
    }
}
exports.connect = () => {
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV != 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex:true
            // useMongoClient:true
        });
        mongoose.connection.on('disconnected', () => {
            console.log('disconnected');
            maxConnectTimes++;
            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error('数据库挂了吧');
            }

        })
        mongoose.connection.on('error', (err) => {
            console.log(err);
            maxConnectTimes++;
            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error('数据库挂了吧');
            }
        })
        mongoose.connection.once('open', async() => {
            // const Dog = mongoose.model('Dog',{
            //     name:String
            // })
            // const doga = new Dog({name:'阿尔发'});
            // doga.save().then(()=>{
            //     console.log("wang");
            // })

            console.log("Mongodb Connected Success");
            // await initAdmin();
            resolve();
        })
    })

}

