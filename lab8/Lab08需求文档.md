# Lab8设计文档

卞雨喆 18307110428

## 任务1：

写一个切换上/下一张的函数：

```js
// 切换图片的函数：传入正值，切换下一张。传入负值，切换上一张。
function switchImg(bool) {
    // 先检测现在位于那一张上
    for (var i = 0; i < buttons.length; i++) {
        if (buttons.item(i).classList.contains("on")) {
            currentImgIndex = i;
            break;
        }
    }
    var gap = (bool) ? -600 : 600;
    var j = (bool) ? 1 : -1;
    // 特殊情况：第一张切换上一张
    if (currentImgIndex == 0 && bool == false) {
        wrap.style.left = "-2400px";
        buttons.item(0).classList.remove("on");
        buttons.item(4).classList.add("on");
        currentImgIndex = 4;
    }
    // 特殊情况：第五张切换下一张
    else if (currentImgIndex == 4 && bool == true) {
        wrap.style.left = "0px";
        buttons.item(0).classList.add("on");
        buttons.item(4).classList.remove("on");
        currentImgIndex = 0;
    }
    // 其他的切换
    else {
      // ①左移到下一张图片的位置
        wrap.style.left = -600 * currentImgIndex + gap + "px";
      // ②拿掉on的类名
        buttons.item(currentImgIndex).classList.remove("on");
      // ③给新的图片加上on类名
        buttons.item(currentImgIndex + j).classList.add("on");
      // ④全局“当前照片号”变量更新
        currentImgIndex += j;
    }
}

```

## 任务2：

通过 `setInterval()`和`clearInterval()`在mouseover、mouseout事件上调用任务一中写的`switchImg(true)`



## 任务3：

通过循环遍历给每个buttons里的按钮都加上click事件句柄，点击时currentImgIndex更换、on类名更换、wrap.style.left更变。

*注意* ：因为点击完按钮后，如果鼠标留在按钮上，会不触发任务二中的暂停逻辑。所以在此处加上了每个按钮的任务二mouseover/mouseout调用逻辑。



## 任务4：

通过jQuery锁定table 下的 td，在点击时若td无“input”类名，则给其添加“.input"类名，并写入原内容为

value值的<input>子元素。

对于新写入的<input>：

1. 设置获取焦点，

  1. 获取焦点时，通过：

  	非IE的`input[0].setSelectionRange(0,0);`

  	或者IE的

  	​	range.collapse(true)
  	​	range.moveEnd('character', pos)
  	​	range.moveStart('character', pos)
  	​	range.select()

  	固定光标在首位置：


```js
if(input[0].setSelectionRange)input[0].setSelectionRange(0,0);
else if (input[0].createTextRange) { 
	let range = input[0].createTextRange()
	range.collapse(true)
	range.moveEnd('character', pos)
	range.moveStart('character', pos)
	range.select()
 }
```



2. 设置失去焦点时调用函数
	1. 去掉input类名，并重写子node
	2. 若有填入则子node改为填入text的文本子节点
	3. **若无，改为null of input提示语**

