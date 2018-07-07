 (function () {
    function on(ele,type,fn) {
        //绑定时区分自定义事件和系统事件
        if(/^self/.test(type)){//自定义事件--订阅
            if(!ele[type]){
                ele[type+'Pool']=[];
            }
            var a=ele[type+'Pool'];
            for(var i=0;i<a.length;i++){
                if(a[i]===fn) return;
            }
            a.push(fn);
        }else{//系统事件
            if(ele.addEventListener){
                ele.addEventListener(type,fn,false);
            }else{
                if(!ele[type+'onEvent']){
                    ele[type+'onEvent']=[];
                    //解决run重复绑定的问题
                    ele.attachEvent('on'+type,function () {
                        run.call(ele);//解决this的问题
                    });
                }
                var a=ele[type+'onEvent'];
                for(var i=0;i<a.length;i++){
                    if(a[i]===fn)return
                }
                a.push(fn);//把所有系统事件对应的函数放到自定义事件池中
            }
        }
    }
    function off(ele,type,fn) {//解除系统事件 解除自定义事件
        if(/^self/.test(type)){//拿到数组，比对解除  解除自定义事件
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
            }else{
                var a=ele[type+'onEvent'];
                if(a&&a.length){
                    for(var i=0;i<a.length;i++){
                        if(a[i]==fn){
                            a[i]=null;
                            break;
                        }
                    }
                }
            }
        }
    }
    function run() {
        //解决IE问题  取到数组顺序调用
        //this->ele
        var e=e||window.event
        var a=ele[e.type+'onEvent'];
        if(a &&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof  a[i]==='function'){
                    a[i].call(this,e)
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    function fire(ele,type,e) {//发布自定义事件绑定的方法 拿到数组顺序调用
        var a=ele[type+'Pool'];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i]==='function'){
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
            e||window.event;
            fn.call(context,e);
        }
    }
    window.event={
        on:on,
        off:off,
        run:run,
        fire:fire,
        processThis:processThis
    }
})();