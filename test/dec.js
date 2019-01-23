class Boy {
    @speak('中文')
    run() {
        console.log("I can run");
        console.log("I can speak:"+this.language);
    }
}
// function speak(target, key, description) {
//     console.log(target);
//     console.log(key);
//     console.log(description);
// }

function speak(language) {
    return function (target, key, description) {
        console.log(target);
        console.log(key);
        console.log(target[key]);
        console.log(description);
        target.language=language;
    }

}

const Luke = new Boy();
Luke.run();

let a = new Map();
a.set({aa:1,bb:2},{cc:3,dd:4});
a.set({aaa:1,bbb:2},{ccc:3,ddd:4});
a.set({aaa:3,bbb:4},{ccc:3,ddd:4});
// for(let [y,i] of a){
//     console.log("y");
//     console.log(y);
//     console.log('i');
//     console.log(i);
// }
console.log(a);