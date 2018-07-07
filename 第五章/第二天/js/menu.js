var $box=$('.box');
var $aSpan=$box.find('span');

$.each($aSpan,function (index,item) {
   var pre=$(item).prev();
   //console.log(pre);
    if(pre.length){
        $(item).css('cursor','pointer');
    }
});
//委托事件
$box.click(function (e) {
     //如果事件源是span,还要判断span前是否有em;如果有em,再看容器中是否有ul，有ul  隐藏->显示   显示->隐藏  注意改变em背景图
        var target=e.target;//原生的

    if(target.tagName.toLowerCase()=='span'||target.tagName.toLowerCase()=='em'){
        var $parent=$(target.parentNode);
        var $ul=$parent.children('ul');
        var $em=$parent.children('em');
        if($ul.length){
            if($ul.css('display')=='block'){//收
                var $aUl=$parent.find('ul');
                var $aEm=$parent.find('em');
                //当收起来的时候让该容器下的所有ul都收起来 同时让该容器下所有的em都变成+
                //$aUl.css('display','none');
                $aUl.stop().slideUp();
                $aEm.css('background','url("./img/icon.png") no-repeat -59px -28px');
            }else{//展开
               // $ul.css('display','block');
                $ul.stop().slideDown();
                $em.css('background','url("./img/icon.png") no-repeat -43px -28px');
            }
        }
    }

});


