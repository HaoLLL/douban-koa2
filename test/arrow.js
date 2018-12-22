// const arrow = function (param) {

// }
// const arrow = (param) => {

// }
// const arrow = param => {

// }
// const arrow = param => console.log(param)

// const arrow = param => ({ param })

// const arrow = (param1,param2)=>{}

// //{id:1,movie:xxx} 直接解构
// const arrow = ({id,movie})=>{
//     console.log(id,movie);
// }

const luke = {
    id:2,
    say:function(){
        //异步函数根据写法决定this的绑定情况
        setTimeout(function(){
            console.log('id: ',this.id);
        },50);
    },
    sayWithThis:function(){
        let that = this;//self _this
        setTimeout(function(){
            console.log('this id',that.id);
        },50);
    },
    sayWithArrow:function(){
        setTimeout(()=>{
            console.log('arrow id',this.id);
        },1500);
    },
    //箭头函数 绑定上一个作用域的this(这里是全局作用域)
    sayWithGlobalArrow:()=>{
        setTimeout(()=>{
            console.log('global arrow id',this.id);
        },2000);
    }
}

luke.say();//undefined
luke.sayWithThis();//2
luke.sayWithArrow();//2
luke.sayWithGlobalArrow();//2