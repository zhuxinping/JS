
var utils={
    //listToArray实现将类数组转化为数组的方法
    listToArray:function (likeAry) {
        var ary=[];
       try {
           //兼容写法
           ary=Array.prototype.slice.call(likeAry);

       }catch (e) {
           //不兼容写法
           for(var i=0;i<likeAry.length;i++){
               ary[ary.length]=likeAry[i];
           }
       }
       return ary;
    },
    //->jsonParse:把JSON格式的字符串转化为JSON格式的对象
    jsonParse:function (str) {
        var obj=null;
        try {
           //兼容写法
           obj= JSON.parse(str);
        }catch (e) {
            //不兼容写法
           obj= eval("(" + str + ")");
        }
        return obj;
    }
};