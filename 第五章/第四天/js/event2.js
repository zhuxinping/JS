function bind(ele,type,fn) {
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器
         var tmpFn=function(){
            fn.call(ele);
        };
         tmpFn.name=fn;//设置name区分不同的tmpFn
         if(!ele[type+'aEvent']){
             ele[type+'aEvent']=[];
         }
         var a=ele[type+'aEvent'];
         for(var i=0;i<a.length;i++){
             if(a[i].name==fn) return;//阻断程序执行
         }
         a.push(tmpFn);
        ele.attachEvent('on'+type,tmpFn);
    }
}
function unbind(ele,type,fn) {
    if(ele.removeEventListener){//标准浏览器
        ele.removeEventListener(type,fn,false);
    }else{//IE浏览器
        var a=ele[type+'aEvent'];//拿数组
        if(a && a.length){
            for(var i=0;i<a.length;i++){
                if(a[i].name==fn){
                     ele.detachEvent('on'+type, a[i]);//先删除系统事件池的事件
                    // a.splice(i,1);//会有塌陷问题
                    a[i]=null;//让自己事件池为null
                }
            }
        }
    }
}
function on(ele,type,fn) {//标准浏览器自己处理 IE浏览器 给系统事件池中放一个run方法
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele[type+'onEvent']){
            ele[type+'onEvent']=[];
        }
        var a=ele[type+'onEvent'];
        for(var i=0;i<a.length;i++){
            if(a[i]===fn)return;
        }
        a.push(fn);//所有该行为下的方法都放进自己事件池
        bind(ele,type,run);//this->ele  给系统事件池放一个run方法
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{//IE
        var a=ele[type+'onEvent'];
        if(a && a.length){
            for(var i=0;i<a.length;i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;//这里已经找到要解除的事件就可以跳出循环了
                }
            }
        }
    }
}
function run() {//把自己事件池中所有的函数进行顺序调用
    var e=window.event;
    //this->元素
    var a=this[e.type+'onEvent'];//拿到数组
    if(a && a.length){
        for(var i=0;i<a.length;i++){
           if(typeof  a[i]==='function'){
               a[i].call(this,e);//this->a call以后是ele
           }else{
               a.splice(i,1);
               i--;
           }
        }
    }
}