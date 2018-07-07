(function () {
    function addWheel(ele,fn) {
        function wheel(e) {
            e=e||window.event;//chrome IE  下->负数 上->正数
            var bOk=false;
            // console.log(e.wheelDelta);
            //console.log(e.detail);//firefox 下->正数  上-负数
            if(e.detail){//火狐浏览器
                bOk=e.detail>0?true:false;//下->真   上->假
            }else{//chrome IE
                bOk=e.wheelDelta<0?true:false;//下->真   上->假
            }
            fn && fn.call(ele,bOk);
            e.preventDefault?e.preventDefault():e.returnValue=false;
        }
        //1.浏览器判断
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!==-1){//火狐浏览器
            ele.addEventListener('DOMMouseScroll',wheel,false);
        }else{//IE和chrome
            ele.onmousewheel=wheel;
        }
    }
    window.wheel=addWheel;
})();