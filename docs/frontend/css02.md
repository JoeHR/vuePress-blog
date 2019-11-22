### 伪元素实现气泡对话框

```
.logo-pp {
    display: inline-block;
    width: 150px;
    height: 50px;
    border-radius: 8px;
    background-color: rgb(68, 170, 59);
    &::before {
        content: '等你下课哦！';
        margin-top: 14px;
        margin-left: -33px;
        position: absolute;
        color: #fff;
    }
    &::after {
        content: '';
        margin-top: 42px;
        display: inline-block;
        border-width: 6px 10px 6px 10px;
        border-style: solid;
        border-color: transparent;
        border-top-color: rgb(68, 170, 59);
        transform: rotate(-147deg) translate(-12px, 6px);
    }
}

<!-- html -->
<div class="logo-pp"></div>
```

### 文本溢出 省略号

```
// 单行文本溢出
.oneline{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

// 多行文本溢出
.moreline{
  width:100%;
  overflow: hidden;
  display: -webkit-box;   //将对象作为弹性伸缩盒子模型显示  *必须结合的属性*
  -webkit-box-orient: vertical;   //设置伸缩盒对象的子元素的排列方式  *必须结合的属性*
  -webkit-line-clamp: 3;   //用来限制在一个块元素中显示的文本的行数
  word-break: break-all;   //让浏览器实现在任意位置的换行 *break-all为允许在单词内换行*
}
```

### 2、不换行、自动换行、强制换行

```
//不换行
.wrap {
  white-space:nowrap;
}

//自动换行
.wrap {
  word-wrap: break-word;
  word-break: normal;
}

//强制换行
.wrap {
  word-break:break-all;
}

```

### 3、文本两端对齐

```
.textJustify{
    text-align: justify;
    text-justify: distribute-all-lines;  //ie6-8
    text-align-last: justify;  //一个块或行的最后一行对齐方式
    -moz-text-align-last: justify;
    -webkit-text-align-last: justify;
}
```

### 4、文字竖向排版

```

// 单列展示时
.wrap {
    width: 25px;  // 限制宽度
    line-height: 18px;
    height: auto;
    font-size: 12px;
    padding: 8px 5px;
    word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/
}

// 多列展示时
.wrap {
    height: 210px;
    line-height: 30px;
    text-align: justify;
    writing-mode: vertical-lr;  //从左向右
    writing-mode: tb-lr;        //IE从左向右
    //writing-mode: vertical-rl;  -- 从右向左
    //writing-mode: tb-rl;        -- 从右向左
}

```

### 5、禁用鼠标事件

```
.selector{
    pointer-events: none;
}
```

### 6、禁止用户选择

```
.wrap {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### 7、图片宽度自适应

```
img{
  max-width:100%;
}
```

### 8、字母大小写/首字母大写/

```
.wrap{
  text-transform: uppercase;  // 将所有的字母转为大写字母
}

.wrap{
  text-transform: lowercase;  // 将所有的字母转为小写字母
}

.wrap{
  text-transform: capitalize; // 首字母大写
}

.wrap{
  font-variant: small-caps;   // 将字体变成小型的大写字母
}
```

### 9、容器设为透明

```
.wrap{
  background:transparent;
}

.wrap{
  filter:alpha(opacity=50);
  -moz-opacity:0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}

```

### 10、消除 transition 闪屏

```
.wrap{
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
}
```

### 11、自定义滚动条（只在谷歌中生效）

```
overflow-y: scroll;
整个滚动条
::-webkit-scrollbar {
    width: 5px;
}

滚动条的轨道
::-webkit-scrollbar-track {
    background-color: #ffa336;
    border-radius: 5px;
}

滚动条的滑块
::-webkit-scorllbar-thumb {
    background-color: #ffc076;
    border-radius: 5px;
}

```

### 12、让 HTML 识别 string 里的 '\n' 并换行

```
body {
  	white-space: pre-line;
}
```

### 13、移除被点链接的边框

```
a {outline: none}
a {outline: 0}

```

### 14、使用 CSS 显示链接之后的 URL

```
a:after{content:" (" attr(href) ") ";}
```

### 15、select 内容居中显示、下拉内容右对齐

```
select{
    text-align: center;
    text-align-last: center;
}
select option {
    direction: rtl;
}

```

### 16、修改 input 输入框中光标的颜色不改变字体的颜色

```
input{
    color:  #fff;
    caret-color: red;
}
```

### 17、修改 input 输入框中 placeholder 默认字体样式

```
//webkit内核的浏览器
input::-webkit-input-placeholder {
    color: #c2c6ce;
}
//Firefox版本4-18
input:-moz-placeholder {
    color: #c2c6ce;
}
//Firefox版本19+
input::-moz-placeholder {
    color: #c2c6ce;
}
//IE浏览器
input:-ms-input-placeholder {
    color: #c2c6ce;
}
```

### 18、让 div 里的图片和文字同时上下居中

```
.wrap {
  height: 100,
  line-height: 100
}
img {
  vertival-align：middle
}
// vertical-align css的属性vertical-align用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。只对行内元素、表格单元格元素生效，不能用它垂直对齐块级元素
// vertical-align：baseline/top/middle/bottom/sub/text-top;
```
