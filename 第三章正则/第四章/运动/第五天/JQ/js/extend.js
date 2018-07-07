$.fn.extend({//给原型扩充代码

    myColor:function (color) {
        this.css({background:color});
    },
    tab:function () {
        //console.log($(this)[0]);
        var $box=this;
       // var $box=$('#box');
        // var $aBtn=$box.find('input');
        var $aBtn=$box.children('input');
        var $aDiv=$box.children('div');
        $aBtn.click(function () {
            $(this).addClass('on').siblings().removeClass('on');
            $aDiv.eq($(this).index()).addClass('show').siblings().removeClass('show');
        });
    }

});