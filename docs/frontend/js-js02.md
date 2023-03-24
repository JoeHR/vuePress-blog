# JS for 循环优化与替代

### for循环本身写法优化

#### 1、跳出

 大多数前端同学们写嗨了是记不得要break与continue一下的。
尤其在遍历查找替换某些属性的时候，一定要记得跳出一下，避免不必要的操作。

> break 语句

作用：可跳出当前循环，继续执行该循环之后的代码

代码：

```javascript
let a = null
for(let i = 0 ;i<10;i++){
    if(i==3) {
    	a = i;
        break;
    }
    console.log("i现在为" + i + "<br>")
    console.log("The variable  a is"+ a + "<br>")
}
console.log("循环执行完了，现在 a 为"+a)


// 输出结果
// i现在为0<br>
// The variable  a isnull<br>
// i现在为1<br>
// The variable  a isnull<br>
// i现在为2<br>
// The variable  a isnull<br>
// 循环执行完了，现在 a 为3
```



> continue 语句

作用：中断当前循环中的当前迭代，继续循环中的下一个迭代

代码：

```javascript
let a = null
for(let i = 0 ;i<10;i++){
    if(i==3) {
    	a = i;
        continue ;
    }
    console.log("i现在为" + i + "<br>")
    console.log("The variable  a is"+ a + "<br>")
}
console.log("循环执行完了，现在 a 为"+a)

// 输出结果

i现在为0<br>
// The variable  a isnull<br>
// i现在为1<br>
// The variable  a isnull<br>
// i现在为2<br>
// The variable  a isnull<br>


// i现在为4<br>
// The variable  a is3<br>
// i现在为5<br>
// The variable  a is3<br>
// i现在为6<br>
// The variable  a is3<br>
// i现在为7<br>
// The variable  a is3<br>
// i现在为8<br>
// The variable  a is3<br>
// i现在为9<br>
// The variable  a is3<br>
// 循环执行完了，现在 a 为3
```

#### 2、缓存变量：

 当遍历一个数组时，如果每次循环都从数组中读取length的话来判断的话，必然造成效率浪费。
所以把length单独提出来缓存为一个变量会稍微提高那么一丢丢的性能。

代码：

```javascript
var arr =[1,2,23,1000];
var len = arr.length;
for(let i=0;i<len;i++) {
  // doSometing(arr[i]);
}
```

### for循环的一些特定用途的替代方法

#### 1、reduce()：累加循环

> 语法： array.reduce(callback,[initialValue])
>
> 参数解释：
>
> callback: 执行函数，包含四个参数（previousValue、currentValue、index、array）
>
> initialValue: 初始值

```javascript
const list = [{id:1,age:9},{id:2,age:14},{id:3,age:17},{id:4,age:1}]

// 计算大于 age 大于 10的 人数
const count = list.reduce((count,item)=>(item.age>10?count+1:count),0)

console.log(count)	// 2
```

#### 2、filter（）：过滤循环

> 语法：array.filter(callback[,thisArg])
>  参数解释：
>  (1)callback：执行函数，包含三个参数（currentValue、index、array)
>  (2)thisArg：执行callback时使用的this值



```objectivec
const list=[
    {id:1,age:9},
    {id:2,age:14},
    {id:3,age:17},
    {id:4,age:1},
];
//寻找年龄大于10的对象
const age10ID = list.filter(item=>(
    item.age>10
));
console.log(age10ID);
```

#### 3、map()，这个不想写了，平时都写腻了

#### 4、every（）：检测所有元素 都 通过的循环

> 语法：array.every(callback[,thisArg])
>  参数解释：
>  (1)callback：执行函数，包含三个参数（currentValue、index、array)
>  (2)thisArg：执行callback时使用的this值



```objectivec
const list=[
    {id:1,age:9},
    {id:2,age:14},
    {id:3,age:17},
    {id:4,age:1},
];
//是否全部年龄都大于10
const result = list.every(item=>(
    item.age>10
));
console.log(result);  //false
```

#### 5、some() ：和every相对，检测至少有一个元素通过的循环


<Vssue title="Vssue Demo" />
