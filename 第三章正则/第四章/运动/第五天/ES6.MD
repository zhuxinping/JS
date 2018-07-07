1. 箭头函数：
两种写法:1.表达式 2函数体
表达式 : let fn=p=>p;   let fn=(n,m)=>n+m;   let fn=()=>'我是没有参数的'
函数体:let fn=(n,m)=>{
        var total=n+m;
        return total;
    };

2 定义一个类及类的继承
1）通过class创建类
2)通过constructor创建构造函数
3）函数名(){
//公有属性和方法
}
4）static 函数名(){
//静态属性和方法  给类添加私有属性和方法
}
5）class 子类 extends  父类{//子类继承父类
 constructor(name,age,color){//也要有构造函数
        super(name,age);//这个必须写的 要继承父类的私有属性和方法
        this.color=color;//子类私有的属性
    }
}


3.增强的对象字面量
1）写法简化 2）原型继承类似于类
4.模板字符串
