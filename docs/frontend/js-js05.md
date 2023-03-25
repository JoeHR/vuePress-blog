## 选择器函数

```javascript
window.$ = (selector,context,undefined)=>{
	let matches = {
        '#':"getElementById",
        '.':"getElementByClassName",
        '@':"getElementByName",
        '=':"getElementByTagName",
        '*':"querySelectorAll"
    }[selector[0]]
    //selector.slice(1)去掉例如'.name'&&'#name'的'.#'后的值
    let el = ((context === undefined ? document:context)[matches](selector.slice(1)))
    return el.length < 2 ? el[0]:el
}
```

## 复制到剪贴板

可以使用   navigator.clipboard.writeText  将任何文本复制到剪贴板

```javascript

const copyToClipboard = (text) => navigator.clipboard.writeText(text);
copyToClipboard("Hello World");

```

## 找出一年中的哪一天

查找给定日期的哪一天

```javascript

const dayOfYear = (date) =>  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
dayOfYear(new Date());
// Result: 272

```

## 找出两日期之间的天数

获取 给定两个日期之间间隔的天数

```javascript

const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

dayDif(new Date("2020-10-21"), new Date("2021-10-22"))// Result: 366

```

## 清除所有 Cookie
你可以通过使用 document.cookie 访问 cookie 并清除它来轻松清除存储在网页中的所有 cookie。

```javascript

const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '')
.replace(/=.*/, `=;expires=${new Date(0).toUTCString()};
path=/`));

```
## 生成随机十六进制

可以使用 Math.random 和 padEnd 属性生成随机十六进制颜色。

```javascript

const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHex());
//Result: #92b008

```

## 生成随机 UUID

```javascript
window.uuid = ()=>{
    return 'XXX' + Math.Random().toString(36).substring(2,15) + Math.Random().toString(36).substring(2,15)
}
```

## MyArray

```javascript
function MyArray() {}
MyArray.prototype.length = 0;
(function() {
	var methods = ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'join'];
	for (var i = 0; i < methods.length; i++)(function(name) {
		MyArray.prototype[name] = function() {
			return Array.prototype[name].apply(this, arguments);
		}
	})(methods[i]);
})();
var mine = new MyArray();
mine.push(1, 2, 3);
```

## Handler

```javascript
addHandler: function( types, handler ) {
            if( !Array.isArray( types ) ) {
                types = [ types ];
            }
            types.forEach( function( type ) {
                handlers[ type ] = handler;
            });
},

removeHandler: function( types ) {
            this.addHandler( types, undefined );
}
```



## 判断两个对象是否相等

```javascript
function isObjectValueEqual(a, b) {
	//判断两个对象是否相等
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

	if(a===b){
	    return true;
	}

        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
}
```

## 防抖函数

```javascript
const debounce = (fn,delay=500,immediate=false) =>{
   let timer = null
   let args = arguments
   return ()=>{
       clearTimeout(timer);
       if(immediate){
          timer = setTimeout(()=>{
           			fn.apply(this,args)
       			},delay)
       }else{
           fn.apply(this,args)
       }
   }
}
```

## 节流函数

```javascript
const throttle = (fn,delay = 500)=>{
    let flag = true
    return (...args)=>{
        if(!flag) return;
         flag = false
        setTimeout(()=>{
            fn.apply(this,args)
            flag = true
        },delay)
    }
}
```

## 字符串工具方法

### 解析URL Params 为对象

```js
function parseParams(url){
    const paramsStr = /.+\?(.+)$/.exec(url)[1];	// 将 ？ 后面的字符串取出来
    const paramsArr = paramsStr.split('&')		// 将字符串以 & 符号分割后存到数组中
    let paramsObj = {}
    // 将params 存到对象中
    paramsArr.forEach(params=>{
        if(/=/.test(params)){	// 处理有 value 的参数
            let [key,val] = params.split('=')	// 分割 key  和 val
            val = decodeURIComponent(val)	// 解码
            val = /^\d+$/.test(val)?parseFloat(val):val		// 判断是否转为数字

            if(paramsObj.hasOwnProperty(key)){	// 如果对象有key,则添加一个值
                paramsObj[key] = [].concat(paramsObj[key],val)
            }else{	// 如果对象没有这个 key,创建 key 并设置值
                paramsObj[key] = val
            }
        }else { // 处理没有 value 的 参数
            paramsObj[param] = true
        }
    })
    return paramsObj
}


// 使用

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)     // {user:'anonymous',id:[123,456],city:'北京',enabled:true}


```

### 模板引擎的实现

```js

function render(template,data){
    const reg = /\{\{(\w+)\}\}/;        // 模板字符串正则
    if(reg.test(template)){ // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]  // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg,data[name]) // 将第一个模板字符串渲染
        return render(template,data);   // 递归的渲染并返回渲染后的结构
    }
    return template     // 如果模板没有模板字符传直接返回
}


// 使用

let template = '我是{{name}},年龄{{age}},性别{{sex}}'
let data = {name:"姓名",age:18}

render(template,data)       // 我是姓名，年龄18，性别undefined

```

### 转化为驼峰命名

```js
function f(s){
    return s.replace(/-\w/g,function(x){
        return x.slice(1).toUpperCase()
    })
}

// 使用
f('get-element-by-id)   // getElementById

```

### 查找字符串中出现最多的字符和个数

例： abbcccddddd -> 字符最多的是 d,出现了5次

```js

    let str = 'abcabcabcbbccccc'
    let num =0
    let char = ''

    // 使其按照一定的次序排列
    str = str.split('').sort().join('')
    // aaabbbbbcccccccc

    // 定义正则表达式
    let re = /(\w)\1+/g
    str.replace(re,($0,$1)=>{
        if(num < $0.length){
            num = $0.length
            char = $1
        }
    })

    console.log(`字符最多的是${char},出现了${num}次`)
```

### 字符串查找
请使用最基本的遍历来实现判断字符串a 是否被包含在字符串 b中，并返回第一次出现的位置（找不到返回-1）

```js

function isContain(a,b){
    for(let i in b){
        if(a[0]===b[i]){
            let tmp = true
            for(let j in a){
                if(a[j]!==b[~~i + ~~j]){
                    tmp = false
                }
            }
            if(tmp){
                return i
            }
        }
    }
    return -1
}

a='34';b='1234567'; // 返回 2
a='35';b='1234567'; // 返回 -1
a='355';b='12354355'; // 返回 5
isContain(a,b);

```

### 实现千位分隔符

```js

function parseToMoney(num){
    num = parseFloat(num.toFixed(3))
    let [integer,decimal] = String.prototype.split.call(num,'.')
    integer = integer.replace(/\d(?=\B(\d{3})+$)/g,'$&,')
    // integer = integer.replace(/\d(?=(\d{3})+$)/g,'$&,')
    return integer+'.'+(decimal?decimal:'')
}

// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'

```


<Vssue title="Vssue Demo" />
