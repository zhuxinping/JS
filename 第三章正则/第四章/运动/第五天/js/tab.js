(function () {
    //1.获取并解析数据2.绑定数据3.延迟加载 4图片渐隐渐现5焦点自动轮播 6鼠标移入停止 移出继续
    //7.点击焦点手动切换 8.点击左右按钮切换
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oBox.getElementsByTagName('li');
    var aImg=oBox.getElementsByTagName('img');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var data=null;
    var timer=null;
    var n=0;
    //1.获取并解析数据
    getData();
    function getData() {
        var xhr=new XMLHttpRequest();
        xhr.open('get','json/banner.json',true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 &&/^2\d{2}$/.test(xhr.status)){
                data=utils.toJSON(xhr.responseText);
                console.log(data);
                bind();
                //3.延迟加载图片并且渐隐渐现第一张图片
                lazyImg();
                //7.点击焦点手动切换
                handleChange();
            }
        }
        xhr.send(null);
    }
    //2.绑定数据
    function bind() {
        var strDiv='';
        var strLi='';
        for(var i=0;i<data.length;i++){
            strDiv+='<div><img src="" realImg="'+data[i].img+'" alt=""></div>';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        oBoxInner.innerHTML=strDiv;
        oUl.innerHTML=strLi;
    }
    //3.延迟加载图片并且渐隐渐现第一张图片
    function lazyImg() {
        for(var i=0;i<aImg.length;i++){
            (function (index) {
                var cur=aImg[index];
                var tmpImg=new Image();
                tmpImg.src=cur.getAttribute('realImg');
                tmpImg.onload=function () {
                    cur.src=this.src;
                    tmpImg=null;
                    utils.css(aDiv[0],'zIndex',1);
                    animate({
                        id:aDiv[0],
                        target:{
                            opacity:1
                        }
                    })
                }
            })(i);
        }
    }
    //4图片渐隐渐现
    clearInterval(timer);
    timer=setInterval(autoMove,2000);
    function autoMove() {
        if(n>=aDiv.length-1){
            n=-1;//这里设定为-1当进来的时候后面n++就会显示第一张
        }
        n++;

       setBanner();
    }
    function setBanner() {
        //第几张图片的索引等于n，就让第几张的图片层级提高,其他的层级为0 层级最高的透明度0-1其他的1-0
        for(var i=0;i<aDiv.length;i++){
            if(i==n){//要显示的图片
                utils.css(aDiv[i],'zIndex',1);
                animate({
                    id:aDiv[i],
                    target:{
                        opacity:1
                    },
                    callback:function () {
                        //this->当前元素已经在库里面改变指向了
                        var siblings=utils.siblings(this);//不能用aDiv[i]这里是异步 里面的i都会出问题
                        for(var i=0;i<siblings.length;i++){
                            utils.css(siblings[i],'opacity',0);
                        }
                    }
                });
            }else{
                utils.css(aDiv[i],'zIndex',0);
            }
            bannerTip();
        }
    }
    //5焦点自动轮播
    function bannerTip() {
        for(var i=0;i<aLi.length;i++){
            if(i==n){
                aLi[i].className='on';
            }else{
                aLi[i].className='';
            }
        }
    }
    //6鼠标移入停止 移出继续
    oBox.onmouseover=function () {
        clearInterval(timer);
        oBtnLeft.style.display=  oBtnRight.style.display='block';
    }
    oBox.onmouseout=function () {
        timer=setInterval(autoMove,2000);
        oBtnLeft.style.display=  oBtnRight.style.display='none';
    }
    //7.点击焦点手动切换
    // handleChange();
    function handleChange() {
        for(var i=0;i<aLi.length;i++){
            (function (index) {
                aLi[index].onclick=function(){
                    n=index;
                    setBanner();
                }//异步操作里面的i都是有问题的需要用闭包解决
            })(i);
        }
    }
    // 8.点击左右按钮切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function () {
        if(n<=0){
            n=aDiv.length;
        }
        n--;
        setBanner();
    };
})();