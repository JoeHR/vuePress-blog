<!--
 * @Author: rh
 * @Date: 2020-06-15 09:54:58
 * @LastEditTime: 2020-06-15 13:35:15
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
--> 
## 装饰器模式
装饰器模式，又名装饰者模式。它的定义是“在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求”。

应用场景：需要对已有的功能做个拓展，只关心拓展出来的那部分新功能如何实现，但不关心它现有的业务逻辑是啥样。

通过一个例子来了解装饰器模式的功能。

例如

> 场景：给定一个按钮，点击后弹出"您还未登录的哦" 的提示弹窗，在弹窗关闭后把按钮的文案改为"快去登录"，同时按钮置灰

``` javascript
// 将展示 Modal 弹窗的逻辑单独封装
function openModal(){
  const modal = new Modal()
  modal.style.display = 'block'
}



// 按钮文案修改逻辑
function changeButtonText(){
  const btn  = document.getElementById('open')
  btn.innerText = '快去登录'
}

// 按钮置灰逻辑
function disableBtton(){
  const btn = document.getElementById('open')
  btn.setAttribute('disabled',true)
}

// 功能逻辑整合
function changeButtonStatus(){
  changeButtonText()
  disableButton()
}

// 然后把 三个操作逐个添加到 open按钮的监听函数里：
 document.getElementById('open').addEventListenenr('click',function(){
   openModal()
   changeButtonStatus()
 })
```
如此一来，我们就实现了“只添加，不修改”的装饰器模式，使用changeButtonStatus的逻辑装饰了旧的按钮点击逻辑。以上是ES5中的实现，ES6中，我们可以以一种更加面向对象化的方式去写：

```javascript
// 定义打开按钮
class OpenButton(){
  // 点击展示弹窗
  onClick(){
    const modal = new Modal()
    modal.style.display = 'block'
  }

}

// 定义按钮对应的装饰器
class Decorator{
  // 将按钮实例传入
  constructor(open_button){
    this.open_button = open_button
  }

  onClick(){
    this.open_button.onClick()
    // "包装"已成新逻辑
    this.chanmgeButtonStatus()
  }

  chanmgeButtonStatus(){
    this.changeButtonText()
    this.disableButton()
  }

  // 按钮文案修改逻辑
  changeButtonText(){
    const btn  = document.getElementById('open')
    btn.innerText = '快去登录'
  }

  // 按钮置灰逻辑
  disableButton(){
    const btn = document.getElementById('open')
    btn.setAttribute('disabled',true)
  }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function() {
    // openButton.onClick()
    // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
    decorator.onClick()
})

```

## ES7中的装饰器模式
ES7中提供了一个语法糖，可以轻松的给一个类装上装饰器

```javascript
class Dectorator{
  constructor(circle){
    this.circle = circle
  }

  draw(){
    this.circle.draw()
    this.setRedBorder()
  }

  setRedBorder(){
    this.circle.border = 'red'
  }
}

@Dectorator
class Circle{
  draw(){
    return {name:'circle',shape:'circle'}
  }
}

console.log(new Circle().setRedBorder)
```

也可以用同样的语法糖去装饰类里面的方法

```javascript
function funcDecorator(target,name,descriptor){
  let originalMethod = descriptor.value
  descriptor.value = function(){
    console.log('我是Func的装饰器逻辑')
    return originalMethod.appl有（this,arguments）
  }
  return descriptor
}

class Button{
  @funcDecorator
  onClick(){
    console.log('我是 func 的原有逻辑')
  }
}

// 验证装饰器是否生效
const button = new Button
button.onClick()

```


## 装饰器语法糖背后的原理

在使用装饰器装饰一个对象时，需要先顶一个一个装饰器函数,将被装饰者交给装饰器。这就是 装饰器语法糖首先帮我们做掉的工作 - 函数传参 & 调用

### 函数传参和调用

装饰器分为两种：类装饰器-装饰类 ; 方法装饰器 -  装饰方法

#### 类装饰器的参数

当我们给一个类添加装饰器时:

```javascript

function classDecorator(target){
  target.hasDecorator = true
  return target
}

// 将装饰器 "安装"  到 button 类上
@classDecorator
class Button{
  // Button 类的相关逻辑
}

```

此处的 target 就是被装饰的类本身

#### 方法装饰器的参数
当给一个方法添加装饰器时

```javascript

function funcDecorator(target,name,descriptor){
  let originalMethod = descriptor.value
  descript.value = function(){
    console.log('我是 func 的装饰器逻辑')
    return originalMethod.apply(this,arguments)
  }
  return descriptor
}

class Button{
  @funcDecorator
  onClick(){
    console.log('我是 func 的原有逻辑')
  }
}

```
此处的 target 变成了 `Button.prototype`,即类的原型对象。这是因为 `onClick` 方法总是要依附其实例存在的,修饰 `onClick`其实就是修饰它的实例。但我们的装饰器函数执行的时候。`Button`实例还**并不存在**。为了确保实例生成后可以顺利调用被装饰好的方法，装饰器只能去修饰`Button`类的原型对象。


#### 装饰器函数调用的时机
装饰器函数执行的时候，Button 实例还并不存在。这是因为实例是在我们的代码运行时动态生成的，而装饰器函数则是在编译阶段就执行了。所以说装饰器函数真正能触及到的就只有类这个层面上的对象。

### 属性描述对象传递

在编写类装饰器时，一般获取一个target 参数就足够了。但在编写方法装饰器时，我们往往需要至少三个参数。

```javascript
function funcDecorator(target,name,descriptor){
  let originalMethod = descriptor.value
  descriptor.value = function(){
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this,arguments)
  }
  return descriptor
}

```

参数释义：

- target : 被装饰者对象
- name: 修饰的目标属性名
- descriptor: 属性描述对象。

关于属性描述对象，在使用 `Object.defineProperty` 方式时也需要传递这个属性描述对象。

```javascript
Object.defineProperty(obj,prop,descriptor)
```

此处的 `descriptor` 和 装饰器函数里的 descriptor 是同一个东西。它是 Javascript 提供的一个内部数据结构、一个对象，专门用来描述对象的属性。它用各种各样的属性描述符组成，这些描述符又分为数据描述符和存取描述符。

- 数据属性描述(数据描述符)：包括 
  + [[value]] - 存放属性值，默认未undefined, 
  + [[writable]] - 表示属性值是否可改变,默认为true, 
  + [[enumerable]] - 表示属性是否可枚举，默认为true, 
  + [[configurable]] - 属性值是否可配置,默认为true

- 访问器属性描述(存取描述符): 包括
  + [[get]] - 访问属性时调用的方法，默认 undefined
  + [[set]] - 设置属性时调用的方法，默认为 undefined

很明显，那到了descriptor,就相当于那到了慕白哦方法的控制权。通过修改descriptor,我们就可以对目标方法的逻辑进行拓展了。

## 使用实践

### React种的装饰器： HOC

> 高阶组件就是一个函数，该函数接受一个组件为参数，并返回一个新的组件。

HOC(Higher Order Component)即高阶组件。它是装饰器模式在 React 种的实践，同时也是 React 应用种非常重要的一部分，通过编写高阶组件，我们可以充分复用现有逻辑，提高编码效率和代码的健壮性。

> 编写一个高阶组件，它的作用时把传入的组件 丢进一个有红色边框的容器里（拓展其样式）
```javascript

import React,{Compoennt} from 'react'

const BorderHoc = WrappedComponent => class extends Component{
  render(){
    return <div style={{border:'1px solid red'}}>
              <WrappedComponent />
            </div>
  }
}

export default BorderHoc
```

用它来装饰目标组价

```javascript

import React,{Component} from 'react'
import BorderHoc from './BorderHoc'

// 用 BorderHoc 装饰目标组件
@BorderHoc
class Target extends Component{
  render(
    // 目标组件的具体业务逻辑
  )
}

export default Targert
```

可以看出，高阶组件从实现层面来看其实就是上文我们提到的类装饰器。在高阶组件的辅助下，我们不必因为一个小小的拓展而大费周折地编写新组件或者把一个新逻辑重写 N 多次，只需要轻轻 @ 一下装饰器即可。

### 使用装饰器改写 Redux connect

Redux 是热门的状态管理工具。在 React 中，当我们想要引入 Redux 时，通常需要调用 connect 方法来把状态和组件绑在一起：

```javascript

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from './action.js'

class App extends Component{
  render(){
    // App 的业务逻辑
  }
}


function mapStateToProps(state){
  // 假设App的状态对应状态树上的app节点
  return state.app
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(action,dispatch)
}

// 把App 组件与 Redux 绑在一起
export default connect(mapStateToProps,mapDispatchToProps)(App)

```

connect 需要传入两个参数： `mapStateToProps`是一个函数，它可以建立组件和状态之间的映射关系;`mapDispatchToProps`也是一个函数，它用于建立组件和`store.dispatch`的关系，是组件具备通过`dispatch`来派发状态的能力

总而言之，我们调用 connect 可以返回一个具有装饰作用的函数，这个函数可以接受一个React 组件作为参数，使这个目标和Redux 结合，具备Redux 提供的数据和能力。既然有装饰作用，既然是能力的扩展，那么就一定能用装饰器来改写：

把 connect 抽出来

```javascript

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import action from './action.js'

function mapStateToProps(state){
  return state.app
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(action,dispatch)
}

// 将connect调用后的结果作为一个装饰器导出
export default connect(mapStateToProps,mapDispatchToProps)

```
在组件文件里引入 connect :

```javascript

import React,{Component} from 'react'
import connect from './connect.js'

@connect
export default class App extends Component{
  render(){
    // App 的 业务逻辑
  }
}

```
:::tips
Tips： 回忆一下上面一个小节的讲解，对号入座看一看，connect装饰器从实现和调用方式上来看，是不是同时也是一个高阶组件呢？
:::

推荐一个非常赞的装饰器模式库 - [core-decorators](https://github.com/jayphelps/core-decorators)



<Vssue title="Vssue Demo" />