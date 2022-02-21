<!--
 * @Author: rh
 * @Description: 这不是一个 bug，这只是一个未列出来的特性
 * @LastEditors: rh
--> 

每个函数都包含从 `Function.prototype` 上继承而来的 三个方法： `apply()`、`call()`和 `bind()`,这三个方法都会去影响函数运行时this的指向。


## apply 方法 

作用与 call 方法作用类似，都是调用一个具有给定`this`值得函数，区别在于 参数传递的形式不一样，`call()`方法接受的是参数列表，而`apply()` 方法接受得是一个参数数组

`apply()` 方法接受两个参数：
  - 第一个参数就是指定运行函数得作用域（也就是给定得`this`值）
  - 第二个参数是一个数组，表示调用指定函数需要得参数列表

```js

  function sum(num1,num2){
    return sum1 + num2
  }

  function sumApply(num1,num2){
    return sum.apply(this,arguments)  // 比如传入 arguments 等价于  sum.apply(this,[num1,num2]),这里得this值（因为是在全局作用域中调用得，所以`this`指向得是 `window`对象）是 window
  }

  const nums = [5,6,2,3,7]

  const max = Math.max.apply(null,nums)     // 7

```

手写 `apply` 方法

```js
/**
 * apply 接收两个参数，第一个参数是 指定的 `this`值，第二个参数是 一个数组
 * apply 方法 返回的是 调用给定 this 值 和 指定函数得 结果
 * */
Function.prototype.MyApply = function (content=window){ 
  if(typeof this!== 'function') throw new Error('not function');  // 判断this 是不是一个函数

  content=content||window // 绑定上下文，没有则默认window

  const args = arguments[1] || []   // 获取参数

  content.fn = this // 在上下文对象上虚拟出一个fn 属性，将函数的this 作为对象的方法，从而this 会指向对象（content）

  const reuslt = content.fn(...args)  // 调用函数得到结果

  delete content.fn // 删除虚拟出来的 属性 fn

  return result // 返回结果
}

```


## call 方法

作用于 `apply` 方法类似，使用一个指定得`this`值和单独给出得一个或多个参数来调用一个函数。

`call()` 方法接受得参数： 第一个参数是给定得`this`值，后续参数是调用指定函数需要用到得参数

```js
  function sum(num1,num2){
    return num1 + num2
  }

  function sumCall(num1,num2){
    return sum.call(this,...arguments)
  }

  const arr = [1,2,3,89,46]

  const max = Math.max.call(null,...arr)    // 89

```

手写 `call`  方法
```js

/**
 *  call 方法接收得第一个参数为 给定得 this 值，剩余得参数都是 调用指定函数所需要传递得参数
 *  call 方法 返回得是调用指定函数得 结果
 * */

Function.prototype.MyCall = function(content){ 
  if(typeof this !=='function') throw new Error('not function')

  content=content||window // 绑定上下文，没有则默认window

  const args = [...arguments].slice(1)  // 获取调用指定函数所需要得参数

  content.fn = this     // 在上下文对象上虚拟出一个fn 属性，将函数的this 作为对象的方法，从而this 会指向对象（content）

  const result = content.fn(...args)  // 调用指定函数

  delete content.fn // 删除虚拟出来得fn 属性

  return result // 返回结果

}

```


## bind 方法
bind 方法得作用是创建一个新的函数，在 `bind()` 时被调用，这个新函数得`this` 被指定为`bind()`得第一个参数，而其余参数将作为新函数得参数,供调用时使用。

bind得返回值是函数

bind 得参数形式 跟 call 类似： 第一个参数是 `this`得指向，从第二个参数开始是接受得参数列表，区别

```js

const module = {
  x:42,
  getX:function(){
    console.log(this.x)
  }
}

const unboundGetX = module.getX

const boundGetX = unboundGetX.bind(module)

unboundGetX()   // undefined     函数 unboundGetX得 作用域是全局作用域，因此 unboundGetX 函数内部得this 指向得是 window 对象

boundGetX()     // 42

```

手写 `bind` 方法

```js

/**
 * bind 方法接收得参数于 call 类似，第一个参数为给定得`this`值，剩余得参数为调用指定函数所需传递得参数
 * bind 方法返回得是一个函数
 * */

Function.prototype.MyBind = function(content){ 
  if(typeof this !=='function') throw new Error('not function')

  content=content||window // 绑定上下文，没有则默认window

  let _self = this  // 保存this（函数）

  let args = [...arguments].slice(1)  // 获取参数
  
  // 实现新函数

  let bound = function(){
    // 合并参数
    let finalArgs = args.concat([...arguments])
    // 如果this 是bound 得实例，及使用 new 方法调用 bound
    if(this instanceof bound){
      // 原型集成
      if(_self.prototype){
        this.prototype = Object.create(_self.prototype)
      }
      // 如果返回得不是引用类型得值，就返回this
      let result = this.apply(this,finalArgs)
      let isObject = typeof result === 'object' && result !== null
      let isFunction = typeof result === 'function'
      if(isObject || isFunction) return result
    }

    // 修改this 指向，返回结果
    return _self.apply(content,finalArgs)
  }

  return bound
}

```

<Vssue title="Vssue Demo" />