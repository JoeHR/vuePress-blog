## CSS 选择器的优先级是怎样的
CSS选择器的优先级是： !important > 行内（内联） > ID选择器 > 类选择器（属性选择器） > 标签选择器 > 通配符 > 继承 

到具体的计算层面，按照 内联 > ID > 类 > 标签,优先级是由 A、B、C、D的值来决定的，其中它们的计算规则如下：

- A 的值等于 1 的签替是 存在内联样式， 否在 A = 0
- B 的值等于 ID 选择器 出现的次数
- C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数
- D 的值等于 标签选择器 和 伪元素 出现的总次数

## link 和 @import 的区别

- link 属于 XHTML 标签，而 @import 是 css 提供的

- 页面被加载时，link 会同事被加载，而 @import 引用的css 会等到页面被加载完再加载

- import 只在IE5以上才能识别，而 link 是 XHTML 标签，无兼容性问题

- link 方式的样式权重高于 @import 的权重

- 使用 dom 控制样式时的差别，当使用 javascript 控制 dom 去改变样式的时候，只能使用 link 标签，因为 @import 不是 dom 可以控制的

## CSS 有哪些方式 可以隐藏页面元素

- `opacity:0`:本质上是将元素的透明图降为0，就看起来隐藏了，但是依然占据空间且可以交互

- `visibility:hidden`: 与上一个方法类似的效果，占据空间，但是不可以交互了

- `overflow:hidden`: 这个只隐藏元素溢出的部分，但是占据空间且不可交互

- `display:none`: 这个是彻底隐藏了元素，元素从文档流中小时，即不占空间也不可交互，也不影响布局

- `z-index:-9999`: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了

- `transform:scale(0,0)`: 平面变换，将元素缩放为0，但是依然占据空间，但不可交互


## em\px\rem 区别

- px: 绝对单位，页面按精确像素展示

- em：相对单位，基准点为父节点的字体的大小，如果自身定义了 font-size 则按自身来计算（浏览器默认字体是16px）,整个页面内1em 不是一个固定的值

- rem： 相对单位，可以理解为 根节点html节点的字体大小，css3 新加属性，chrome/firefox/IE9+ 支持

## 元素居中的方法

> 如果使用 Hack 的话，居中的方法非常多

### 水平居中

- 行内元素，给其父元素设置 `text-align:center`

- 块级元素，给该元素 设置 `margin:0 auto`

- 若子元素包含 浮动属性 （float:left），为了让子元素水平居中，则可让父元素宽度设置为 `fit-content`，并配合 `margin`

```css
.parent{
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width:fit-content;
    margin:0 auto;
}
```

- flex 

```css
  .center{
      display:flex;
      justify-content:center;
  }
  <div class="center">
      <div class="flex-div">1</div>
      <div class="flex-div">2</div>
  </div>

```

- table
```css

  .center{
      display:table;
      margin:0 auto;
      border:1px solid red;
  }
  <div class="center">水平居中</div>

```

还有一些通过position+(margin|transform)等方法的不一样列举了，非重点没必要。

## css 有几种定位方式

- static: 正常文档流定位，此时 `top`、`right`、`bottom`、`left`和 `z-index`属性无效，块级元素从上往下纵向排布，行级元素从左到右排列
- relative: 相对定位，此时的相对 是 相对于正常文档流的位置
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

> <iframe src=" https://codepen.io/xiaomuzhu/embed/bPVNxj?height=300&theme-id=33015&default-tab=css%2Cresult&user=xiaomuzhu&slug-hash=bPVNxj&pen-title=bPVNxj&name=cp_embed_1" height=350></iframe>

## 如何理解层叠上下文

### 是什么？
层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。


### 如何产生

触发以下条件则会产生层叠上下文

- 根元素
