//21个
var utils = (function () {
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }
    function getCss(curEle,attr) {
        var val=null;
        var reg=null;
        if('getComputedStyle' in window){
            val =getComputedStyle(curEle,false)[attr];
        }else{
            if(attr==='opacity'){
                val=curEle.currentStyle['filter'];//正则校验// 'alpha(opacity=10)'  如果设置对就获取  不对默认就是透明度是1
                reg=/^alpha\(opacity[=:](\d+(\.\d+)?)\)$/;//不能加g
                //如果正则中加了全局g  test exec都会影响lastIndex
                // console.log(reg.test(val));
                // //console.log(val);
                // return reg.test(val)?reg.exec(val)[1]/100:1;
                // if(reg.test(val)){
                //     console.log(RegExp.$1);//拿到当前大正则的第一个小分组 RegExp.$2拿到当前大正则的第二个小分组  最大到RegExp.$9
                // }
                return reg.test(val)?RegExp.$1/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        //left top bottom right height width margin padding marginLeft ...
        reg=/^(left|top|right|bottom|width|height|((margin|padding)(left|top|right|bottom)?))$/gi;
        return reg.test(attr)?parseInt(val):val;
    }
    function offset(curEle) {
        var par=curEle.offsetParent;
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while (par){
            //IE8浏览器下offsetLeft已经包含了边框
            //只有在非IE8浏览器才需要累加边框
            if(window.navigator.userAgent.indexOf('MSIE 8')===-1){//不是IE8
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par = par.offsetParent;
        }
        return{left:l,top:t};
    }
    function win(attr,value) {
        //第二个参数没传的时候是获取:
        if(typeof value==='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        //没有走，说明第二个参数传了:设置的
        document.documentElement[attr]=document.body[attr]=value;
    }
    //rnd:求一定范围的随机数:
    function rnd(n,m) {
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();//当返回0-1之间的随机小数,就代表传参传错了
        }
        if(n>m){
            var tem=n;
            n=m;
            m=tmp;
        }
        return Math.round(Math.random()*(m-n)+n)
    }
    //getByClass:通过class名(可以限定范围 的)获取元素
    function getByClass(str,parent) {//在父 容器下
        parent=parent||document;
        var ary=[];
        if('getComputedStyle' in window){//标准浏览器
            ary=Array.prototype.slice.call(parent.getElementsByClassName(str));
        }else{
            //正则匹配
            //1.把包含多个class名的字符串,切分成数组;[box2,box3]
            var aryClass=str.replace(/(^ +)|( +$)/g,'').split(/\s+/g);//字符串
            //验证父容器下所有元素的class名包含数组中的每一项
            //1拿到父容器下所有的元素2验证每个元素的class名是否包含数组的每一项
            //3把符合要求的元素放入数组ary
            var nodeList=parent.getElementsByTagName('*');//*通配符 拿到父容器下所有元素的标签名
            for(var i=0;i<nodeList.length;i++){
                var cur=nodeList[i];
                //假设法
                var bOK=true;
                for(var j=0;j<aryClass.length;j++){
                    var reg=new RegExp('(^| +)'+aryClass[j]+'( +|$)','g');//两边可能是开头结尾和空格
                    if(!reg.test(cur.className)){
                        bOK=false;
                    }
                }
                if(bOK){
                    ary.push(cur);
                }
            }
        }
        return ary;
    }
    return {
        toArray: toArray,
        toJSON: toJSON,
        getCss:getCss,
        offset:offset,
        win:win,
        rnd:rnd,
        getByClass:getByClass
    };
})();