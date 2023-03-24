## 1、JS中的数据类型

JS中存在8种数据结构

> 原始值： 除了 *Object* 以外，所有类型都定义了表示在语言最低层面的不可变值，我们将这些值称为原始值。

 - 原始值类型
  + null
  + undefined
  + Boolean
  + Number
  + BigInt
  + String
  + Symbol

- 引用类型
  + Object

## 2、为什么不推荐使用 `var a = undefined`

```js
// 在 js中 为什么不推荐使用 var a = undefined

var a;

var b = void 0

var c = void 1


```

>  ** 原因1**: 因为在 js中 `undefined` 不是一个关键字，而是 `window`的一个属性 `window.undefined`;并且 `window.undefined` 这个属性不可被赋值

```js

window.undefined

window.undefined = 1

console.log(window.undefined)  // undefined

```

>  **原因2**: 在局部作用域中，由于  `undefined` 不是关键字，所以可以 将其用作 变量名，就会出现 重写 `undefined`

```js

function m(){

  var undefined = 1

  var a = undefined

  var b;

  console.log(a) // 1
  console.log(b) // undefined

}

```

## 3、关于JS中的大数运算

JS中的number的几个属性

- Number.EPSILON : 表示 1与 Number 可表示的大于1的最小的浮点数之间的差值；其属性值 无限接近于 `2.2204460492503130808472633361816E-16`或`2^-52`

- Number.MAX_SAFE_INTEGER: 常量表示在 JavaScript 中最大的安全整数,其值为`2^53 - 1`即`9007199254740991`

- MAX_VALUE 属性表示在 JavaScript 里所能表示的最大数值,其值无限接近于`1.7976931348623157e+308`,大于 `MAX_VALUE`的值表示为 `Infinity`




```js
x = 0.2;
y = 0.3;
z = 0.1;

Math.abs(x - y + z) < Number.EPSILON // true

Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 // true
```

## 4、JS中判断对象中某个属性是否存在

最完善的方法是 使用 for in

```js

function hasProperty(obj,key){
  return key in obj
}

function hasPropertyV1(obj,key){
  // Object.keys 获取对象上所有可枚举属性的属性名
  return Object.keys(obj).includes(key)
}

function hasPropertyV2(obj,key){
  // 判断该对象是否具有该属性，但无法判断其原型上的属性
  return obj.hasOwnProperty(key)
}

const o = {a:undefined, b:1}
Object.defineProperty(o,'c',{
  enumerable:false,
  value:1
})

console.log(hasProperty(o,'a')) // true
console.log(hasProperty(o,'b'))  // true
console.log(hasProperty(o,'c'))  // true
console.log(hasProperty(o,'toString'))  // true

console.log(hasPropertyV1(o,'a')) // true
console.log(hasPropertyV1(o,'b')) // true
console.log(hasPropertyV1(o,'c')) // false
console.log(hasPropertyV1(o,'toString')) // false

console.log(hasPropertyV2(o,'a')) // true
console.log(hasPropertyV2(o,'b')) // true
console.log(hasPropertyV2(o,'c')) // true
console.log(hasPropertyV2(o,'toString')) // false

```



 <Vssue title="Vssue Demo" />

