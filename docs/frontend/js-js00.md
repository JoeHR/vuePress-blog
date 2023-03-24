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

## 5、['1','2','3'].map(parseInt)

```js

['1','2','3'].map(parseInt)

// 等价于

[
  parseInt('1',0),  // radix 输入0时，如果输入的 string 以任何（非0）开头，radix 是 10 (十进制) ,因此 1转换10进制还是1
  parseInt('2',1),  // radix 输入1时，不在 2～36 之间，所以返回 NaN
  parseInt('3',2),  // radix 输入2时，表示以 二进制来解析 '3'字符串 并转为10进制整数输出 ，但以2进制解析 '3'解析不了，因为二进制中 不可能出现3；所以也返回 NaN
]


```

> parseInt(string,radix) 函数可以传递两个参数： 解析一个字符串并返回指定基数的十进制整数

string第一个参数是要转换的字符串，如果传入的不是一个字符串，则将其转换为字符串（使用 `toString`操作）,字符串开头的空白符将会被忽略
radix第二个参数是可选参数，表示进制的基数（2到36之间的整数），**如果超出这个范围，将返回 `NaN`**;假如 传入`0`或未指定，基数将会根据字符串的值进行推算。注意，推算的结果不会永远是默认`10`！

**如果第一个字符不能转换为数字，parseInt 会返回 NaN。**

**如果radix 是 undefined、0 或未指定的**，JS会假定一下情况：

- 1、如果 `string` 是 以 `0x`或`0X`开头的，那么 `radix` 被假定为 16，字符串的其余部分被当作 16进制数 去解析
- 2、如果输入的 `string` 是以 `0`开头，`radix`被假定为 8（8进制）或10 （10进制）。具体选择哪个radix 取决于实现。`ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。`因此，在使用 parseInt 时，一定要指定一个 radix。
- 3、如果输入的 string 以任何其他值开头，radix 是 10 (十进制)




 <Vssue title="Vssue Demo" />

