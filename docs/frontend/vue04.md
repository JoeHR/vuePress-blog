## 你对MVVM的理解？

### MVVM 是什么？
MVVM 模式，顾名思义即 Model-View-ViewModal 模式。它萌芽于2005年微软推出的基于 windows 的用户界面框架 WPF ，前端最早的 MVVM框架 knockout 在2010年发布。

- Model层：对应数据层的域模型，它主要做域模型的同步。通过 Ajax/fetch 等API 完成客户端 和服务端业务 Model 的同步。在层间关系里，它主要用于抽象出 ViewModel 中视图的Model

- View层：作为试图模板存在，在MVVM里，整个View 是一个动态模板。除了定义结构、布局外，他展示的是ViewModel 层的数据和状态。View 层不负责处理状态，View 层做的是 数据绑定的声明、指令的声明、事件绑定的声明。

- ViewModel层：把 View 层需要的层数据暴露，并对 View 层的数据绑定声明、指令声明、事件绑定声明负责，也就是处理View 层的具体业务。ViewModel 底层会做好绑定属性的监听。当ViewModel 中数据变化，View 层会得到更新；而当View中声明了数据的双向绑定（通常是表单元素），框架也会监听View层（表单）的值的变化。一旦值变化，View层绑定的ViewModel中的数据也会得到自动更新。

   ![2019-07-16-21-47-05](../.vuepress/public/img/frontend/d55fe97b6ef63370645754e1d4a760b6.png) 

### MVVM的优缺点？
**优点**

- 1.分离视图（View）和模型（Model）,降低代码耦合，提高视图或者逻辑的重用性: 比如视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定不同的"View"上，当View变化的时候Model不可以不变，当Model变化的时候View也可以不变。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑

- 2 提高可测试性: ViewModel的存在可以帮助开发者更好地编写测试代码

- 3 自动更新dom: 利用双向绑定,数据更新后视图自动更新,让开发者从繁琐的手动dom中解放

**缺点**

- 1、Bug很难被调试: 因为使用双向绑定的模式，当你看到界面异常了，有可能是你View的代码有Bug，也可能是Model的代码有问题。数据绑定使得一个位置的Bug被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。另外，数据绑定的声明是指令式地写在View的模版当中的，这些内容是没办法去打断点debug的

- 2、一个大的模块中model也会很大，虽然使用方便了也很容易保证了数据的一致性，当时长期持有，不释放内存就造成了花费更多的内存

- 3、对于大型的图形应用程序，视图状态较多，ViewModel的构建和维护的成本都会比较高

## 你对Vue生命周期的理解？
### 生命周期是什么

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom->渲染、更新->渲染、卸载等一列过程，我们称这是Vue的生命周期

### 各个生命周期的作用

| 生命周期      | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreated | 组件实例被创建之初，组件的属性生效之前                       |
| created       | 组件实例已经完全创建，属性也绑定，但是真实Dom还没有生成，`$el`还不可用 |
| beforeMount   | 在挂在开始之前被调用：相关的render函数首次被调用             |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实力上去之后调用该钩子    |
| beforeUpdated | 组件数据更新之前被调用，发生在虚拟Dom 打补丁之前             |
| updated       | 组件数据更新之后                                             |
| activited     | keep-live 专属，组件被激活时调用                             |
| deadctivated  | keep-live专属，组件被销毁时调用                              |
| beforeDestroy | 组件销毁前调用                                               |
| destroyed     | 组件销毁后调用                                               |


### 异步请求适合在哪个生命周期调用？
官方实例的异步请求是在 mounted 生命周期中调用的，而实际上也可以在created生命周期中调用


## Vue 组件如何通信？
Vue组件通信的方法如下：

- props/$emit + `v-on` : 通过 props 将数据自上而下传递，而通过 `$emit`和`v-on`来向上传递信息
- EventBus: 通过EventBus 进行信息的发布和订阅
- vuex：是全局数据管理库，可以通过vuex管理全局的数据流
- $attrs/$listeners: Vue2.4 中加入的 $attrs/$listeners 可以进行跨级的组件通信
- provide/inject: 以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效，这成为了跨组件通信的基础

还有一些用 solt 插槽 或者 ref 实例进行通信的，使用场景过于有限。

## computed 和 watch 有什么区别
computed:

1. `computed` 是计算属性，也就是计算值，它更多用于计算值的场景
2. `computed` 具有缓存性，computed 的值在 getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取 computed 的值时才会重新调用对应的 getter 来计算
3. `computed` 适用于计算比较消耗性能的计算场景


watch:

1. 更多的时观察的作用，类似于某些数据的监听回调，用于观察 `props` `$emit`或者本组件的值，当数据变化时来执行回调进行后续操作
2. 无缓存性，页面重新渲染时值不变化也会执行

小结：
1. 当我们要进行数值计算，而且依赖于其他数据，那么把这个数据设计为computed
2. 如果你需要在某个数据变化时做一些事情，使用watch 来观察这个数据变化

## Vue 是如何实现双向绑定的？
 利用 `Object.defineProperty` 劫持对象的访问器，在属性值发生变化时我们可以获取变化，然后根据变化进行后续相应，在vue3.0 中通过 Proxy代理对象进行类似的操作

 ```js
// 这是将要没劫持的对象
const data = { name:" "}


function say(name){
  if(name==='古天乐'){
    console.log('给大家推荐一款超好玩的有限')
  }else if(name==='渣渣辉'){
    console.log('戏我演过很多，可游戏我只玩贪玩蓝月')
  }else{
    console.log('来做我的兄弟')
  }
}

// 遍历对象，对其属性值进行劫持

Object.keys(data).forEach(function(key){
  Object.defineProperty(data,key,{
    enumerable:true,
    configurable:true,
    get:function(){
      console.log('get')
    },
    set:function(newVal){
      // 当属性值发生变化时，我们可以进行额外操作
      console.log(`大家好，我系${newVal}`)
      say(newVal)
    }
  })
})

data.name = '渣渣辉';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月

 ```

## Proxy 与 Object.defineProperty 的优劣对比？

Proxy的优势如下：

- Proxy 可以直接监听对象而非属性
- Proxy 可以直接监听数组的变化
- Proxy 有多达13中拦截方法，不限于apply、ownKeys、deleteProperty、has 等等时 `Object.defineProperty` 不具备的
- Proxy 返回的是一个新对象，我们可以只操作新的对象达到目的，而 `Object.defineProperty`只能遍历对象属性直接修改
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty 的优势如下

- 兼容性号，支持 IE9

## 你是如何理解Vue的响应式系统的？

响应式系统的简述：
- 任何一个 Vue Component 都有一个与之对应的   Watcher
- Vue 的data 上的属性会被添加  getter 和 setter 属性
- 当 Vue Component render 函数被执行的时候，data 上会被触碰（touch）,即被读，getter 方法会被调用，此时Vue 会去记录此 Vue component 所依赖的所有 data。 (这一过程被称为依赖收集)
- data 被改动时（主要是用户操作），即被写，setter 方法会被调用，此时 Vue 会去通知所有依赖于此data 的组件去调用他们的 render 函数进行更新

## 既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM 进行 diff 检测差异

考点： Vue 的变化侦测原理

前置知识： 依赖收集，虚拟Dom,响应式系统

现代前端框架有两种方式侦测变化，一种是pull,一种是push

pull： 其代表为React,我们可以回忆下 React 是如何侦测到变化的， 我们通常会 用 `setState` API 显示更新，然后 React 会进行一层层的 Virtual Dom Diff 操作找出差异，然后 Patch 到 Dom 上，React 从一开始就不知道到底是哪发生了变化，只是知道 有变化了，然后 再进行 比较暴力的 Diff 操作查找 哪发生变化了，另外一个代表就是 Angular 的脏检查操作

push： Vue 的响应式系统则是 push 的代表，当 Vue 程序初始化的时候就会对数据 data 进行依赖的手机，一旦数据发生变化，响应式系统就会立刻得知，因此Vue是一开始就知道 在哪发生变化了， 但是这又会产生一个问题， 如果你熟悉Vue 的响应式系统就会知道 ，通常一个绑定一个数据就需要一个 watcher ,一旦我们的绑定细粒度过高就会产生大量的 watcher,这回带来内存以及依赖追踪的开销，而细粒度过低会无法精准侦测变化，因此 Vue 的设计式选择中等细粒度的方案， 在组建级别进行 push 侦测的方式，也就是那套响应式系统，通常我们会第一时间侦测到 发生变化的组件，然后在组建内部进行 Virtual Dom Diff 获取更加具体的差异，而 Vitual Dom Diff 则是 pull 操作，Vue 是 push + pull 结合的方式进行变化侦测

## Vue 为什么没有类似于 React 中 shouldComponentUpdate的生命周期？

考点： Vue 的变化侦测原理

前置知识： 依赖收集、虚拟DOM、响应式系统

根本原因式 Vue 与 React 的 变化侦测方式有所不同

React 是 pull 的方式侦测变化，当React 知道发生变化后，会使用 Virtural Dom Diff 进行差异检测，但是很多组件实际上是肯定不会发生变化的，这个时候需要用 shouldComponentUpdated 进行手动操作来减少 diff,从而提高程序整体的性能

Vue 是 pull + push 的方式侦测变化的，在一开始就知道哪个组件发生了变化，因此在 push 的阶段并不需要手动控制 diff, 而组建内部采用 的 diff 方式实际上是可以引入 类似 shouldComponentUpdate 相关生命周期的，单是通常合理大小的只需见不会有过量的 diff ，手动优化的价值有限，因此目前Vue 并没有考虑引入shouldComponentUpdated 这种手动优化的生命周期


## Vue 中的key 到底有什么用？
`key` 是为 Vue 中的 vnode 标记的唯一 id,通过 这个key,我们的diff 操作可以更准确、更快速

diff 算法的过程中，先回进行新旧节点的首位交叉对比，当无法匹配的时候会用新节点的key与 旧节点进行比对，然后超出差异

::: details
diff 过程可以概括为 oldCh 和 newCh 各有两个头尾的 变量 StartIdx 和 EndIdx，它们的2 个变量相互比较，一共有4中比较方式。

如果4中比较都没有匹配，如果设置了key,就会用key 进行比较，在比较的过程中，变量会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会借宿比较，这四种比较方式就是 首、尾、旧尾新头、旧头新尾

:::

- 准确： 如果不加 `key` ,那么vue会选择复用节点（Vue的就地更新策略）,导致之前节点的状态被保留下来，会产生一系列的bug
- 快速： key 的唯一性可以被Map 数据结构充分利用，相比于遍历查找的时间复杂度O(n)，Map 的时间复杂度仅仅为O(1)

```js
function createKeyToOldIdx(children,beginIdx,endIdx){
  let i,v
  const map = {}
  for(i  = beginIdx;i<= endIdx; i++){
    key = children[i].key
    if(isDef(key)) map[key] = i
  }
}

```

## Vue-Router  中的 hash 模式 和 history 模式的区别

- 最明显的显性区别： `hash`模式的 `url`中会夹杂着 `#`符号，而 `history`模式没有

- 底层实现不同：

  `hash`模式 是基于 浏览器的 `onhashchange`事件（监听 `location.hash`的改变）实现

  `history`模式是基于 `HTML5 history`新提供的两个方法：`pushState()`可以改变`url`地址且不会发送请求，`replaceState()`方法可以读取历史记录栈，还可以对浏览器记录进行修改 

  

## 介绍一下虚拟DOM

虚拟 `Dom` 本质就是用一个原生的`javascript`对象去描述一个 `Dom`节点。是对真实`Dom`的一层抽象。

由于在 浏览器中操作 `Dom`是昂贵的，频繁的操作`Dom`，会产生一定的性能问题，因此我们需要一层抽象，在`patch`过程中尽可能地一次性将差异更新到`Dom`中，这样保证了`Dom`不会出现性能很差的情况。

另外更重要的一点也是虚拟`Dom`的设计初衷，为了更好的跨平台，比如 `Node.js`就没有`Dom`，如果想实现`SSR(服务端渲染)`,那么一个方式就是借助 虚拟`Dom`，因为虚拟`Dom`本身就是 `Javascript`对象。

### 为什么不推荐直接操作`Dom`

-  DOM修改导致的页面重绘、重新排版！重新排版是用户阻塞的操作，同时，如果频繁重排，CPU使用率也会猛涨！浪费资源影响性能。 

- 破坏了代码模块化结构导致代码腐化

  组件原本可以控制哪些`dom`操作可以对外暴漏（即对应methods 中的方法）,但直接操作`dom`跳过了这个控制，导致这些方法搁置不被使用，随着项目越来越大，这样的操作行为如果越来越多，会导致后期定位直接操作`dom`导致的问题耗时会成指数级上升

- 过多的直接操作`dom`行为会增加代码的耦合性

  当包含直接操作`dom`行为的组件在别处使用时，直接操作`dom`的代码有可能不可用。

  如果直接操作`dom`的代码没有检查`dom`状态或没有精准捕获想要操作的`dom`时，则直接复用可能导致不可预料的后果，即意味着这个组件只能在特定的位置和场景中使用，耦合性提高，复用性下降

- 操作不属于自己的`dom`时，`dom`状态无法预知

  `dom`归属于其他组件时，`dom`可能没有生成，也有可能`dom`所属组件并没有被加载或使用。*

  如`dom`所在组件用v-if控制了`dom`的隐藏/显示，这样就必须在操作`dom`之前判断`dom`的状态，增加了冗余代码；

  *组件状态的变化可能导致获取到的`dom`不是预想的`dom`。*

