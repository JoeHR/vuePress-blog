## 路由参数解耦

在获取路由参数时，一般都会 通过` this.$route.params.id` 来获取

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

::: warning
在组件中使用 `$route` 会使其与对应得路由地址 和组件 形成 高度耦合，从而使 某些组件只能在 既定得 URL 中使用，限制了路由 得灵活性
:::

::: tip
可以使用 props 来将 路由参数 解耦
:::

```js
const User = {
    props:['id'],
    template:'<div> User {{ id }}</div>'
}

const router = new VueRouter({
    routes:[
        { path: '/user/:id' ,component: User, props:true}
    ]
})

// 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
const router2 = new VueRouter({
    routes:[
        {
            path:'/user/:id',
            components:{ default: User, sidebar: Sidebar},
            props:{ default: true, sidebar: false}
        }
    ]
})
```

-  布尔模式

  如果 props 被设置 为 true, route.params 将会被设置为组件属性

- 对象模式

  如果 路由得 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态得时候有用。

  ```js
  const reouter = new Router({
      routes:[
          {
              path:'/user',
              component:User,
              props:{
                  id:false
              }
          }
      ]
  })
  ```

- 函数模式

  ```js
  const router = new VueRouter({
  	routes:[
  		{
  			path:'/search',
               component:SearchUser,
               props:(route)=>({query：route.query.q})
  		}
  	]
  })
  ```

  URL `/search?q=vue` 会将 `{ query:' vue '} ` 作为属性 传递给 `SearchUser `组件

  请尽可能保持 `props` 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应。 

  例子 请参考[github demo]( https://github.com/vuejs/vue-router/blob/dev/examples/route-props/app.js )

## 函数式组件

函数式组件得特点： 没有状态（没有响应式数据），也没有实例(没有this 上下文）；

如何·创建一个函数式组件： 只需在组件模板中 添加一个  `functional`的属性声明

```vue
// 创建函数式组件 有两种方式：
<template functional></template>

// 或者 
Vue.component('my-component',{
	functional:true,

	props:{...},	// props 是可选的
	
	// 为了弥补缺少的实例
  	// 提供第二个参数作为上下文
	render:function(createElement,context){
		....
	}
})

```



<Vssue title="Vssue Demo" />



