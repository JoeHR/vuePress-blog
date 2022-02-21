## eslint 简介及用法介绍

eslint 是一个开源的 JavaScript 代码检查工具，javascript 是一个动态的弱类型语言，在开发中比较容易出错，而利用 eslint 的代码检查，可以让我们在编码的过程中发现问题，避免一些语法错误和一些空变量的产生，而不是在执行的过程中再去发现，同时对于团队风格的统一也有一定好处。

- 所有的配置都是拔插的
- 每条规则都是独立的，可自由选择开启或关闭
- eslint 并不推荐任何编码风格， 可完全根据自己的选择自定义编码风格

eslint官方也提供了3种预安装包：

- 谷歌标准：[eslint-config-google](https://google.github.io/styleguide/jsguide.html)
- Airbnb标准：[eslint-config-airbnb](https://github.com/lin-123/javascript) (该标准以来 eslint、eslint-plugin-import、eslint-plugin-react、eslint-plugin-jsx-a11y等插件)
- 通用标准： [eslint-config-standard](https://standardjs.com/rules.html)

## eslint 配置文件

通过 `eslint int`命令初始化 eslint 后，可以宣传生成合适的配置

eslint 独立配置文件类型 有三种： 

- .eslintrc.js 
- .eslintrc.json
- .eslintrc.yaml 

除了上面三种独立的配置文件外可以存放eslint配置外，eslint 配置也可以存放在 `package.json` 文件中的 `eslintConfig` 属性中。

如果在同一个项目目录中有多个配置文件，Eslint 将只使用一个。有限顺序是：

- .eslintrc.js
- .eslintrc.yaml/.eslintrc.yml
- .eslintrc.json
- .eslintrc
- package.json 中的 `eslintConfig` 

:::war

**注意**：`.eslint`文件也可以直接当配置文件，在很多老项目中依然在使用

:::

## eslint 忽略文件

除了 eslint 配置规则文件外，还有一个 特殊的配置文件可以用来过滤项目中某些目录或文件，使其忽略 eslint 规则检测，不对其进行 eslint 规范校验

+ `.eslintignore` 文件

`.eslintignore` 文件是一个纯文本文件，每行包含一个模式或者目录

- 以`#`开头的行被当作注释，不影响忽略模式
- 路径是相对于 `.eslintignore` 的位置或当前工作目录、
- 以`!`开头的行表示否定模式

```.eslintignore
# 忽略第三方包
**/node_mudules

# 忽略配置文件
build/*.js
config/*.js
```

如果 .eslintignore 未找到文件并且未指定备用文件，eslint 将在 `package.json` 中查找eslintIgnore 以检查要忽略的文件。

```json
{
  "name": "myapp",
  "version": "0.0.1",
  "eslintIgnore": ["test1.js", "test2.js"]
}
```

- 在文件中添加 `eslin-disable` 注释也可忽略检测

```js
/* eslint-disable */ 忽略块注释中代码检查
console.log(123)

console.log(123); // eslint-disable-line 忽略这一行

//eslint-disable-next-line 忽略下一行
console.log(123); 
```

- 当然你可以指出具体忽略的规则，实际中用的比较少，如下

```
alert('foo'); // eslint-disable-line no-alert
```

