# Koa

 Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。 



## 简单使用 

- 安装

```shell
npm i koa -S
```

- 必须的 hello world

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

- ctx 上下文

![1574861511874](F:\myfiles\学习\study_workspace\vuepress\docs\.vuepress\public\img\node\node-koa-01.png)

## Koa的链式调用和原理

 Koa 是一个 通过 使用各种中间件去  处理 各种业务的 nodejs框架

可以通过链式调用的形式去 调用 中间件，像一个洋葱模型一样

![1574863298571](F:\myfiles\学习\study_workspace\vuepress\docs\.vuepress\public\img\node\node-koa-02.png)

```js
const Koa = require('koa')
const app = new Koa()


const middleware = function async(ctx, next) {
  console.log('this is a middleware')
  console.log(ctx.request.path)
  // next()
}

const middleware1 = function async(ctx, next) {
  console.log('this is a middleware1')
  console.log(ctx.request.path)
  next()
  console.log('this is a middleware1 ending')
}

const middleware2 = function async(ctx, next) {
  console.log('this is a middleware2')
  console.log(ctx.request.path)
  next()
  console.log('this is a middleware2 ending')
}

app.use(middleware1).use(middleware2).use(middleware)

app.listen(3001)

// 运行输出 结果为
this is a middleware1
/
this is a middleware2
/
this is a middleware
/
this is a middleware2 ending
this is a middleware1 ending

```

上述的代码 如果 调用运行不同

```js
# app.use(middleware).use(middleware1).use(middleware2)

// 运行输出结果为 
this is a middleware
/

# app.use(middleware1).use(middleware).use(middleware2)
// 运行输出结果为 
this is a middleware1
/
this is a middleware
/
this is a middleware1 ending
```



这说明 koa  调用中间件 时 遇到 没有 调用 next () 时 会默认 请求 结束，直接返回；如果遇到 调用 next() 方法时，会暂停当前中间件的执行，转而交给下一个中间件去执行，如果下一个中间件 没有调用 next()方法时，就会默认请求结束，返回继续去执行 上一级中间件的的next() 方法的后面语句。



## 使用 Koa开发 restful 接口

会使用到 的中间件 有

- 路由： koa-router
- 协议解析： koa-body
- 跨域处理： @koa/cors

### koa-router



### koa-body



### @koa/cors



### koa-combine-routers

