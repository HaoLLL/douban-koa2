// function makeIterator(arr){
//     let index = 0;
//     return {
//         next:()=>{
//             if(index++<arr.length){
//                 return {
//                     done:false
//                 }
//             }else{
//                 return {
//                     done:true
//                 }
//             }
//         }
//     }
// }

// let fun = makeIterator(['吃饭','睡觉','打豆豆']);
// console.log(fun.next());
// console.log(fun.next());
// console.log(fun.next());
// console.log(fun.next());

//封装了next()方法 yield后面的就是value 
function * makeIterator(arr){
    for(let i=0;i<arr.length;i++){
        //传入参数 确定iterator的参数 generator=>iterator 得到yield后面的返回值队列
        //next()的时候执行yield后面的东西 同步的话输出一个对象/异步的话promise
        //有next()方法
        yield arr[i];
    }
}

const gen = makeIterator(['吃饭','睡觉','打豆豆']);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);