//面向对象版的发布订阅
//on订阅   fire发布  off取消订阅
function EventFire() { // 发射类

}
EventFire.prototype.on = function (type,fn) {
    // 把自定义的事件池放在当前实例上 --> this
    if(!this[type+"Pool"]){
        this[type+"Pool"] = [];
    }
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        var cur = ary[i];
        if(fn === cur)return;
    }
    ary.push(fn);
};
// 发布
EventFire.prototype.fire= function (type) {
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){
            ary[i]()
        }
    }
}
//取消订阅 ： 把方法从自定义事件池中移出
EventFire.prototype.off = function (type,fn) {
    var ary = this[type+"Pool"];
    for(var i=0;i<ary.length;i++){
        if(ary[i] === fn){
            ary[i] =null;
            break;
        }
    }
}
