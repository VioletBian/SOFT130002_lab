# Lab07需求文档

卞雨喆 18307110428

## 完成Lab7时的困难与解决方式：

1. 在<h3> <h4> 等元素内部频繁使用`document.createTextNode()`的字面量表达式，使代码十分繁琐。
   * 改用`element.innerText`,使代码简洁化。
2. Genre和LifeTime / < img>们不在同一行
   * 使用`element.style.display = "inline"`或 `element.style.display = "inlnebox"`
3. Genre使用h4标签后，发现和样图大小一致，粗度有一点不同
   * 问了助教发现是显示的误差
4. 要写好几个`document.createElement()`
   * 使用两次嵌套的循环，1.产生四个内容块 2. 内容块中遍历产生对应个数个代表画作

