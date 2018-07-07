//1.图片自动轮播2.焦点自动轮播 3.移入停止移出继续4.点击焦点手动切换5.点击左右按钮进行切换

(function () {
    //1.获取元素:
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aLi=oBox.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var n=0;//n的作用:决定第几张图片显示;
    var timer=null;
    //1.图片自动轮播
    //给oBoxInner，末尾添加一张图片跟第一张一模一样的图片
    //图片你按钮通过索引n来对应起来;
    oBoxInner.innerHTML+=' <div><img src="img/banner1.jpg" alt=""></div>';
    //console.log(aDiv[0].offsetWidth);
    oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';
    clearInterval(timer);
     timer=setInterval(autoMove,2000);
    function autoMove() {
        if(n>=aDiv.length-1){//在最后一张的时候迅速把n=0
            n=0;
            utils.css(oBoxInner,'left',-n*1000);
        }
       // console.log(n);//0 1 2 3   0 1 2 3
        n++;//1 2 3 4
       // utils.css(oBoxInner,'left',-n*1000);
        //运动动画
        //console.log(n);//1 2 3 4
        animate({
            id:oBoxInner,
            target:{
                'left':-n*1000
            },
            effect:5,
            duration:1000
        });
        bannerTip();//焦点要在这里调用才能拿到n值
    }
    //alert(n);//0
    //焦点自动变化
    function bannerTip() {
       // console.log(n);
        var tmp=n>=aLi.length?0:n;//0 1 2 3//让n跟li可以同步,否则n 1 2 3 4  li索引是0 1 2 3
       // console.log(tmp);
        for(var i=0;i<aLi.length;i++){
            // if(i===tmp){
            //     aLi[i].className='on';
            // }else{
            //     aLi[i].className=null;
            // }
            i===tmp?aLi[i].className='on':aLi[i].className=null;
        }
    }
    //鼠标移入停止 移出 运动
    oBox.onmouseover=function () {
        clearInterval(timer);
        oBtnLeft.style.display= oBtnRight.style.display='block';
    }

    oBox.onmouseout=function () {
        timer=setInterval(autoMove,2000);
        oBtnLeft.style.display= oBtnRight.style.display='none';
    }
    //点击焦点手动切换
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;//索引存到index
        aLi[i].onclick=function () {
            n=this.index;
            animate({
                id:oBoxInner,
                target:{
                    'left':-n*1000
                },
                effect:5,
                duration:1000
            });
            bannerTip();
        }
    };
    //点击左右按钮进行切换
    oBtnRight.onclick= autoMove;
    oBtnLeft.onclick=function () {
        if(n<=0){
            n=aDiv.length-1;//左移动的时候当n<=0;的时候马上拉到最后一张显示;
            utils.css(oBoxInner,'left',-n*1000);
        }
        n--;
        animate({
            id:oBoxInner,
            target:{
                'left':-n*1000
            },
            effect:5,
            duration:1000
        });
        bannerTip();
    }

    //滚轮的时候轮播
    function fnWheel(bOk) {
        if(bOk){//向下滚动
            autoMove();
        }else{//向上滚动
            if(n<=0){
                n=aDiv.length-1;//左移动的时候当n<=0;的时候马上拉到最后一张显示;
                utils.css(oBoxInner,'left',-n*1000);
            }
            n--;
            animate({
                id:oBoxInner,
                target:{
                    'left':-n*1000
                },
                effect:5,
                duration:1000
            });
            bannerTip();
        }
    }
    wheel(oBoxInner,fnWheel)
})();