//->想要操作谁 就先获取谁

var $=document.querySelectorAll.bind(document);

var oTab=$("#tab")[0];
var tHead=oTab.tHead;
var oThs=tHead.rows[0].cells;//第一行的所有列
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;
var data=null;
//1.首先获取后台(data.txt)中的数据->"JSON格式的字符串" ->ajax技术(async javascript and xml)
//1)创建一个ajax对象
var xhr=new XMLHttpRequest;//创建一个XMLHttpRequest的实例

//2)打开我们需要请求的那个文件地址
xhr.open("get","./json/data.txt",true);//异步请求
//3)监听请求的状态
xhr.onreadystatechange=function () {
  if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)) {
      var val =xhr.responseText;
     //console.log(val);
      data=utils.jsonParse(val);
      //console.log(data.length);
      //请求到数据我们才绑定
      //有了数据在绑定
      bind();
      //有了数据隔行变色
      changeBg();
  }
};
//4)send发送请求
xhr.send(null);


//2.实现我们的数据绑定
function bind() {
    console.log(data);
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var cur=data[i];
        var oTr=document.createElement("tr");//每次循环创建一个tr
        //每个tr还需要创建四个td因为每一个对象有四个键值对
        for(var key in cur){
            var oTd=document.createElement("td");
            //性别的特殊处理
            if(key==="sex"){
                oTd.innerHTML=cur[key]===0?"男":"女";
            }else{
                oTd.innerHTML=cur[key];
            }
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg=null;
}
//实现隔行变色
function changeBg() {
    for(var i=0;i<oRows.length;i++){
        oRows[i].className=i%2===1?"bg":null;
    }
}
//编写按照年龄这一列排序
function sort(n) {//n是当前点击这一列的索引
    //this->oThs[1];
    var _this=this;//_this->oThs[1];//定义一个变量_this存储this
    //->把存储所有行的类数组转换为数组
    var ary=utils.listToArray(oRows);
    //给数组进行排序
    //第二次排序之前改变flag让它升序排序
    //每一次执行sort进来的第一步就是先让flag的值乘以-1  flag=1;升序
    //第二次进来还是让flag乘以-1  flag=-1；降序
    //多列排序优化问题:点击当前列，需要让其他列的flag存储的值回归到初始值-1，这样当返回头点击其他列才是重新开始
   for(var k=0;k<oThs.length;k++){
        if(oThs[k]!==this){//排除当前列
            oThs[k].flag=-1;
        }
   }
    _this.flag *=-1;
    ary.sort(function (a,b,) {
        //this->window//匿名函数中的this是window
        //每一行的第二列的年龄排序
       return (parseInt(a.cells[n].innerHTML)-parseInt(b.cells[n].innerHTML))*_this.flag;
    });
    //按照ary中的最新顺序,把每一行重新添加到tBody
    var frg=document.createDocumentFragment();
    for(var i =0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    };
    tBody.appendChild(frg);
    frg=null;
    //->按照最新顺序重新进行隔行变色
    changeBg();
}
//第五步:点击第二列的时候实现排序
//多列排序:所有具有cursor样式的列都可以进行排序

//遍历头部的所有列

for(var i=0;i<oThs.length;i++){
    var curTh=oThs[i];
    if(curTh.className==="cursor"){
        curTh.flag=-1;//升降序的标志
        curTh.index=i;//索引存起来方便后面判断是根据哪一列排序
        curTh.onclick=function () {
            //this->oThs[1]
            //sort();//->sort->this->window
            // sort.call(oThs[1]);//->sort->this->window->oThs[1]
            sort.call(this,this.index);//把索引传递进去
        };
    }
}

//增加个自定义属性实现升降序的标志自定义属性会保存上次点击的状态 也可以定义一个开关变量实现这个功能
// oThs[1].flag=-1;//->给当前点击这行的年龄这列添加一个flag表示升降序
// oThs[1].onclick=function () {
//     //this->oThs[1]
//     //sort();//->sort->this->window
//    // sort.call(oThs[1]);//->sort->this->window->oThs[1]
//     sort.call(this);
// };
// //多列排序优化问题:







