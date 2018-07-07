function Totop(opt) {
    if(!opt.id)return;
    this.default={
        duration:1000
    };
    for(var attr in opt){
        this.default[attr]=opt[attr];
    }
    this.id=$('#'+this.default.id);
    //console.log(this.id);
    this.init();
}
Totop.prototype={
    constructor:Totop,
    init:function () {
        //console.log(1)
        //1.点击按钮返回顶部
        this.goHome();
        //2.超过一屏幕显示,否则隐藏
        this.showHide();
        //3.点击立即隐藏
    },
    goHome:function () {
        var _this=this;
        this.id.click(function () {
            _this.id.hide();
            $(window).off('scroll');
            var target=$(window).scrollTop();
           // console.log(scrollTop);
            var interval=10;
            var step=target/_this.default.duration*interval;
            clearInterval(timer);
            var timer=setInterval(function () {
                var curTop=$(window).scrollTop();
                if(curTop<=0){
                    clearInterval(timer);
                    $(window).on('scroll',function () {
                        _this.computedDisplay();
                    });
                    return;
                }
                curTop-=step;
                $(window).scrollTop(curTop);
            },interval)
        });
    },
    showHide:function () {
        var _this=this;
        $(window).on('scroll',function () {
            _this.computedDisplay();
        });

    },
    computedDisplay:function () {
            if($(window).scrollTop()>$(window).height()){
                this.id.show();
            }else{
                console.log(this.id);
                this.id.hide();
            }
    }
};