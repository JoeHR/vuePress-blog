## reduce函数介绍

reduce 是数组的方法，可以对数组中的每个元素一次执行一个回调函数，从左到右依次累计计算出一个最终的值。可以根据需要进行累加、过滤、分组、映射等草足，是一个非常强大的数组方法。其语法为：

```js
arr.reduce(callback(accumulator,currentValue[,index[,array]])[,initialValue])
```

`callback` 支持传入4个参数
- accumulator: 累积器，继上一次回调函数执行的返回值
- currentValue: 当前元素的值
- index: 当前元素的下表
- array: 原始数组

`initialValue` 是可选的，标识累积器的初始值。

`reduce`函数的执行过程如下：
1、如果没有提供`initialValue`，则将数组的第一个元素作为累积器的初始值，否则将`initialValue` 作为累积器的初始值
2、从数组的第二个元素开始，一次对数组中的每个元素执行回调函数
3、回调函数的返回值作为下一次回调函数执行时的累积器的值
4、对数组中的每个元素执行完回调函数后，`reduce`函数返回最后一次回调函数的返回值，即最终的累积值

## 手写 reduce

```js

function myReduce(arr,callback,initialValue){
  let accumulator = initialValue === undefined ? arr[0] : initialValue
  for(let i = initialValue === undefined ? 1: 0; i < arr.length; i++){
    accumulator = callback(accumulator,arr[i],i,arr)
  }
  return accumulator
}

```

## 计算数组中每个元素出现的次数

```js

const fruits = ['apple','banana','apple','orange','banana','apple']

const count = fruits.reduce((accumulator,currentValue)=>{
  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1
  return accumulator
},{})

console.log(count); // Output: { apple: 3, banana: 2, orange: 1 }
```

## 拍平嵌套数组

```js

const nestedArray = [[1,2],[3,4],[5,6]]

const flattenedArray = nestedArray.reduce((accumulator,currentValue)=>accumulator.concat(currentValue),[])

console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]

```


## 按条件分组

```js

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 25 },
  { name: 'Emily', age: 30 }
]

const groupedPeople = people.reduce((accumulator,currentValue)=>{
  const key = currentValue.age
  if(!accumulator[key]){
    accumulator[key] = []
  }
  accumulator[key].push(currentValue)
  return accumulator
},{})

console.log(groupedPeople);
// Output: {
//   25: [{ name: 'Alice', age: 25 }, { name: 'David', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }, { name: 'Emily', age: 30 }],
//   35: [{ name: 'Charlie', age: 35 }]
// }

```

## 将多个数组合并为一个对象

```js

const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female'];
const person = keys.reduce((accumulator, currentValue, index) => {
    accumulator[currentValue] = values[index];
    return accumulator;
  }, {});
console.log(person); // Output: { name: 'Alice', age: 25, gender: 'female' }

```

## 将字符串转换为对象

```js

const str = 'key1=value1&key2=value2&key3=value3';

const obj = str.split('&').reduce((accumulator, currentValue) => {
  const [key, value] = currentValue.split('=');
  accumulator[key] = value;
  return accumulator;
}, {});

console.log(obj);
// Output: { key1: 'value1', key2: 'value2', key3: 'value3' }

```

## 将对象转换为查询字符串

```js

const params = { foo: "bar", baz: 42 };

const queryString = Object.entries(params).reduce((acc, [key, value]) => {
  return `${acc}${key}=${value}&`;
}, "?").slice(0, -1);

console.log(queryString); // "?foo=bar&baz=42"

```

## 打印斐波那契数列

```js

const fibonacci = n => {
  return [...Array(n)].reduce((accumulator, currentValue, index) => {
    if (index < 2) {
      accumulator.push(index);
    } else {
      accumulator.push(accumulator[index - 1] + accumulator[index - 2]);
    }
    return accumulator;
  }, []);
};

console.log(fibonacci(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

```

## 检查字符串是否是回文字符串

```js

const str = 'racecar';

const isPalindrome = str.split('').reduce((accumulator, currentValue, index, array) => {
  return accumulator && currentValue === array[array.length - index - 1];
}, true);

console.log(isPalindrome); // Output: true

```

## 检查括号是否匹配

```js

const str = "(()()())";
const balanced = str.split("").reduce((acc, cur) => {
  if (cur === "(") {
    acc++;
  } else if (cur === ")") {
    acc--;
  }
  return acc;
}, 0) === 0;
console.log(balanced); // true

```

## 递归获取对象属性

```js

const user = {
  info: {
    name: "Jason",
    address: { home: "Shaanxi", company: "Xian" },
  },
}

function get(config, path, defaultVal) {
  return path.split('.').reduce((config, name) => config[name], config) || defaultVal;
  return fallback;
}

get(user, "info.name"); // Jason
get(user, "info.address.home"); // Shaanxi
get(user, "info.address.company"); // Xian
get(user, "info.address.abc", "default"); // default

```
