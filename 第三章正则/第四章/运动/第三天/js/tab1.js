//1.全局变量变成类的私有属性
//2.全局函数变成公有方法
//3.如果给自己的原型添加对象 需要注意constructor指向
//4.init:初始化函数
//5.this的修改

/**
 *  MyTab:构造函数
 *
 *
 * */
//创建构造函数
function MyTab(id,url,duration) {
    //有异步的要注意this指向
    this.url=url;
    this.duration=duration||2000;
    this.oBox=document.getElementById(id);
    this.oBoxInner=this.oBox.getElementsByTagName('div')[0];
    this.aDiv=this.oBoxInner.getElementsByTagName('div');
    this.oUl=this.oBox.getElementsByTagName('ul')[0];
    this.aLi=this.oBox.getElementsByTagName('li');
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.oBtnLeft=this.oBox.getElementsByTagName('a')[0];
    this.oBtnRight=this.oBox.getElementsByTagName('a')[1];
    this.data=null;
    this.timer=null;
    this.n=0;
    this.init();
    // console.log(this instanceof MyTab)
    // console.log(this)
    console.log(this.prototype)
}
MyTab.prototype={
    constructor:MyTab,
    init:function () {
        var _this=this;
        //1.获取并解析数据
       this.getData();//this->实例
        //2.绑定数据
         //this.bind();//这里要在获取数据后那边绑定
        //3.图片延迟加载
        setTimeout(function () {
            _this.lazyImg();//_this->实例
        },500);//定时器的this->window  this要在调用的时候改变指向才有用
        //4.图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            _this.autoMove();
        },_this.duration);
        //5.焦点自动轮播

        //6.移入停止,移出继续
        this.overout();
        //7.点击焦点手动切换
       // this.handleChange();这里的li要等数据绑定异步后面来操作
        //8.点击左右按钮进行切换
        this.RightLeft();

    },
    getData: function getData() {
        var _this=this;//指向实例
        var xhr=new XMLHttpRequest();
        xhr.open('get','json/banner.json',true);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
                _this.data=utils.toJSON(xhr.responseText);//this->xhr
                //console.log(data);
                //2.绑定数据:
                _this.bind();
                _this.handleChange();
            }
        };
        xhr.send();
    },
    bind:function bind() {
        var strDiv="";
        var strLi='';
        for(var i=0;i<this.data.length;i++){
            strDiv+='<div><img src="" realImg="'+this.data[i].img+'" alt=""></div>';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        strDiv+='<div><img src="" realImg="'+this.data[0].img+'" alt=""></div>';
        this.oBoxInner.innerHTML=strDiv;
        this.oBoxInner.style.width=this.aDiv[0].offsetWidth*this.aDiv.length+'px';
        this.oUl.innerHTML=strLi;
    },
    lazyImg: function lazyImg() {
        var _this=this;
        for(var i=0;i<this.aImg.length;i++){
            (function (index) {//闭包会形成四个私有作用域;都不会销毁  也可以使用自定义属性
                var cur=_this.aImg[index];
                var tmpImg=new Image();
                tmpImg.src=cur.getAttribute('realImg');
                tmpImg.onload=function () {
                    cur.src=this.src;
                    tmpImg=null;
                };
                tmpImg.onerror=function () {
                    cur.parentNode.style.background=' url(\'../img/default.gif\') no-repeat center #ccc;'
                }
            })(i);
        }
    },
    autoMove:    function autoMove() {
        if(this.n>=this.aDiv.length-1){
           this.n=0;
            utils.css(this.oBoxInner,'left',-this.n*1000);
        }
        this.n++;
        // utils.css(oBoxInner,'left',-n*1000);
        animate({
            id:this.oBoxInner,
            target:{
                left:-this.n*1000
            },
            duration:1000,
            effect:0
        });
        this.bannerTip();
    },
    bannerTip: function bannerTip() {
        var tmp=this.n>=this.aLi.length?0:this.n;
        for(var i=0;i<this.aLi.length;i++){
            this.aLi[i].className=i==tmp?'on':null;
        }
    },
    overout:function () {
        var _this=this;
        _this.oBox.onmouseover=function () {
            clearInterval(_this.timer);
            _this.oBtnLeft.style.display= _this.oBtnRight.style.display='block';
        }
        _this.oBox.onmouseout=function () {
            _this.timer=setInterval(function () {
                _this.autoMove();
            },_this.duration);
            _this.oBtnLeft.style.display= _this.oBtnRight.style.display='none';
        }
    },
    handleChange:function handleChange() {
        var _this=this;
        for(var i=0;i<_this.aLi.length;i++){
            (function (index) {
                _this.aLi[i].onclick=function () {
                    _this.n=index;
                    animate({
                        id:_this.oBoxInner,
                        target:{
                            left:-_this.n*1000
                        },
                        duration:1000,
                        effect:0
                    });
                    _this.bannerTip();
                }
            })(i);
        }
    },
    RightLeft:function RightLeft() {
        var _this=this;
        this.oBtnRight.onclick=function () {
            _this.autoMove();
        };
        this.oBtnLeft.onclick=function () {
            if(_this.n<=0){
                _this.n=_this.aDiv.length-1;
                utils.css(_this.oBoxInner,'left',-_this.n*1000);
            }
            _this.n--;
            animate({
                id:_this.oBoxInner,
                target:{
                    left:-_this.n*1000
                },
                duration:1000,
                effect:0
            });
            _this.bannerTip();
        }
    }
};




