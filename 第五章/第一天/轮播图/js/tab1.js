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
function Tab(opt) {
    //有异步的要注意this指向
    if(!opt.id)return;//当ID没有传的话 不执行任何程序
    //设置默认值
   this.default={
       url:'./json/banner.json',
       duration:2000,
       effect:0
   }
   //传进来的值就用传进来的否则用默认的
   for(var attr in opt){
       this.default[attr]=opt[attr];
   }
   //把全局变量作为私有属性写在构造函数里面
   this.$box=$('#'+this.default.id);
    // console.log( this.$box);
    this.$boxInner=this.$box.find('.boxInner');
    this.$aDiv=null;//jq没有dom映射
    this.$aImg=null;
    this.$ul=this.$box.children('ul');
    this.$aLi=null;
    this.$left=this.$box.find('.left');
    this.$right=this.$box.find('.right');
    this.data=null;
    this.n=0;
    this.timer=null;
    this.init();
}
Tab.prototype={
    constructor:Tab,
    init:function () {
        var _this=this;
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载+第一张图片显示
        this.lazyImg();
        //4.图片渐隐渐现
        clearInterval(this.timer)
        this.timer=setInterval(function () {
           _this.autoMove();
        },this.default.duration);
        //5.焦点自动轮播
        //6.鼠标移入停止移出继续
        this.overout();
        //7.点击焦点手动切换
        this.handleChange();
        //8.点击左右按钮切换
        //console.log(this.data);
        this.LeftRight();
        
    },
    getData:function () {
        var _this=this;
        //获取数据
        $.ajax({
            type:'get',
            url:this.default.url,
            async:false,//同步
            dataType:'json',
            success:function (val) {
               // console.log(val);
               // console.log(this);//this->ajax对象
                _this.data=val;
            }
        });
    },
    bind:function () {
        //遍历数据
        var strDiv='';
        var strLi='';
        $.each(this.data,function (index,item) {
            //console.log($(item));
            strDiv+='<div><img realImg="'+item.img+'" src="" alt=""></div>';
            strLi+=index==0?'<li class="on"></li>':'<li></li>'
        });
        this.$boxInner.html(strDiv);
        this.$ul.html(strLi);
        this.$aDiv=this.$boxInner.children('div');
        this.$aImg=this.$boxInner.find('img');
        this.$aLi=this.$ul.children('li');
    },
    lazyImg:function () {
        var _this=this;
        $.each(this.$aImg,function (index,item) {
            var tmpImg=new Image();
            tmpImg.src=$(item).attr('realImg');
            tmpImg.onload=function () {
               $(item).attr('src',tmpImg.src);
               tmpImg=null;
               //加载完图片显示第一张
                _this.$aDiv.first().css('zIndex',1).animate({opacity:1});
            }
        });
    },
    autoMove:function () {
        if(this.n>=this.$aDiv.length-1){
            this.n=-1;
        }
        this.n++;
        this.setBanner();
    },
    setBanner:function () {
        var _this=this;
        $.each(this.$aDiv,function (index,item) {
            if(index==_this.n){
                $(item).css('zIndex',1).siblings().css('zIndex',0);
                $(item).animate({opacity:1},function () {
                    $(item).siblings().animate({opacity:0});
                })
            }
        });
        this.bannerTip();
    },
    bannerTip:function () {
        var _this=this;
       // console.log(this.n)
        $.each(this.$aLi,function (index,item) {
            // if(index==_this.n){
            //     $(item).addClass('on')
            // }else{
            //     $(item).removeClass('on');
            // }
            item.className=index==_this.n?'on':null;
        })
    },
    overout:function () {
        var _this=this;
        this.$box.mouseover(function () {
            clearInterval(_this.timer);
            _this.$left[0].style.display=_this.$right[0].style.display='block';
            // _this.$right.show();
            // _this.$right.show();
        });
        this.$box.mouseout(function () {
            _this.timer=setInterval(function () {
                _this.autoMove();
            },_this.default.duration);
            _this.$left[0].style.display=_this.$right[0].style.display='none';
        });
    },
    handleChange:function () {
        var _this=this;
        this.$aLi.click(function () {
          _this.n=$(this).index();
            _this.setBanner();
        });
    },
    LeftRight:function () {
        var _this=this;
        this.$right.click(function () {
            _this.autoMove();
        });
        this.$left.click(function () {
            if(_this.n<=0){
                _this.n=_this.$aDiv.length;
            }
            _this.n--;
            _this.setBanner();
        });
    }
};




