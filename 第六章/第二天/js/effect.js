function creaseIndex() {
    this.ele.style.zIndex=++zIndex;
    //console.log(this.ele);//this是一个实例
}
function getSpeedX(e) {//在move的情况下得到横向的速度
    if(!this.prev){
        this.prev=e.pageX;
    }else{
        this.speedX=e.pageX-this.prev;
        this.prev=e.pageX;
    }
}
function fly(){
    clearTimeout(this.flyTimer);
    this.speedX*=0.93;
    var l=this.ele.offsetLeft+this.speedX;
    var maxL=utils.win('clientWidth')-this.ele.offsetWidth;
    if(l<=0){
        l=0;
        this.speedX*=-1;
    }else if(l>=maxL){
        l=maxL;
        this.speedX*=-1;
    }

    if(Math.abs(this.speedX)>=0.5){
        this.ele.style.left=l+'px';
        this.flyTimer=setTimeout(processThis(fly,this),10);
    }
}
function clearEffect() {
    clearTimeout(this.dropTimer);
    clearTimeout(this.flyTimer);
    this.prev=null;
}
function drop() {
    clearTimeout(this.dropTimer);
    if(!this.speedY){
        this.speedY=9.8;
    }else{
        this.speedY+=9.8;
    }
    this.speedY*=0.93;
    var t=this.ele.offsetTop+this.speedY;
    var maxT=utils.win('clientHeight')-this.ele.offsetHeight;
    if(t>=maxT){
        t=maxT;
        this.speedY*=-1;
        this.flag++;
    }else{
        this.flag=0;
    }
   if(this.flag<2){
       this.ele.style.top=t+'px';
       this.dropTimer=setTimeout(processThis(drop,this),10);
   }
}