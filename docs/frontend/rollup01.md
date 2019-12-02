# Rollup.js

## 概述

 Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。 



## 简单使用

### 安装

在项目中安装 

```
npm i -D rollup
```

### 打包

- 项目src 目录 新建一个 入口文件 main.js

```js
// main.js

import foo from './foo.js'

export default function (){
	console.log(foo)
}

```

- 项目 src  下新建 模块文件 foo.js

```js
export default 'Hello world!'
```

- 打包

```
npx rollup .\src\main.js --format cjs > rh.js
```

得到 rh.js

```js
'use strict';

var foo = 'hello world!';

function main () {
  console.log(foo);
}

module.exports = main;
```



或者 使用 配置文件打包

项目根目录下 新建 配置文件 rollup.config.js

```
// rollup.config.js

export default {
  input: 'src/main.js',
  output: {
    file: 'rh.js',
    format: 'cjs'
  }
};
```

使用命令

```
npx rollup -c

# or
npx rollup --config rollup.config.js
```

也可以实现打包 得到 rh.js

### 使用 插件

```js
// src/main.js
import { version } from '../package.json'

export default function () {
  console.log('version' + version)
}
```

rollup.config.js

```js
import json from 'rollup-plugin-json'

export default {
  input: 'src/main.js',
  output: {
    file: 'rh.js',
    format: 'cjs'
  },
  // plugins: [json()]
}
```

如果不使用 json 文件，由于 import 出来的是一个json 字符串，如果不经过 rollup-plugin-json 文件处理的话，会打包报错

```powershell
Joe@JOERH  F:\..\..\..\..\demo2  npx rollup -c
loaded rollup.config.js with warnings
(!) Unused external imports
default imported from external module 'rollup-plugin-json' but never used

src/main.js → rh.js...
[!] Error: Unexpected token (Note that you need rollup-plugin-json to import JSON files)
package.json (2:8)
1: {
2:   "name": "demo2",
           ^
3:   "version": "1.0.0",
4:   "description": "",
Error: Unexpected token (Note that you need rollup-plugin-json to import JSON files)
    at error (C:\Users\Joe\AppData\Roaming\npm\node_modules\rollup\dist\rollup.js:5362:30)
    at Module.error (C:\Users\Joe\AppData\Roaming\npm\node_modules\rollup\dist\rollup.js:9662:9)
    at tryParse (C:\Users\Joe\AppData\Roaming\npm\node_modules\rollup\dist\rollup.js:9571:16)
    at Module.setSource (C:\Users\Joe\AppData\Roaming\npm\node_modules\rollup\dist\rollup.js:9887:33)
    at Promise.resolve.catch.then.then.then (C:\Users\Joe\AppData\Roaming\npm\node_modules\rollup\dist\rollup.js:12156:20)       

 Joe@JOERH  F:\..\..\..\..\demo2  
```

引入插件 就 ok

```
import json from 'rollup-plugin-json'

export default {
  input: 'src/main.js',
  output: {
    file: 'rh.js',
    format: 'cjs'
  },
  // plugins: [json()]
}
```

## 常见问题

### 为什么ES模块比CommonJS更好

 ES模块是官方标准，也是JavaScript语言明确的发展方向，而CommonJS模块是一种特殊的传统格式，在ES模块被提出之前做为暂时的解决方案。 ES模块允许进行静态分析，从而实现像 tree-shaking 的优化，并提供诸如循环引用和动态绑定等高级功能。 

### 什么是 ‘tree-shaking’

 Tree-shaking, 也被称为 "live code inclusion," 它是清除实际上并没有在给定项目中使用的代码的过程，但是它可以更加高效。 

##  **Webpack与Rollup的对比** 

###  **Webpack的特点** 

> #### **代码分割** 

Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

> #### Loader(加载器)

 Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。 

> ####  **智能解析** 

 Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。 

> #### 插件系统

 Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。 

### Rollup的特点

> ####  **Tree-shaking** 

 这个特点，是Rollup最初推出时的一大特点。Rollup通过对代码的静态分析，分析出冗余代码，在最终的打包文件中将这些冗余代码删除掉，进一步缩小代码体积。这是目前大部分构建工具所不具备的特点(Webpack 3.0+ 已经支持了)

> #### ES2015模块打包支持

 这个也是其他构建工具所不具备的。Rollup直接不需要通过babel将import转化成Commonjs的require方式，极大地利用ES2015模块的优势。 

### 对比

其实，通过分别对Webpack和Rollup的介绍，不难看出，Webpack和Rollup在不同场景下，都能发挥自身优势作用。Webpack对于代码分割和静态资源导入有着“先天优势”，并且支持热模块替换(HMR)，而Rollup并不支持，所以当项目需要用到以上，则可以考虑选择Webpack。但是，Rollup对于代码的Tree-shaking和ES6模块有着算法优势上的支持，若你项目只需要打包出一个简单的bundle包，并是基于ES6模块开发的，可以考虑使用Rollup。其实Webpack从2.0开始支持Tree-shaking，并在使用babel-loader的情况下支持了es6 module的打包了，实际上，Rollup已经在渐渐地失去了当初的优势了。但是它并没有被抛弃，反而因其简单的API、使用方式被许多库开发者青睐，如React、Vue等，都是使用Rollup作为构建工具的。而Webpack目前在中大型项目中使用得非常广泛。最后，用一句话概括就是：

**在开发应用时使用 Webpack，开发库时使用 Rollup**