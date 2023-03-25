## 原生ajax

> 原理解析： 利用 浏览器内置得 XMLHttpRequest 对象，向服务端发送异步请求，获取数据（而不是html文档）。一般包括以下步骤

- 实例化 XMLHttpRequest 对象
- 连接服务器
- 发送请求
- 处理响应

```javascript
function ajax(options){
    let method = options.method || 'GET',	// 不传则默认为 GET 请求
        params = options.params,			// GET 请求携带得参数
        data   = options.data,				// POST 请求携带的参数
        url    = options.url + (params ? '?'+ Object.keys(params).map(key => key + '=' + params[key]).join('&') : ''),
    	async  = options.async === false ? false : true,
        success = options.success,
        headers = options.headers;

    let xhr = window.XMLHttpRequest? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')

    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status === 200){
            success && success(xhr.responseText)
        }
    }

    xhr.open(method,url,async)

    if(headers){
        Object.keys(Headers).forEach(key => xhr.setRequestHeader(key,headers[key]))
    }

    methoad === 'GET' ? xhr.send() : xhr.send(data)
}
```

**注意**：

-  XMLHttpRequest对象状态readyState   是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。 readyState总共有5个状态值，分别为0~4，每个值代表了不同的含义

| readyState 状态值 | readyState 状态 | 状态说明                                               |
| ----------------- | --------------- | ------------------------------------------------------ |
| 0                 | 未初始化        | 尚未调用 `open()` 方法                                 |
| 1                 | 启动            | 已经调用 `open()`方法，当尚未调用`send()`方法          |
| 2                 | 发送            | 已经调用`send()`方法，当尚未接收到响应                 |
| 3                 | 接收            | 已经接收到部分响应数据                                 |
| 4                 | 完成            | 已经接收到全部响应数据，而且已经可以在客户端使用处理了 |

- HTTP响应状态码 status  HTTP响应状态码指示特定 HTTP 请求是否已成功完成。是由三个十进制数字组成，第一个十进制数字定义了状态码得响应类型，后两个数字没有分类得作用；响应分为五类：

| 分类 | 分类描述                                            |
| ---- | --------------------------------------------------- |
| 1xx  | 信息响应： 服务器接收到请求，需要请求者继续执行操作 |
| 2xx  | 成功响应： 操作被成功接收并处理                     |
| 3xx  | 重定向： 需要进一步得操作已完成请求                 |
| 4xx  | 客户端错误： 请求包含语法错误或无法完成请求         |
| 5xx  | 服务器错误： 服务器在处理请求得过程中发生了错误     |

常见得 HTTP 响应状态码

| HTTP 状态码 | HTTP 状态名称                 | HTTP 状态描述                                                |
| ----------- | ----------------------------- | ------------------------------------------------------------ |
| 100         | Continue                      | 表明目前为止的所有内容都是正常的，并且客户端应该继续请求或者如果它已经完成则忽略它。 |
| 101         | Switching Protocols           | 响应代码指示服务器正在根据发送包括[`Upgrade`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade)请求头的消息的客户端的请求切换到的协议。 |
| 200         | OK                            | 请求已成功。200响应默认是可缓存的。（成功的意义取决于 HTTP 请求方法：GET-资源已被提取并在消息体中传输; HEAD - 实体标题在消息体中; POST - 描述行为结果的资源在消息体中传输; TRACE - 消息正文包含服务器收到的请求消息） |
| 201         | Created                       | 请求已成功并导致创建资源。在回复此响应之前有效创建新资源。并且新资源返回到消息正文中，其位置是请求的URL或`Location`标题的内容。(常见用例是一个`PUT`请求的结果。) |
| 202         | Accepted                      | 请求已被接收但尚未起作用。它是非承诺的，这意味着HTTP中没有办法稍后发送指示处理请求结果的异步响应。它适用于其他进程或服务器处理请求或批处理的情况。 |
| 203         | Non-Authoritative Information | 请求已成功，文档被正常的返回，但是由于正在使用的是文档副本所以某些响应头信息可能不正确 |
| 204         | No Content                    | 请求已成功，但客户端无需离开其当前页面 (常见用例是`204`作为`PUT`请求的结果返回，更新资源，而不更改向用户显示的页面的当前内容。) |
| 205         | Reset Content                 | 通知客户端重置文档视图，例如清除表单内容，重置画布状态或刷新 UI。 |
| 206         | Partial Content               | 请求已成功,服务器完成了一个包含Range头信息的局部请求时被发送的 |
| 300         | Multiple Choices              | 被请求的文档可以在多个地方找到，并将在返回的文档中列出来。如果服务器有首选设置，首选项将会被列于定位响应头信息中。 |
| 301         | Moved Permanently             | 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。 |
| 302         | Found                         | 请求的资源现在临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。 |
| 303         | See Other                     | 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。这个方法的存在主要是为了允许由脚本激活的POST请求输出重定向到一个新的资源。 |
| 304         | Not Modified                  | 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304 响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。 |
| 307         | Temporary Redirect            | 请求的资源现在临时从不同的URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。 |
| 308         | Permanent Redirect            | 这意味着资源现在永久位于由 `Location:` HTTP Response 标头指定的另一个 URI。 这与 `301 Moved Permanently HTTP` 响应代码具有相同的语义，但用户代理不能更改所使用的 HTTP 方法：如果在第一个请求中使用 `POST`，则必须在第二个请求中使用 `POST`。 |
| 400         | Bad Request                   | 1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。2、请求参数有误。 |
| 401         | Unauthorized                  | 当前请求需要用户验证。该响应必须包含一个适用于被请求资源的 WWW-Authenticate 信息头用以询问用户信息。客户端可以重复提交一个包含恰当的 Authorization 头信息的请求。如果当前请求已经包含了 Authorization 证书，那么401响应代表着服务器验证已经拒绝了那些证书。如果401响应包含了与前一个响应相同的身份验证询问，且浏览器已经至少尝试了一次验证，那么浏览器应当向用户展示响应中包含的实体信息，因为这个实体信息中可能包含了相关诊断信息。 |
| 403         | Forbidden                     | 服务器理解请求但拒绝授权,无权限访问                          |
| 404         | Not Found                     | 服务器找不到请求的资源                                       |
| 405         | Method Not Allowed            | 请求方法(GET, POST, HEAD, PUT, DELETE, 等)对某些特定的资源不允许使用 |
| 406         | Not Acceptable                | 请求资源的MIME类型与客户端中Accept头信息中指定的类型不一致   |
| 407         | Proxy Authentication Required | 与401状态有些相似，只是这个状态用于代理服务器。该状态指出客户端必须通过代理服务器的认证。代理服务器返回一个Proxy-Authenticate响应头信息给客户端，这会引起客户端使用带有Proxy-Authorization请求的头信息重新连接。 |
| 408         | Request Timeout               | 请求超时。                                                   |
| 409         | Conflict                      | 由于和被请求的资源的当前状态之间存在冲突，请求无法完成。     |
| 410         | Gone                          | 被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址。这样的状况应当被认为是永久性的。如果可能，拥有链接编辑功能的客户端应当在获得用户许可后删除所有指向这个地址的引用。如果服务器不知道或者无法确定这个状况是否是永久的，那么就应该使用 404 状态码。除非额外说明，否则这个响应是可缓存的。 |
| 411         | Length Required               | 服务器在没有定义的`Content-Length`头部的情况下拒绝接受请求   |
| 412         | Precondition Failed           | 服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个。 |
| 413         | Payload Too Large             | 服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围。 |
| 414         | URI Too Long                  | 请求的URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务 |
| 415         | Unsupported Media Type        | 服务器拒绝接受请求，因为有效内容格式的格式不受支持           |
| 429         | Too Many Requests             | 用户在给定时间内发送了太多请求（“限速”）                     |
| 500         | Internal Server Error         | 服务器内部错误                                               |
| 501         | Not Implemented               | 此请求方法不被服务器支持且无法被处理                         |
| 502         | Bad Gateway                   | 错误的网关，被用于充当代理或网关的服务器;该状态指出接收服务器接收到远端服务器的错误响应。 |
| 503         | Service Unavailable           | 服务器没有准备好处理请求。 常见原因是服务器因维护或重载而停机。 |
| 504         | Gateway Timeout               | 网关超时，当服务器作为网关，不能及时得到响应时返回此错误代码。 |

## 防抖和节流

在前端开发的过程中，我们经常会需要绑定一些持续触发的事件，如 resize、scroll、mousemove 等等，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数，这时候就需要进行 函数 防抖 和节流。

> 防抖 - debounce 当持续出发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定得时间到来之前，又一次触发了事件，就重新开始延迟（连续触发多次，只执行（最后）一次）

``` javascript
const debounce = (fn,delay = 500) => {
    let timer = null;
    let args = arguments;
    return ()=>{
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
```

> 节流 - throttle 当持续触发事件时，保证一定时间段内只调用一次事件处理函数（一定时间内只调用一次事件处理函数）

```javascript
const throttle = (fn,delay = 500)=>{
    let flag = true
    return (...args)=>{
        if(!flag) return;
        flag = false
        let args = arguments;
        setTimeout(()=>{
            fn.apply(this,args)
            flag = true
        },delay)
    }
}
```

## Jsonp

(params ? '?'+ Object.keys(params).map(key => key + '=' + params[key]).join('&') : '')

```javascript
const jsonp = ({url,params,cb}) => {
    return new Promise((resolve,reject)=>{
        let script = document.createElement('script')
        script.src = url + (/\?/.test(url)?'':'?') + (params ? Object.keys(params).map(key => key + '=' + params[key]).join('&'):'')

        window[cb] = (data) => {
            resolve(data)
            document.body.removeChild(script)
        }

        document.body.appendChild(script)
    })
}
```



## 下载文件

（阻止浏览器默认预览 图片 和 pdf）

```javascript
const download = (url,fileName) =>{
    let fileType = url.substring(url.lastIndexOf('.')+1).toLowerCase()
    const imgTypes = ['bmp','jpg','jpeg','png','gif']
    let a = document.createElement('a')
    let evt = new MouseEvent('click')
    a.download = fileName
    a.target = '_blank'

    // 判断是否 图片 (防止 浏览器 直接打开预览 图片)
    if(imgTypes.includes(fileType)){
        let image = new Image()
        image.setAttribute('crossOrigin','anoymous')
        image.onload = ()=>{
            let canvas = document.createElement("canvas")
            const {width,height} = image
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(image,0,0,width,height)
            let imageUrl = canvas.toDataURL(`image/${fileType}`)
            a.href = imageUrl
            a.dispatchEvent(evt)
        }
        image.src = url
    }else{
        const xhr =  window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        xhr.open("GET",url,true)
        xhr.responseType = 'blob'
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4 && xhr.status === 200){
                if(window.navigator.msSaveBlob){
                    navigator.msSaveBlob(xhr.response,fileName)
                }else{
                    a.href = URL.createObjectURL(xhr.response)
                    a.dispatchEvent(evt)
                    URL.revokeObjectURL(a.href)
                }
            }
        }
        xhr.send()
    }
}
```

## apply,call,bind

>  bind 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

```javascript
Function.prototype.bind = function(content){
    if(typeof this!='function'){
        throw Error('not a function')
    }
    let _this = this
    let args = [...arguments].splice(1)
    return function F(){
        // 判断是否被当作构造函数使用
        if(this instanceof F){
            return _this.apply(this,args.concat([...arguments]))
        }else{
            return _this.apply(content,args.concat([...arguments]))
        }
    }
}
```

>  call语法：  fun.call(thisArg, arg1, arg2, arg3, .....)

call 的核心原理

- 将函数设为对象的属性
- 执行和删除这个函数
- 指定this 到函数并传入给定参数执行函数
- 如果不传参数，默认指向 window

```javascript
Function.prototype.myCall = function(ctx,...args){
    // 判断传入的第一个参数是否为null ,数字，undefined 等原始值类型,如果是 null 或 undefined ,则 ctx（this） 指向全局环境,如果为非空的原始值类型，则为对应值类型的对象
    ctx = ctx === null || ctx===undefined ? globalThis:Object(ctx)
    var key = Symbol('temp')
    Object.defineProperty(ctx,key,{
        enumerable:false,
        value:this
    })
    var result = ctx[key](...args)
    delete ctx[key]
    return result
    // content.fn = this
    // let args = [...arguments].splice(1)
    // let result = content.fn(...args)
    // delete content.fn
    // return result;
}
```



> apply      call  的实现原理差不多，只是参数形式不一样

```javascript
// apply
注意: 当 apply 传入的第一个参数为 null 时，函数体内的this会指向window

Function.prototype.apply = function(content = window){
    content.fn = this
    let result;
    // 判断是否有第二个参数
    if(arguments[1]){
        result = content.fn(...arguments[1])
    }else{
        result = content.fn()
    }
    delete content.fn;
    return result;
}

```

## new

> 实现一个 new 操作符的具体实现步骤

- 首先函数接收不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
- 然后内部创建一个空对象 obj
- 因为 obj 对象需要访问到构造函数原型链上的属性，所以我们通过 setPrototypeOf 将两者联系起来，这段代码等同于  obj.proto = Con.prototype
- 将 obj 绑定到构造函数上，并且传入剩余的参数
- 判断构造函数返回值是否为对象，如果为对象就是要构造函数返回的值，否在使用 obj,这样就实现了忽略构造函数返回的原始值

```javascript
function createNew (Con,...args){
    let obj = {}		// 创建一个对象，因为new操作符会返回一个对象
    Object.setPrototypeOf(obj,Con.prototype)		// 将对象与构造函数原型链接起来
    let result = Con.apply(obj,args)	// 将构造函数中的this指向这个对象，并传递参数
    return result instanceof Object ? result ：obj
}
```

## instanceof

> instanceof 用来检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性

```javascript
function instanceof(left,right){
    let proto = left.__proto__
    let prototype  = right.prototype
    while(true){
        if(proto === null) return false;
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}
```

## 手写Promise A+规范

>  在面试中高级前端时。要求被手写Promise A+规范源码是必考题了。如果想详细了解，请参考 [一步步教你实现Promise/A+ 规范 完整版](https://juejin.im/post/5e2168626fb9a0300d619c9e)

## 深浅拷贝

原对象

```javascript
let obj = {
    a:100,
    b:[100,200,300],
    c:{x:10},
    d:/^\d+$/
}
```

> 浅克隆： 只克隆第一层

方法一：

```javascript
let obj2 = {...obj}
```

方法二：

```javascript
let obj2 = {}
for(let key in obj){
    if(!obj.hasOwnProperty(key)) break;
    obj2[key] = obj[key]
}
```

> 深克隆

注意：在函数，日期，正则表达式时，JSON.stringify 时，都会被转换成对象 {}

方法一：

```javascript
let obj3 = JSON.parse(JSON.stringify(obj))
```

方法二：

```javascript
function deepClone(obj){
    // 过滤一些特殊情况
    if(obj === null) return null;
    if(typoof obj !=="object") return obj;
    if(obj instanceof RegExp){
        return new RegExp(obj)
    }
    if(obj instanceof Date){
        return new Date(obj)
    }
    // 不直接创建空对象的目的：克隆的结果和之前保持所属类  =》 即能克隆普通对象，又能克隆某个实例对象
    let newObj = new obj.constructor;
    for(let  key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key])
        }
    }
    return newObj;
}
```

## Promise

 在面试中高级前端时。要求被手写Promise A+规范源码是必考题了。如果想详细了解，请参考 [一步步教你实现Promise/A+ 规范 完整版](https://juejin.im/post/5e2168626fb9a0300d619c9e)

- 一个 Promise 的当前状态必须为 等待（pending:可以迁移至执行或拒绝状态）、执行（fulfilled：不能迁移至其他任何状态，且必须拥有一个不可变的终值）、拒绝（reject：不能迁移至任何状态，必须拥有一个不可变的拒因）
- 一个 Promise 必须提供一个 then 方法以访问其当前值、终值和拒因

- Promise 的 then 方法接受两个参数

```javascript
Promise.then(onFulfilled,onRejected)
```

- onFulfilled 和 onRejected 都是可选参数（ 如果onFullfilled 或  onRejected 不是函数，其必须被忽略 ）
- onFulfilled 和  onRejected  的特性
  *  onFulfilled 在 promise 执行结束后必须被调用，其第一个参数 为 promise 的终值
  * onRejected  在 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的拒因
  * onFulfilled / onRejected 在 执行结束 / 被拒绝执行  前 不可被调用
  * 调用次数 均不可以超过 一次
  *  onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
  *  onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）
- then 方法可以被同一个promise调用多次
  -  当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
  -  当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
- then 方法必须 返回一个 promise 对象

```javascript
class Promise{
    constructor(executor){
		this.status = 'pending' 		// 初始话状态
         this.value = undefined			// 初始化成功返回的值
         this.reason = undefined		// 初始化失败返回的原因

        // 解决处理异步的 resolve
        this.onResolvedCallbacks = []	// 存放所有成功的 resolve
        this.onRejectedCallbacks = [] 	// 存放所有失败的 reject

        /**
         *	@param {*} value 成功返回值
         *	定义 resolve 方法
         *	注意： 状态只能从 pending  -> fulfiilled 和 pending -> rejected 两个
         */
        const resolve = (value)=>{
            if(this.status === 'pending'){
                this.status = 'fulfilled'	// 成功时将状态转换为成功态 fulfilled
                this.value = value			// 将成功返回的值赋值给 promise
                // 为了解决异步 resolve 以及返回 多层 promise
                this.onResolvedCallbacks.forEach(fn=>{
                    fn()	// 当状态变为 成功态 依次执行所有的 resolve 函数
                })
            }
        }

        /**
         *	@param {*} value 被拒绝执行时返回值
         *	定义 resolve 方法
         *	注意： 状态只能从 pending  -> fulfiilled 和 pending -> rejected 两个
         */
        const reject = (reason)=>{
            if(this.status === 'pending'){
                this.status = 'rejected'	// 失败时将状态转换为失败太 rejected
                this.reason = reason		// 将失败返回的原因赋值给 promise
                this.onRejectedCallbacks.forEach(fn=>{
                    fn()	// 当状态变为 失败态时 依次执行所有的 reject 函数
                })
            }
        }

        executor(resolve,reject)
    }


    /**
     * 定义 promise 的 then  方法
     * @param {*} onFulfilled 成功的 回调
     * @Param {*} onRejected 失败的回调
     */
    then(onFulfilled,onRejected){
        // 为了解决then 方法返回Promise 的情况
        const promise2 = new Promise((resolve,reject)=>{
            if(this.status ==='fulfilled'){     // 如果状态为 fulfilled 的时候则将值传给 这个成功的回调
                setTimeout(()=>{
                    const x = onFuifilled(this.value)       // x 的值有可能 为 promise || 123 || '123'
                    // 注意： 此时调用promise2 时还没有返回 值，要用 setTimeout 模拟进入第二次事件循环，先有鸡后有蛋
                    resolvePromise(promise2,x,resolve,reject)
                },0)
            }

            if(this.status === 'rejected'){
                setTimeout(()=>{
                    const x = onRejected(this.reason)       // 如果状态为rejected 时 则将 失败的原因传给 失败的回调
                    resolvePromise(promise2,x,resolve,reject)
                },0)
            }

            if(this.status === 'pending'){      // 记录 ->> 解决异步
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    },0)
                })

                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        const x = onRejected(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    },0)
                })
            }
        })

        return promise2;    // 解决多次链式调用的问题
    }
}


const resolvePromise = (promise2,x,resolve,reject) => {
    if(promise2 === x){
        throw TypeError('循环引用')
    }
    // 判断 x 是不是 promise ; 注意: null 的 typeof 也是 object 要排除
    if(typeof x ==='function' || (typeof x === 'object' && x !==null)){
        try{
            const then = x.then     // 获取返回值 x 上的 then方法；注意方法会报错要捕获异常，原因 111
            if(typeof then === 'function'){     // 就认为是  promise
                then.call(x,y=>{
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    reject(r)
                })
            }
        }catch(e){
            reject(e)
        }
    }else{
        resolve(x)
    }
}


module.exports = Promise
```

## vue 拖拽指令

```javascript
Vue.directive('drag',{
    inserted:(el,binding,vnode)=>{
        const dragDom = el;
        dragDom.style.cssText += ';cursor:move';
        dragDom.style.cssText += 'left:0px;top:0px;'

        dragDom.onmousedown = (e)=>{
         	// 鼠标按下，计算当前元素 距离 可视区（父级元素）的距离
            const disX = e.clientX - dragDom.offsetLeft
            const disY = e.clientY - dragDom.offsetTop

            const dragDomWidth = dragDom.offsetWidth
            const dragDomHeight = dragDom.offsetHeight

            const wrapWidth  = dragDom.offsetParent.clientWidth
            const wrapHeight = dragDom.offsetParent.clientHeight

            const minDragDomLeft = dragDom.offsetParent.offsetLeft
            const maxDragDomLeft = wrapWidth - dragDom.offsetParent.offsetLeft - dragDomWidth

            const minDragDomTop = dragDom.offsetParent.offsetTop
            const maxDragDomTop = wrapHeight -dragDom.offsetParent.offsetParent.offsetTop - dragDomHeight

            document.onmousemove = (e)=>{
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX
                let top = e.clientY - disY

                // 边界处理
                if(e.clientX < minDragDomLeft){
                    left = 0
                }else if(e.clientX > maxDragDomLeft){
                    left = maxDragDomLeft
                }
                if(e.clientY < minDragDomTop){
                    top = 0
                }else if (e.clientY > maxDragDomTop){
                    top = maxDragDomTop
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left}px;top:${top}px;`
            }

            document.onmouseup = (e)=>{
                document.onmousemove = null
                document.onmouseup = null
            }

            if(e.stopPropagation){
                e.stopPropagation()
            }else if(e.preventDefault){
                e.preventDefault()
            }
        }
    }
})
```


<Vssue title="Vssue Demo" />
