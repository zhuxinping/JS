function EventEmitter() {//订阅发布模式->>>扩充产品的功能 1)客户端 2)开发端
    
}

EventEmitter.prototype.on=function (type,fn) {//跟某个自定义行为有关的方法,都放进数组
    if(!this[type+'Pool']){
        this[type+'Pool']=[];
    }
    var a=this[type+'Pool'];
    for(var i=0;i<a.length;i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
    return this;//返回实例 可以链式调用
};

EventEmitter.prototype.fire=function (type,e) {//拿到数组然后顺序调用
    var a=this[type+'Pool'];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);//这里this是实例
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
    return this;//返回实例 可以链式调用
}

EventEmitter.prototype.off=function (type,fn) {//解除绑定自定义事件
    var a=this[type+'Pool'];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            if(a[i]===fn){
                a[i]=null;
                break;
            }
        }
    }
    return this;//返回实例 可以链式调用
}
//要保证构造函数中的所有this都指向实例
function Drag(ele) {
    //console.dir(this instanceof Drag);//true
    //console.dir(this===Drag);//false
    this.ele=ele;
    this.l=this.t=this.x=this.y=null;
    this.DOWN=processThis(this.down,this);
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
   // console.log(this);//this指向类Drag
    on(this.ele,'mousedown',this.DOWN);//监听到鼠标按下执行对应的方法
    on(this.ele,'mouseup',this.UP);//监听到鼠标抬起执行对应的方法
}

Drag.prototype=new EventEmitter;
Drag.prototype.constructor=Drag;
Drag.prototype.down=function (e) {//保存位置
    e=e||window.event;
    //console.log(this);
    this.l=this.ele.offsetLeft;
    this.t=this.ele.offsetTop;
    this.x=e.pageX;
    this.y=e.pageY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE)
        on(this.ele,'mouseup',this.UP)
    }else{//标准浏览器
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        e.preventDefault();//阻止默认行为
    }
    this.fire('selfDown',e);//暴露出一个接口
};
Drag.prototype.move=function (e) {//计算位置
    //console.log(this);//this->已经更改为drag1实例
    e=e||window.event;
    this.ele.style.left=this.l+e.pageX-this.x+'px';
    this.ele.style.top=this.t+e.pageY-this.y+'px';
    this.fire('selfMove',e);//暴露出一个接口
}
Drag.prototype.up=function () {//解除事件绑定
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE)
        off(this.ele,'mouseup',this.UP)
    }else{//标准浏览器
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.fire('selfUp');//暴露出一个接口
}
Drag.prototype.range=function (opt) {
    //想把opt中的数据跟move事件联系
    this.opt=opt;
    this.on('selfMove',this.addRange);//订阅:增加边界限制
    return this;//返回实例 可以链式调用
};
Drag.prototype.addRange=function (e) {
   // console.log(this);this实例
    //console.log(e);
    var l=this.l+e.pageX-this.x;
    var t=this.t+e.pageY-this.y;
    var opt=this.opt;
    if(l<=opt.left){
        l=opt.left;
    }else if(l>=opt.right){
        l=opt.right;
    }
    if(t<=opt.top){
        t=opt.top;
    }else if(t>=opt.bottom){
        t=opt.bottom;
    }
    this.ele.style.left=l+'px';
    this.ele.style.top=t+'px';
};
Drag.prototype.border=function () {
    this.on('selfDown',this.addBorder);
    this.on('selfMove',this.moveBorder);
    this.on('selfUp',this.removeBorder);
    return this;//返回实例 可以链式调用
}
Drag.prototype.addBorder=function () {
    this.ele.style.border='2px dashed red';
    this.oldColor=utils.css(this.ele,'backgroundColor');
    this.oldHtml=this.ele.innerHTML;
}
Drag.prototype.moveBorder=function () {
    this.ele.innerHTML='拖动中';
    this.ele.style.background='none';
}
Drag.prototype.removeBorder=function () {
    this.ele.style.background=this.oldColor;
    this.ele.style.border='none';
    this.ele.innerHTML=this.oldHtml;
}
Drag.prototype.jump=function () {
    //订阅
     this.on('selfDown',creaseIndex).on('selfDown',clearEffect)
         .on('selfMove',getSpeedX)
         .on('selfUp',fly)
         .on('selfUp',drop);
     return this;//返回实例 可以链式调用
};
