(function () {
    //单例模式写了运动公式;
    var Effect={//外部不能直接访问到这个引用变量
       Linear:function(t,b,c,d) {
        return t*c/d+b;
     }
    }
    //让物体运动到一个指定的位置:{left:xxx,top:xxxx,width:xxxx,height:xxx...}
    function move(curEle,target) {//私有作用域中的一个私有函数
    //给Linear公式 准备参数:
        var begin={},change={};
        var duration=700;
        var time=0;
        for(var attr in target){
            begin[attr]=utils.getCss(curEle,attr);
            change[attr]=target[attr]-begin[attr];
        }
        var timer=setInterval(function () {
            if(time>=duration){
                utils.css(curEle,target);
                clearInterval(timer);
                return;
            }
            time+=10;
            for(var attr in change){
                var curPos=Effect.Linear(time,begin[attr],change[attr],duration);//通过遍历拿到每个属性对应的最新位置,同时设置最新位置
                utils.css(curEle,attr,curPos);
            }
        },10)
    }
    window.animate=move;//通过window把move暴露在全局作用域;
})();