const fs = require('fs');

// 1.第一个阶段 回调函数作为参数传递
function readFile(cb) {
    fs.readFile('./package.json', (err, data) => {
        if (err) {
            return cb(err);
        }
        cb(null, data);
    })
}

// readFile((err, data) => {
//     if (!err) {
//         data = JSON.parse(data);
//         console.log(data.name);
//     }
// })

// 2.promise的阶段 回调函数=》promise的封装
function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

// readFileAsync('./package.json').then((res)=>{
//     console.log(JSON.parse(res).name);
// }).catch((err)=>{
//     console.log(err);
// })

//3.第三个阶段 co+generator function+promise
//断点
const co = require('co');
const util = require('util');
co(function * (){
    let data = yield util.promisify(fs.readFile)('./package.json');
    data = JSON.parse(data);
    console.log(data.name);
})

//4.第4个阶段 async 统一世界
const readAsync = util.promisify(fs.readFile);
async function init(){
    //await会把promise中的value解析出来
    let data = await readAsync('./package.json');
    data = JSON.parse(data);
    console.log(data.name);
}

init();
