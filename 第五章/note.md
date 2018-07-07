###### 常用事件

1. 鼠标事件

onclick  onmouseover onmouseout onmouserenter onmouseleave ondbclick...


2. 系统事件
onload  onscroll

3.表单事件
onfocus onblur

4. 键盘事件

onkeydown onkeyup onkeypress

2） 事件包含两种 DOM 0级事件(只能发生在冒泡阶段) DOM  2级事件
DOM 0级事件: 属于元素的私有属性

DOM  2级事件:在元素所有的EventTarget这个类的原型上  公有方法
                标准浏览器:addEventListener(type,fn,false);

3)事件对象:对当前行为的详细描述
事件对象的兼容处理 e=e||window.event;

1. type:当前缩触发的行为;兼容
2. clientX/Y:当前鼠标落脚点距离可视区的坐标位置--兼容
3. pageX/Y:当前鼠标落脚点距离第一屏左上角的坐标位置--不兼容
(document.documentElement.scrollTop||documen.body.scrollTop)+e.clientY;

e.keyCode  键码
阻止默认事件

//需求:文本框中,只能输入数字,编辑数字 其他都不能操作

//事件源:

事件流:

第一种:事件流包含3阶段:1)捕获阶段 2)事件源 3)冒泡阶段

第二种:事件流包含两阶段: 1)捕获阶段 2)冒泡阶段

事件委托:->事件冒泡的典型应用  当一个容器中的n多个元素,都要发生某个行为的时候,我们可以把这个行为委托给他们共同的父级，通过事件源不同做区分;

拖拽思路

重复代码封装:processThis->功能改变fn中this的指向并且额给fn传event
processThis:返回值  函数的定义阶段


事件库 问题

1）事件问题 2)事件重复绑定问题  3 this问题;标准浏览器指向所属的元素对象  IE浏览器this指向window





