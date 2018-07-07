function on(ele,type,fn) {
    if(/^self/.test(type)){//自定义行为
        if(!ele[type+'Pool']){
            ele[type+'Pool']=[];
        }
        var a=ele[type+'Pool'];
        for(var i=0;i<a.length;i++){
            if(a[i]==fn) return;
        }
        a.push(fn);//放到自己事件池中
    }else{//系统行为
        if(ele.addEventListener){//标准浏览器  type:1)系统行为click dbclick 2)自定义行为以self开头
            ele.addEventListener(type,fn,false);
        }else{//IE浏览器 存在ele的私有属性上,就可以一直存进去同类型的事件
            if(!ele[type+'onEvent']){
                ele[type+'onEvent']=[];//这里只会执行一次
                ele.attachEvent('on'+type,function () {//把包裹run方法的匿名函数放进系统事件池,因为我们就没想再解除这个事件绑定
                    run.call(ele);//处理this问题
                });//这里只会执行一次,解决了run重复绑定的问题
            }
            var a=ele[type+'onEvent'];
            for(var i=0;i<a.length;i++){
                if(a[i]===fn)return;
            }
            a.push(fn);//把跟某个行为相关的方法都存进自己的事件池,自己事件池本质是个数组
        }
    }
}

function off(ele,type,fn){
    if(/^self/.test(type)){//解除自定义事件绑定的方法
        var a=ele[type+'Pool'];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }else{
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
}

function run() {
    //解决顺序问题  拿到数组
    var e=window.event;
    e.target=e.target||e.srcElement;//事件源
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.preventDefault=function () {
        e.returnValue=false;
    };
    e.stopPropagation=function () {
        e.cancelBubble=true;
    };
    var a=this[e.type+'onEvent'];
    if(a && a.length){
        for(var i=0;i<a.length;i++){
            //如果是null的时候需要判断过滤
            if(typeof  a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function fire(ele,type,e) {//把自定义行为有关的所有方法按顺序调用

    var a=ele[type+'Pool'];
    if(a&& a.length){
        for(var i=0;i<a.length;i++){
            if(typeof  a[i]==='function'){
                a[i].call(ele,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function processThis(fn,context) {
    return function (e) {
        fn.call(context,e);
    }
}