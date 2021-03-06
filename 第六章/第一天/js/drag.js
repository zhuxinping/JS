var oDiv=document.getElementById('div');
var tmp=0;
on(oDiv,'mousedown',down);

function down(e) {
    e=e||window.event;
    this.l=this.offsetLeft;
    this.t=this.offsetTop;
    this.x=e.pageX;
    this.y=e.pageY;
    this.MOVE=processThis(move,this);
    this.UP=processThis(up,this);
    if(this.setCapture){
        this.setCapture();//oDiv
        on(this,'mousemove',move)
        on(this,'mouseup',up)
    }else{
        on(document,'mousemove', this.MOVE);
        on(document,'mouseup', this.UP);
        e.preventDefault();//阻止默认事件
        clearTimeout(this.flyTimer);
        clearTimeout(this.dropTimer);
    }
    //放一个帮我们监听的人,等鼠标事件发生的时候.通知提前跟他约定的方法去执行
    //通知和发布的功能
}

//通知和发布的功能:

function move(e) {//计算位置:问题:焦点丢失问题
    this.style.left=this.l+e.pageX-this.x+'px';
    this.style.top=this.t+e.pageY-this.y+'px';
    if(!this.prev){
        this.prev=e.pageX;//刚开始没有的时候,第一次的落脚点就是this.prev
    }else{
        this.speedX=e.pageX-this.prev;
        this.prev=e.pageX;
    }
    //console.log(this.speedX);
}

function up() {
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,'mousemove',move);
        off(this,'mouseup',up);
    }else{
        off(document,'mousemove', this.MOVE);
        off(document,'mouseup', this.UP);
    }
    fly.call(this);
    drop.call(this);
}
function fly() {
    //call以后this就是当前元素
    clearTimeout(this.flyTimer);
    this.speedX*=0.93;
    var l=this.offsetLeft+this.speedX;
    var maxL=utils.win('clientWidth')-this.offsetWidth;
    if(l>=maxL){
        l=maxL;
        this.speedX*=-1;
    }else if(l<=0){
        l=0;
        this.speedX*=-1;
    }
   if(Math.abs(this.speedX)>=0.5){
       this.style.left=l+'px';
       this.flyTimer=setTimeout(processThis(fly,this),10);
   }
    //console.log(this.speedX);
}
function drop() {
    clearTimeout(this.dropTimer);
    if(!this.speedY){
        this.speedY=9.8;
    }else{
        this.speedY+=9.8;
    }
    this.speedY*=0.93;
    var t=this.offsetTop+this.speedY;
    var maxT=utils.win('clientHeight')-this.offsetHeight;
    if(t>=maxT){//触底了
        t=maxT;
        this.speedY*=-1;
        tmp++;
    }else{
        tmp=0;
    }
  if(tmp<2){
      this.style.top=t+'px';
      this.dropTimer=setTimeout(processThis(drop,this),10);
  }
    console.log(this.speedY);
}