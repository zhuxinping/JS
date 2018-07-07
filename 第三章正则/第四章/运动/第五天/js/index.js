// let fn=p=>p;
//console.log(fn(3));
// let fn2=()=>'我是没有参数的';
// console.log(fn2);
// console.log(fn2());
// console.log(fn2(3));
// let fn4=(n,m)=>n+m;
// console.log(fn4(2,3));
// var fn1=function (p) {
//     return p;
// }
// console.log(fn1(3));

// let fn5=(n,m)=>{
//     var total=n+m;
//     return total;
// };
// console.log(fn5(2,4));

// class Father {//定义一个类:类通过class来添加
//     constructor(name, age) {//创建一个构造函数  构造函数通过constructor添加
//         //放私有的属性和方法
//         this.name = name;
//         this.age = age;
//     }
//
//     //这里放公有的属性和方法
//     getName(){
//         console.log(this.name+'的年龄是'+this.age+'岁了');
//     }
//     static  like(){//静态方法相当于给Father添加一个私有的方法   添加静态的属性和方法  注意:实例不可以使用
//         console.log('我是静态方法!');
//         //console.log(this);//this->Father
//     }
// }
// var f=new Father('zhubajie',8);
// // f.getName();
// // Father.like();
//
// class Son extends Father{//子类通过extends继承父类
//     constructor(name,age,color){//也要有构造函数
//         super(name,age);//这个必须写的 要继承父类的私有属性和方法
//         this.color=color;//子类私有的属性
//     }
//     getColor(){
//         console.log(this.name+'喜欢的颜色是'+this.color);
//     }
// }
// var s=new Son('zhuxp',18,'red');
// console.dir(s);
// s.getName();
// s.getColor();
//
// let obj={name:"zhuxp",age:8}
// let a=1;
// let b='2';
// let fn=p=>p;
//
// var objOther={
//   a,b,fn,__proto__:obj
// };
// console.log(objOther);
// console.log(objOther.fn(3));
// console.log(objOther.name);
// var a="zhuxp";
// var b=8;
// var str=`${a}的年纪是${b}`;
// console.log(str);
// var fn=p=>p;
// var obj={a:1,b:'2',fn};
// var {a,b,fn}=obj;
// console.log(a);
// console.log(b);
// console.log(fn);
// var reactNative=require('reactNative');
// // var {ListView,Text,Image}=reactNative;

// function fn(name,age=8) {
//    console.log(name+'年龄是'+age);
// }
// fn('zhu',18);
// fn('zhu');

// function fn(age,...args) {
//    // console.log(age,args);
//     var obj=Object.create(null);
//     for(var i=0;i<args.length;i++){
//         obj[i]=args[i];
//     }
//     return obj;
// }
// console.log(fn(8,'3','3px',9));

// var ary=[2,54,3,18];
// console.log(Math.max(...ary));
//
// for(var i=0;i<10;i++){
//
// }
// console.log(i);//10
//
// for(let i=0;i<10;i++){
//         //块级作用域
// }
// console.log(i);//报错 i is not defined
/*const  a=12;
a=14*/;//Assignment to constant variable.
// console.log(a);//报错
// const a=12;