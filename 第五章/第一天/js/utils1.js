//21个
var utils = (function () {
    var flag='getComputedStyle' in window;//自执行函数的私有变量
    /**
     * @functionName:toArray
     * @param:likeAry:j类数组;
     * @return:返回数组;
     *
     * */
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
    /**
     * @functionName:toJSON
     * @param:str:json字符串对象;
     * @return:返回json对象;
     *
     * */
    function toJSON(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }
    /**
     * @functionName:offset
     * @param:curEle当前元素
     * @return:返回这个元素距离定位父级元素距离
     *
     * */
    //解析url参数
    function urlString(str) {
        var reg=/([^?=&]+)=([^?=&]+)/g;
        var obj={};
        str.replace(reg,function () {
            obj[arguments[1]]=arguments[2];
        });
        return obj;
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
    /**
     * @functionName:win
     * @param:attr->属性名,value->属性值
     * @return:传递一个参数是获取元素的一个属性值,传递两个参数是设置一个元素的属性值
     *
     * */
    function win(attr,value) {
        //第二个参数没传的时候是获取:
        if(typeof value==='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        //没有走，说明第二个参数传了:设置的
        document.documentElement[attr]=document.body[attr]=value;
    }
    //rnd:求一定范围的随机数:
    /**
     * @functionName:rnd
     * @param:n->整数,m->整数
     * @return:返回一个n-m范围的随机数
     *
     * */
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
    /**
     * @functionName:getByClass
     * @param:str->字符串类名,parent父节点容器或document
     * @return:返回一个数组包含str里面的所有的类名
     *
     * */
    function getByClass(str,parent) {//在父 容器下
        parent=parent||document;
        var ary=[];
        if(flag){//标准浏览器
            ary=this.toArray(parent.getElementsByClassName(str));
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
                        break;//跳出当前循环
                    }
                }
                if(bOK){
                    ary.push(cur);
                }
            }
        }
        return ary;
    }
    //hasClass:判断元素身上是否有某个class名
    /**
     * @functionName:hasClass
     * @param:curEle->当前元素,cName 类名
     * @return:返回一个布尔值
     *
     * */
    function hasClass(curEle,cName) {
        //正则匹配
        var reg=new RegExp('(^| +)'+cName+'( +|$)','g');
        return reg.test(curEle.className)
    }
    //addClass:可以给元素身上以字符串的形式批量添加class名(当元素身上没有这个class名的时候,可以给元素添加这个class名)
    /**
     * @functionName:addClass
     * @param:curEle->当前元素,strClass 要添加的类名
     * @return:无
     *
     * */
    function addClass(curEle,strClass) {
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0;i<aryClass.length;i++){
            if(!this.hasClass(curEle,aryClass[i])){//判断没有这个类名再添加进来
                curEle.className+=' '+aryClass[i];//拼接的时候要加空格
            }
        }
    }
    //reomveClass:移除元素身上某些类名; strClass删除多个类名
    /**
     * @functionName:removeClass
     * @param:curEle->当前元素,strClass 要删除的类名
     * @return:无
     *
     * */
    function removeClass(curEle,strClass) {
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        //console.log(aryClass);
        for(var i=0;i<aryClass.length;i++){
            var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)','g');
            if(reg.test(curEle.className)){//有这个类名,我们就替换成空格
                curEle.className=curEle.className.replace(reg, ' ').replace(/(^ +)|( +$)/g, '').replace(/\s+/g,' ');
            }
        }
    }
    /**
     * @functionName:getCss
     * @param:curEle当前元素;attr:当前元素的属性
     * @return:返回这个元素距离定位父级元素距离
     *
     * */
    function getCss(curEle,attr) {
        var val=null;
        var reg=null;
        if(flag){
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
    //setCss:给元素身上设置一个样式;设置样式只能设置行内样式;兼容处理 透明度
    //1.对单位进行处理utils.setCss(oDiv,'height','200');
    //2.透明度的兼容处理
    //3.浮动
    /**
     * @functionName:setCss
     * @param:curEle当前元素;attr:当前元素的属性value:属性值
     * @return:无
     *
     *
     * */
    function setCss(curEle,attr,value) {
            //1.对单位的处理:有效数字的判断+有无单位;
        var reg=/^([+-])?(\d+(\.\d+)?)(px|pt|rem|em|%)?$/;
        //3.对浮动的处理
        if(attr=='float'){
            curEle.style.cssFloat=value;//firefox chrome safari
            curEle.style.styleFloat=value;//IE
            return;
        }
        //2.对透明度的处理
        if(attr==='opacity'){
            curEle.style.opacity=value;
            curEle.style.filter='alpha(opacity='+value*100+')';
            return;
        }
        if(attr==='zIndex'){
            curEle.style.zIndex=value;
            return;
        }
        if(reg.test(value)){//验证通过
            //判断是否传单位:
            //当用户没有传单位的时候,默认按照PC端的样式设置;
            if(Number(value)|| Number(value)==0){//能进来说明是数字  0也要额外考虑
                value=value+'px';
            }
        }
            curEle.style[attr]=value;
    }
    /**
     * @functionName:setGroupCss
     * @param:curEle当前元素;opt:元素属性和属性名的键值对
     * @return:无
     *
     *
     * */
    function setGroupCss(curEle,opt) {
        if(Object.prototype.toString.call(opt)!=='[object Object]') return;
        for(var attr in opt){
            this.setCss(curEle,attr,opt[attr]);
        }
    }
    //css:
    //下手点:从参数来下手css(curEle);
    //第二个参数是字符串的话:1.)有第三个参数-设置一个 2）没有第三个参数--获取值(有返回值return) 3)如果第二个参数是对象的话 设置一组
    //
    function css(curEle) {
       var argTwo=arguments[1];
       if(argTwo){
           if(typeof  argTwo==='string'){
               var argThree=arguments[2];
               if(typeof argThree==='undefined'){//说明是获取
                   return this.getCss(curEle,argTwo);
               }else{
                   this.setCss(curEle,argTwo,argThree);//设置一个样式
               }
           }
       }
       // if(argTwo instanceof Object){
       //      this.setGroupCss(curEle,argTwo);
       // }
        if( Object.prototype.toString.call(argTwo)==='[object Object]'){
            this.setGroupCss(curEle,argTwo);
        }
    }
    //getChildren:获取当前元素下的所有子元素(可以通过标签名过滤子元素)
    /**
     * @functionName:getChildren
     * @param:curEle当前元素;tabName；要过滤获取到的标签名
     * @return:子元素
     *
     *
     * */
    function getChildren(curEle,tabName) {
        var childs=curEle.childNodes;//获取所有的子节点
        var ary=[];
        for(var i=0;i<childs.length;i++){
            var cur=childs[i];
            if(cur.nodeType==1){
               //如果有第二个参数的话:只传入过滤后的子元素
               if(tabName){//有第二个参数说明需要过滤
                   if(cur.tagName.toLocaleLowerCase()===tabName.toLocaleLowerCase()){
                       ary.push(cur);
                   }
               } else{//没有第二个参数说明不需要过滤
                   ary.push(cur);
               }
            }
        };
        return ary;
    }
    //prev:获取当前元素的上一个哥哥元素
    /**
     * @functionName:prev
     * @param:curEle当前元素;
     * @return:当前元素的上一个哥哥元素
     *
     *
     * */
    function prev(curEle) {
        if(flag){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while (prev && pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }
    //next:获取当前元素的下一个弟弟元素
    /**
     * @getChildren:next
     * @param:curEle当前元素;
     * @return:当前元素的下一个弟弟元素
     *
     *
     * */
    function next(curEle) {
        if(flag){
            return curEle.nextElementSibling;
        }
        var nex=curEle.previousSibling;
        while (nex && nex.nodeType!==1){
            nex=nex.nextSibling;
        }
        return nex;
    }
    //sibling:获取当前元素的相邻元素:
    /**
     * @getChildren:next
     * @param:curEle当前元素;
     * @return:ary当前元素的相邻元素
     *
     *
     * */
    function sibling(curEle) {
        var ary=[];
        var pre=this.prev(curEle);//
        var nex=this.next(curEle);//
        if(pre) ary.push(pre);
        if(nex) ary.push(nex);
        return ary;
    }
    //prevAll:获取当前元素的所有哥哥元素:
    /**
     * @functionName:prevAll
     * @param:curEle当前元素;
     * @return:当前元素的所有哥哥元素:
     *
     *
     * */
    function prevAll(curEle) {
        var ary=[];
        var pre=this.prev(curEle);
        while (pre){
            ary.push(pre);
            pre=this.prev(pre);
        }
        return ary;
    }
    //nextAll:获取当前元素的所有哥哥元素:
    /**
     * @functionName:nextAll
     * @param:curEle当前元素;
     * @return:当前元素的所有弟弟元素:
     *
     *
     * */
    function nextAll(curEle) {
        var ary=[];
        var nex=this.next(curEle);
        while (nex){
            ary.push(nex);
            nex=this.next(nex);
        }
        return ary;
    }
    //siblings:获取当前元素的所有兄弟元素;
    /**
     * @functionName:siblings
     * @param:curEle当前元素;
     * @return:当前元素的所有兄弟元素:
     *
     *
     * */
    function siblings(curEle) {
        var ary=[];
        var ary1=this.prevAll(curEle);
        var ary2=this.nextAll(curEle);
        return ary1.concat(ary2);
    }
    //firstChild:获取当前容器的第一个子元素
    /**
     * @functionName:firstChild
     * @param:curEle当前元素;
     * @return:当前容器的第一个子元素
     *
     *
     * */
    function firstChild(curEle) {
        var children=this.getChildren(curEle);
        return children[0];
    }
    //lastChild:获取当前容器的第一个子元素
    /**
     * @functionName:lastChild
     * @param:curEle当前元素;
     * @return:当前容器的最后一个子元素
     *
     *
     * */
    function lastChild(curEle) {
        var children=this.getChildren(curEle);
        return children[children.length-1];
    }
    //index:获取当前元素的索引
    /**
     * @functionName:index
     * @param:curEle当前元素;
     * @return::获取当前元素的索引
     *
     *
     * */
    function index(curEle) {
        return this.prevAll(curEle).length;
    }
    //appendChild:把新元素插入到父容器的末尾;
    /**
     * @functionName:appendChild
     * @param:curEle当前元素,父元素parent;
     * @return:无;
     *
     *
     * */
    function appendChild(curEle,parent) {
        parent.appendChild(curEle);
    }
    //prependChild:把新元素插入到父容器的开头;
    /**
     * @functionName:prependChild
     * @param:curEle当前元素,父元素parent;
     * @return:无;
     *
     *
     * */
    function prependChild(curEle,parent) {
       var first=this.firstChild(parent);
       if(first){
           parent.insertBefore(curEle,first);
       }else{
          parent.appendChild(curEle)
       }
    }
    //insertBefore:把新元素插入到指定元素的前面;
    /**
     * @functionName:insertBefore
     * @param:curEle当前元素,oldEle;
     * @return:无;
     *
     *
     * */
    function insertBefore(curEle,oldEle) {
        oldEle.parentNode.insertBefore(curEle,oldEle);
    }
    //insertAfter:把新元素插入到指定元素的后面;
    /**
     * @functionName:insertAfter
     * @param:curEle当前元素,oldEle;
     * @return:无;
     *
     *
     * */
    function insertAfter(curEle,oldEle) {
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(curEle,nex);
        }else{
            oldEle.parentNode.appendChild(curEle);
        }
    }
    return {
        toArray: toArray,
        toJSON: toJSON,
        urlString:urlString,
        getCss:getCss,
        offset:offset,
        win:win,
        rnd:rnd,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        getChildren:getChildren,
        prev:prev,
        next:next,
        sibling:sibling,
        prevAll:prevAll,
        nextAll:nextAll,
        siblings:siblings,
        firstChild:firstChild,
        lastChild:lastChild,
        index:index,
        appendChild:appendChild,
        prependChild:prependChild,
        insertBefore:insertBefore,
        insertAfter:insertAfter
    };
})();