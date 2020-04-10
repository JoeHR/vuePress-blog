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

> Vue Router 官网 

<Vssue title="Vssue Demo" />



