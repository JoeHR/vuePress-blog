## 简单介绍下Promise

Promise 是异步编程的一种解决方案（实现异步编程的方法有：回调函数callback，promise,Generator和 async/await），比传统的解决方案--回调函数和事件--更合理和更强大。它有社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多

> 异步的行为是js的基础，以前的实现并不理想。早起js只支持定义回调函数来表明异步操作完成。串联多个异步操作是一个常见的问题。通常需要深度嵌套回调函数（俗称“回调地狱”）。Promise 解决了这个问题，因为他可以链式调用

**解决了什么问题**
- 消灭嵌套调用：通过Promise的链式调用可以解决；
- 合并多个任务的请求结果： Promise.all(), Promise.race()

## 实现一个简单的，支持异步链式调用的Promise类

[手写一个符合Promise A+ 规范的Promise 类](/frontend/js-js03.html#promise)

## Promise存在哪些缺点

- 无法取消`Promise`：一旦新建它就会立即执行，无法中途取消
- 如果不设置reject回调函数，Promise内部抛出的错误，不会反映到外部。
- 吞掉错误或异常，错误只能顺序处理，即便在`Promise`链最后添加`catch`方法，依然可能存在无法捕获的错误（catch内部可能会出现错误）

## 使用Promise 进行顺序（sequence）处理

- 使用`async`函数配合 `await` 或者使用 `generator`函数配合`yield`
- 使用`promise.then` 通过 for循环或者 Array.prototype.reduce 实现

```js

function sequenceTasks(tasks){
  function recordVal(results,value){
    results.push(value)
    return results
  }
  const pushValue = recordVal.bind(null,[])
  return tasks.reduce((promise,task)=>{
    return promise.then(()=>task).then(pushValue)
  },Promise.resolve())
}

```

## 如何停止一个Promise链

在要停止的`promise`链位置添加一个方法，返回一个永不执行的`resolve`或者`reject`的`promise`,那么这个`promise`永远处于`pending`状态，所以永远也不会向下执行`then`或`catch`了，这样就停止了一个`promise`链

```js

promise.cancel = Promise.stop  = ()=>new Promise(()=>{})


```

## Promise链上返回的最后一个Promise出错了怎么办

catch 在promise 链式调用的末尾调用，用于捕获链条中的错误信息，但是catch方法内部也可能出现错误，所以有些 promise 实现中增加了一个方法 done, done 相当于提供了一个不会出错的catch方法，并且不再返回一个promise,一般用来结束一个promise链。

```js

done(){
  this.catch(reason=>{
    console.log('done', reason);
    throw reason
  })
}

```


## Promise 存在哪些使用技巧或者最佳实践

- 链式 `promise` 要返回一个 `promise`， 而不是构造一个 `promise`

- 合理的使用 `promise.all` 和 `promise.race` 等方法

- 在写 `promise` 链式调用的时候， `then` 方法不传 `onRejected` 函数，只需要在最末尾加一个 `catch()` 就可以了，这样在该链条中的 `promise` 发生的错误都会被最后的`catch` 捕获到。如果 `catch()` 代码有出现错误的可能，需要在链式调用的末尾增加 `done()` 函数
