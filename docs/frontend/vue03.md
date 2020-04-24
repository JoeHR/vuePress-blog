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
// 方式一：  单文件 组件
<template functional></template>

//  组件函数
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

:::info

注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 `props` 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 `props` 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。

当使用函数式组件时，该引用将会是 HTMLElement，因为他们是无状态的也是无实例的。

:::



组件需要的一切都是 通过 `context` 参数传递，它是一个上下文对象，具体包括但不限于如下字段：

- `props`:提供所有 prop 的对象
- `children`: VNode 子节点的数组
- `slots`: 一个函数，返回了包含所有插槽的对象
- `scopedSlots`: 一个暴露传入的作用域插槽的对象，也以函数形式暴露普通插槽
- data:传递给组件的整个数据对象，作为  `createElement`的第二个参数传入组件
- `parent`:对父组件的引用
- `listenmers`: 一个包含了所有父组件未当前组件注册的事件监听器的对象。这是 `data.on`的一个别名
- `injections`: 如果使用了 `inject`选项，则该对象包含了应当被注入的属性。

```vue
// 函数式组件
<template functional>
    <div class="list">
        <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
        </div>
    </div>
</template>

// 父组件中使用
<template>
	<div>
    	  <List :list="list" :itemClick="item => (currentItem = item)" />
    </div>
</template>

<script>
import List from '@/components/List.vue'
export default {
    components: {
        List
    },
    data() {
        return {
            list: [{
                title: 'title',
                content: 'content'
            }],
            currentItem: ''
        }
    }
}
</script>
```

## 样式穿透

 在开发中修改第三方组件样式是很常见，但由于 `scoped` 属性的样式隔离，可能需要去除 `scoped` 或是另起一个 `style` 。这些做法都会带来副作用（组件样式污染、不够优雅），样式穿透在css预处理器中使用才生效。 

 我们可以使用 `>>>` 或 `/deep/` 解决这一问题: 

```scss
<style scoped>
外层 >>> .el-checkbox {
  display: block;
  font-size: 26px;

  .el-checkbox__label {
    font-size: 16px;
  }
}
</style>

<style scoped>
/deep/ .el-checkbox {
  display: block;
  font-size: 26px;

  .el-checkbox__label {
    font-size: 16px;
  }
}
</style>
```

## watch 高阶使用

### 取消watch 观察

`vm.$watch` 返回一个取消观察函数，用来停止触发回调： 

```js
var unwatch = vm.$watch('a', cb)
// 之后取消观察
unwatch()
```

### watch 观察策略

- 立即执行   immediate 

`watch`  是在监听属性改变时才会触发，有些时候，希望在  组件创建后  `watch `能够立即执行

可能想到的的方法就是在 `create` 生命周期中调用一次，但这样的写法不优雅，或许我们可以使用这样的方法

```js
export default {
    data() {
        return {
            name: 'Joe'
        }
    },
    watch: {
        name: {
            handler: 'sayName',
            immediate: true
        }
    },
    methods: {
        sayName() {
            console.log(this.name)
        }
    }
}

// 或者
vm.$watch('name',callback,{
    immediate: true
})
```

- 深度监听

   在监听对象时，对象内部的属性被改变时无法触发 `watch` ，我们可以为其设置深度监听 

```js
vm.obj.b.c = 123
vm.$watch('obj', callback, {
  deep: true
})

// 或者

export default {
    data(){
        return {
            obj:{
                a:{
                    b:{
                        c:1
                    }
                }
            }
        }
    },
    watch:{
        obj:{
            handler: 'getAbc',
            deep: true
        }
    },
    methods:{
        getAbc(){
            return this.a.b.c
        }
    }
}
```

### 一个观察数据调用回调数组

传入回调数组，触发监听执行多个方法

```js
var vm= new Vue({
    data:{a:{b:{c:5}}},
    
    watch:{
        e:[(val,oldval)=>{},(val,oldVal)=>{},...]	// 数组中的回调函数会被逐一调用
    }
})
    
// 或者 
export default {
    data: {
        name: 'Joe'
    },
    watch: {
        name: [
            'sayName1',
            function(newVal, oldVal) {
                this.sayName2()
            },
            {
                handler: 'sayName3',
                immaediate: true
            }
        ]
    },
    methods: {
        sayName1() {
            console.log('sayName1==>', this.name)
        },
        sayName2() {
            console.log('sayName2==>', this.name)
        },
        sayName3() {
            console.log('sayName3==>', this.name)
        }
    }
}

```

### 监听多个变量

 watch本身无法监听多个变量。但我们可以将需要监听的多个变量通过计算属性返回对象，再监听这个对象来实现“监听多个变量” 

```js
export default {
    data() {
        return {
            msg1: 'apple',
            msg2: 'banana'
        }
    },
    compouted: {
        msgObj() {
            const { msg1, msg2 } = this
            return {
                msg1,
                msg2
            }
        }
    },
    watch: {
        msgObj: {
            handler(newVal, oldVal) {
                if (newVal.msg1 != oldVal.msg1) {
                    console.log('msg1 is change')
                }
                if (newVal.msg2 != oldVal.msg2) {
                    console.log('msg2 is change')
                }
            },
            deep: true
        }
    }
}

```

## 事件参数 `$event`

 `$event` 是事件对象的特殊变量，在一些场景能给我们实现复杂功能提供更多可用的参数 

- 原生事件

 在原生事件中表现和默认的事件对象相同 

```vue
<template>
    <div>
        <input type="text" @input="inputHandler('hello', $event)" />
    </div>
</template>
<script>
    export default {
    methods: {
        inputHandler(msg, e) {
            console.log(e.target.value)
        }
    }
}
</script>
```



- 自定义事件

 在自定义事件中表现为捕获从子组件抛出的值 

child.vue

```vue
<script>
export default {
    methods: {
        customEvent() {
            this.$emit('custom-event', 'some value')
        }
    }
}
</script>
```

parent.vue

```vue
<template>
    <div>
        <child v-for="(item, index) in list" @custom-event="customEvent(index, $event)">
            </child>
    </div>
</template>

<script>
    export default {
        methods: {
            customEvent(index, e) {
                console.log(e) // 'some value'
            }
        }
    }
</script>
```

## 自定义组件双向绑定

:::info

 允许一个自定义组件在使用 `v-model` 时定制 prop 和 event。默认情况下，一个组件上的 `v-model` 会把 `value` 用作 prop 且把 `input` 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 `value` prop 来达到不同的目的。使用 `model` 选项可以回避这些情况产生的冲突。 

:::

 `input` 默认作为双向绑定的更新事件，通过 `$emit` 可以更新绑定的值 

```vue
<my-switch v-model="val"></my-switch>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        switchChange(val) {
            this.$emit('input', val)
        }
    }
}
</script>
```

 修改组件的 `model` 选项，自定义绑定的变量和事件 

```vue
<my-switch v-model="num" value="some value"></my-switch>

<script>
export default {
    model: {
        prop: 'num',
        event: 'update'
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        num: {
            type: Number,
            default: 0
        }
    },
    methods: {
        numChange() {
            this.$emit('update', this.num++)
        }
    }
}
</script>
```





<Vssue title="Vssue Demo" />







