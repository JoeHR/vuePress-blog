# vue 面试题

## 对Vue得理解

### 一、vue 是什么？

vue.js 是一个用于创建用户得开源javascript 框架，也是一个创建单页应用得web应用框架

### 二、vue 核心特性

**数据驱动(MVVM)**
`MVVM` 表示得是 `Model-View-ViewModel`

- Model: 模型层，负责处理业务逻辑以及和服务器端进行交互
- View: 视图层，负责将数据模型转化为UI展示出来，可以简单得理解为Html页面
- ViewModel: 视图模型层，用来连接Model和View,是Model 和 View 之间得通信桥梁

**组件化**
什么是组件化，一句话概况就是把图形，非图形得各种逻辑均抽象为一个统一得概念（组件）来实现开发得模式，在`Vue`中每一个`.vue`文件都可以视为一个组件

组件化得优势
- 降低系统得耦合度，在保持接口不变得情况下，我们可以替换不同得组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体得实现
- 调试方便，由于整个系统都是由通过组件组合起来得，在出现问题得时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题（之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单）
- 提高可维护性，由于每个组件得职责单一，并且组件在系统中是可被复用得，所以对代码进行优化可获得系统得整体升级

**指令系统**
解释：指令(Directive)是带有 v- 前缀得特殊属性作用：当表达式得值改变时，将其产生得连带影响，响应式得作用于 Dom 上

### 三、Vue跟传统开发得区别

vue基本不操作`dom`节点，双向绑定使 `dom` 节点跟视图绑定后，通过修改变量得值控制`dom`节点得各类属性。

- Vue所有得界面事件，都是只去操作数据得，传统开发操作DOM
- Vue所有界面得变动，都是根据数据自动绑定出来得，传统开发操作DOM

### 四、Vue跟React对比

> 相同点

- 都有组件化思想
- 都支持服务端渲染
- 都有Virtual DOM(虚拟Dom)
- 数据驱动视图
- 都有支持 native 得方案： Vue 得 `weex` 、React 得 `React Native`
- 都有自己得构建工具： Vue得 `Vue-cli`、 React 得 `Creat React App`

> 区别

- 数据流向得不通。`React`从诞生开始就推崇 单向数据流，而`Vue`是双向数据流
- 数据变化得实现原理不同。 `React` 使用得是不可变数据， 而 `Vue` 使用得是可变得数据
- 组件化通信得不同。 `React` 中通过使用回调函数来进行通信，而`Vue`中子组件向父组件传递消息有两种方式：事件和回调函数
- diff算法不同。`React` 主要使用 diff 队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。`Vue`使用双向指针，边对比，边更新DOM




## 对SPA单页应用得理解，它得优缺点分别是什么？如何实现SPA应用呢

### 一、什么是SPA

单页应用 SPA 是一种网络应用程序或网站得模型，它通过动态重写当前页面来与用户交互，避免了页面之间切换打断用户体验，在单页应用中，所有必要得代码（HTML、JAVASCRIPT 和 CSS） 都通过单个页面得加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当得资源并添加到页面，页面在任何时间点都不会重新加载，也不会将控制转移到其他页面

熟知得JS框架 如 `react`，`vue`,`angular`,`embr`都属于`SPA`

### 二、SPA 和 MPA 得区别

|                 | 单页应用（SPA）           | 多页应用（MPA）                    |
| --------------- | ------------------------- | ---------------------------------- |
| 组成            | 一个主页面和多个页面片段  | 多个主页面                         |
| 刷新方式        | 局部刷新                  | 整页刷新                           |
| url模式         | 哈希模式                  | 历史模式                           |
| Seo搜索引擎优化 | 难实现，可使用SSR方式改善 | 容易实现                           |
| 数据传递        | 容易                      | 通过url,cookie,localstorage 等传递 |
| 页面切换        |                           |                                    |
| 维护成本        |                           |                                    |

**单页应用优缺点**

优点：
- 具有桌面应用得即时性，网站得可移植性和可访问性
- 用户体验好，快，内容得改变不需要重新加载整个页面
- 良好得前后端分离，分离更明确

缺点：
- 不利于搜索引擎得抓取
- 首屏渲染相对较慢

### 三、实现一个SPA

**原理**

1. 监听地址栏中`hash`变化驱动界面变化
2. 用`pushstate`记录浏览器得历史，驱动界面发送变化

检测hash或者pushstate变化 -> 以当前hash为索引，加载对应资源 -> 等待资源加载完毕，隐藏之前得界面，执行回调 -> 显示当前界面，点击界面按钮或者浏览器回退/前进按钮触发hash变化

**实现**

`hash`模式
核心通过监听 `url`中得`hash`来进行路由跳转

```javascript
 // 定义Router
 class Router {

   constructor(){
     this.routes = {} // 存放路由 path 及 callback
     this.currentUrl = ''

     // 监听路由change调用相对应得路由回调
     window.addEventListener('load',this.refresh,false)
     window.addEventListener('hashchange',this.refresh,false)
   }

   route(path,callback){
     this.routes[path] = callback
   }

   push(path){
     this.routes[path] && this.routes[path]()
   }
 }

 // 使用 router
 window.miniRouter = new Router()

 miniRouter.route('/',()=>console.log('page1'))
 miniRouter.route('/page2',()=>console.log('page2'))

 miniRouter.push('/') // page1
 miniRouter.push('/page2') // page2

```


`history`模式
`history`模式核心 借用 `HTML5 history api`,`api`提供了丰富得`router`相关属性

- `history.pushState` 浏览器历史记录添加记录
- `history.replaceState` 修改浏览器历史记录中当前记录
- `history.popState` 当`history`发生变化时触发

```javascript

 class Router{

   constructor(){
     this.routes = {}
     this.listenPopState()
   }

   init(path){
     history.repalceState({path},null,path)
     this.routes[path] && this.routes[path]()
   }

   route(path,callback){
     this.routes[path] = callback
   }

   push(path){
     history.pushState({path},null,path)
     this.routes[path] && this.routes[path]()
   }

   listenPopState(){
     window.addEventListener('popstate',e=>{
       const path = e.state && e.state.path
       this.routes[path] && this.routes[path]()
     })
   }
 }

 window.miniRouter = new Router()
 miniRouter.route('/', ()=> console.log('page1'))
 miniRouter.route('/page2', ()=> console.log('page2'))

 // 跳转
 miniRouter.push('/page2')  // page2

```

### 四、如何给SPA做SEO

下面给出基于`Vue`得`SPA` 如何实现`SEO`得三种方式

1. SSR 服务端渲染

将组件或页面通过服务器生成 html，再返回给浏览器，如`nuxt.js`

2. 静态化

目前主流得静态化主要有两种方式：

- 一种时通过程序将动态页面抓取并保存为静态页面，这样得页面得实际存在于服务器得硬盘中
- 另外一种时通过WEB服务器得 `URL Rewrite`得方式，它的原理时通过 web 服务器内部模块 按照一定得规则将外部得 URL 请求转化为 内部得文件地址，一句话说就是把外部请求的静态地址转化为实际得动态页面地址，而静态页面实际是不存咋得。

3. 使用 `Phantom.js` 针对爬虫处理
原理是通过 `nginx`配置，判断访问来源是否为爬虫，如果是，则搜索引擎得爬虫请求会转发到一个 `node server`，再通过`Phantom.js`来解析完整得`HTML`，返回给爬虫。


## Vue 中得 v-show 和 v-if 怎么理解

### 一、v-show 与 v-if得共同点

在 `vue`中 `v-show` 与 `v-if`得作用效果是相同得（不含`v-else`）,都能控制元素在页面是否显示。

### 二、v-show 与 v-if得区别

- 控制手段不同
- 编译过程不同
- 编译条件不同

**控制手段**
`v-show` 隐藏则是为该元素添加 `css--display:none`,`dom` 元素依旧存在。 `v-if` 显示隐藏是 将`dom`元素整个添加和删除

**编译过程**
`v-if`切换有一个局部编译/卸载得过程，切换过程中合适得销毁和重建内部得事件监听和子组件吗;`v-show`只是简单得基于 css 切换

**编译条件**
`v-if`是真正得条件渲染，他会确保在切换过程中条件块内得事件监听器和子组件适当得被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染

- `v-show` 由 false 变为 true得时候不会触发组件得生命周期

- `v-if` 由 false 变为 true得时候，触发组件得 `beforeCreate`、`created`、`beforeMount`、`mounted`钩子,由true 变为false得时候 会触发 组件得 `beforeDestroy`、`destroyed`方法

**性能消耗**
`v-if` 有更高的切换消耗，`v-show` 有更高的初始渲染消耗

### v-show 与 v-if 原理分析

具体解析流程大致如下：

- 将模板`template`转为 `ast`结构的 `js`对象
- 用`ast`得到的`js`对象拼装 `render` 和 `staticRenderFns` 函数
- `render`和`staticRenderFns` 函数被调用后生成 虚拟`vnode`节点，该节点包含创建`DOM`节点所需信息
- `vm.patch`函数通过虚拟`dom`算法利用 `vnode`节点创建真实`dom`节点

**v-show原理**
不管初始条件是什么，元素总是会被渲染

我们看一下在`vue`中是如何实现的

代码很好理解，有`transition`就执行`transition`,没有就直接设置`display`属性

```javascript
// https://github.com/vuejs/vue-next/blob/3cd30c5245da0733f9eb6f29d220f39c46518162/packages/runtime-dom/src/directives/vShow.ts
import { ObjectDirective } from '@vue/runtime-core'

interface VShowElement extends HTMLElement {
  // _vod = vue original display
  _vod: string
}

export const vShow:ObjectDirective<VShowElement> = {
  beforeMount(el,{ value },{ transition }){
    el._vod = el.style.display === 'node' ? '': el.style.display
    if(transition && value){
      transition.beforeEnter(el)
    }else{
      setDisplay(el,value)
    }
  },

  mounted(el,{ value }, { transition }){
    if(transition && value){
      transition.enter(value)
    }
  }

  updated(el,{ value, oldValue },{ transition }){
    if(transition && value !== oldValue){
      if(value){
        transition.beforeEnter(el)
        setDisplay(el,true)
        transition.enter(el)
      }else{
        transition.leave(el,()=>{
          setDisplay(el,false)
        })
      }
    }else{
      transition.leave(el,()=>{
        setDisplay(el,value)
      })
    }
  }
}


```
