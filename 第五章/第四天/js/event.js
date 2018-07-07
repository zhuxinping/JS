

function bind(ele,type,fn) {
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器

        var tmpFn=function () {//如果绑定n多个就会覆盖这个tmpFn 所有不能用自定义属性来解决 要用一个数组当成系统事件池存放事件
            fn.call(ele);//fn1.call  fn2.call
        }
        tmpFn.name=fn;
        if(!ele[type+'aEvent']){
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];
        //解决重复绑定的问题
        for(var i=0;i<a.length;i++){
            if(a[i].name==fn) return;//阻断程序执行的作用
        }
        a.push(tmpFn);//把要绑定的方法放入自己的事件池
        ele.attachEvent('on'+type,tmpFn);
    }
}

function unbind(ele,type,fn) {
    if(ele.removeEventListener){//标准浏览器
        ele.removeEventListener(type,fn,false);
    }else{//IE浏览器
        var a=ele[type+'aEvent'];
        if(a && a.length){
            for(var i=0;i<a.length;i++){
                if(a[i].name==fn){
                    ele.detachEvent('on'+type, a[i]);//先删除系统事件池的事件
                    a.splice(i,1);//会有塌陷问题
                }
            }
        }
    }
}

