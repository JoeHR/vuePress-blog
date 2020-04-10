## vue 事件函数的节流 与 防抖

```javascript
// util.js

//  防抖
const Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
      let args = arguments;
      if(timer){
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          timer = null;
          fn.apply(this, args);
      }, delay);
  }
}

// 节流
const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
}

```

### 1、全局 click 事件 防抖/节流

```javascript
// main.js
import {Debounce,Throttle} from 'a.js'

const on = Vue.prototype.$on

Vue.prototype.$on = function($event,fn){
    // let newFunc = $event === 'click'? Throttle(fn):fn      // 针对 click 事件进行 节流
    let newFunc = $event === 'click'? Debounce(fn):fn       // 针对 click 事件进行 防抖
    on.call(this,event,newFunc)
}

```


### 2、封装成自定义指令


- 局部组件 自定义指令

```javascript

<template>
    <div><input type="text" v-model="text" v-debounce="search" /></div>
</template>

<script>

import {Debounce,Throttle} from 'a.js'

export default {
    name:'debounce',
    data(){
        return {
            text:null,
            count:0,
        }
    },
    directives:{
        debounce:{
            inserted:function(el,binding){
                //  el.addEventListener('keyup',Throttle(binding.value))
                el.addEventListener('keyup',Debounce(binding.value))
            }
        }
    },
    methods:{
        search(){
            this.count++
            console.log(this.count)
        }
    }
}
</script>
```

-  全局自定义指令

```javascript

import {Debounce,Throttle} from 'a.js'

Vue.directive('debounce',{
    inserted:(el,binding,node) => {
        // el.addEventListener('click',Throttle(binding.value))
        el.addEventListener('click',Debounce(binding.value))
    }
})
```

<Vssue title="Vssue Demo" />