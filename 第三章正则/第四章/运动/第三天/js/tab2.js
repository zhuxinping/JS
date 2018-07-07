function MyTab() {
    this.defaultOpt={
      id:'box',
    };
    this.oBox=document.getElementById(this.defaultOpt.id);
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
    // this.init();
}

MyTab.prototype={
    constructor:MyTab,
    init:function (opt) {
        //用户传了按用户传的来,用户没传按照默认值来
        for(var attr in opt){
            this.defaultOpt[attr]=opt[attr];
        }
        console.log(this.defaultOpt.id);
        console.log(opt.id);
        //1.获取数据:

        //2.绑定数据:

        //3.延迟加载:

        //4.图片自动轮播:

        //5.焦点自动轮播:

        //6.移入停止移出继续:

        //7.点击焦点手动切换:

        //8.点击按钮左右切换:
    }
}