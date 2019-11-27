# 每日一道面试题

## 第一题：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么

vue 和 react 都是采用 diff 算法来对比新旧虚拟节点，从而更新节点。在 vue 的 diff 函数中（建议先了解一下 diff 算法过程）。
在交叉对比中，当新节点跟旧节点`头尾交叉对比`没有结果时，会根据新节点的 key 去对比旧节点数组中的 key，从而找到相应旧节点（这里对应的是一个 key => index 的 map 映射）。如果没找到就认为是一个新增节点。而如果没有 key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个 map 映射，另一种是遍历查找。相比而言。map 映射的速度更快。

vue 部分源码如下：

```js
// vue项目  src/core/vdom/patch.js  -488行
// 以下是为了阅读性进行格式化后的代码

// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
}
if (isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key];
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
}
```

创建 map 函数

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

遍历寻找

```js
// sameVnode 是对比新旧节点是否相同的函数
function findIdxInOld(node, oldCh, start, end) {
  for (let i = start; i < end; i++) {
    const c = oldCh[i];

    if (isDef(c) && sameVnode(node, c)) return i;
  }
}
```

## 第二题：['1', '2', '3'].map(parseInt) what & why ?

第一眼看到这个题目的时候，脑海跳出的答案是 [1, 2, 3]，但是**真正的答案是[1, NaN, NaN]**。

- 首先让我们回顾一下，map 函数的第一个参数 callback：

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
// Return  element for new_array
}[, thisArg])这个callback一共可以接收三个参数，其中第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引。
```

- 而 parseInt 则是用来解析字符串的，使字符串成为指定基数的整数。
  `parseInt(string, radix)`
  接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。
- 了解这两个函数后，我们可以模拟一下运行情况

1. parseInt('1', 0) //radix 为 0 时，且 string 参数不以“0x”和“0”开头时，按照 10 为基数处理。这个时候返回 1
2. parseInt('2', 1) //基数为 1（1 进制）表示的数中，最大值小于 2，所以无法解析，返回 NaN
3. parseInt('3', 2) //基数为 2（2 进制）表示的数中，最大值小于 3，所以无法解析，返回 NaN

- map 函数返回的是一个数组，所以最后结果为[1, NaN, NaN]
- 最后附上 MDN 上对于这两个函数的链接，具体参数大家可以到里面看

1. [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
2. [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## 第三题：什么是防抖和节流？有什么区别？如何实现？

函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。如下图，持续触发scroll事件时，并不执行handle函数，当1000毫秒内没有触发scroll事件时，才会延时触发scroll事件。

 函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点，最好是如我们心意按照一定规律在某个时间间隔内一滴一滴的往下滴。

区别：在于执行的频率不同，一个是 持续触发事件时，只执行最后一次，限定执行次数；一个是持续触发事件时，每隔一定的时间执行一次， 限定执行频率

```js
/**
 * 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * 函数防抖 (只执行最后一次点击) 
 * 每次触发事件时都取消之前的延时调用
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
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


/**
 * 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
 * 函数节流
 * 每次触发事件时都判断当前是否有等待执行的延时函数
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
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

