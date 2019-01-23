const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

const UserSchema = new Schema({
    username: {
        unique: true,
        type: String,
    },
    email: {
        unique: true,
        type: String,
    },
    password: {
        unique: true,
        type: String,
    },
    lockUntil: Number,
    loginAttempts:{
        required:true,
        type:Number,
        default:0
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    },
    role:{
        type:String,
        default:'user'
    }
})

//虚拟字段 不会存到数据库中(计算属性)
//先进行判断 再看是不是改变数据
UserSchema.virtual('isLocked').get(function(){
    return !!(this.lockUntil && this.lockUntil > Date.now());
})
UserSchema.pre('save', function(next){
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next()
        })

    })
});

UserSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            //盐 计算的次数保存在密码里面
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })

        })
    },
    incLoginAttepts: (user) => {
        //已经被锁定 但是锁定时间超时了
        return new Promise((resolve, reject) => {
            if (this.lockUntil && this.lockUntil < Date.now()) {
                this.update({
                    //动态增加字段
                    $set: {
                        loginAttempts: 1
                    },
                    //删除lockUntil
                    $unset: {
                        lockUntil: 1
                    }
                }, (err) => {
                    if (!err) resolve(true)
                    else rejects(err)
                })
            } else {
                //还没有被锁定过 
                let updates = {
                    $inc: {
                        loginAttempts: 1
                    }
                }
                //大于最大值并且没有锁定 那么锁定这个用户
                if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }
                this.update(updates, err => {
                    if (!err) resolve(true)
                    else rejects(err)
                })
            }

        })
    }
}
mongoose.model('User', UserSchema);