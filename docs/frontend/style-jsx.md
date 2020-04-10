## [styled-jsx](https://github.com/zeit/styled-jsx)

zeit 的一系列产品从 now，到 next.js，我算是一个脑残粉。简洁好用是我对 zeit 的项目的印象。而且一套库自成系统，styled-jsx 和 next.js 完美兼容。

### 1. 基础用法

styled-jsx 概括第一印象就是 React css 的 vue 解决。
 `yarn add styled-jsx` 安装后，不用`import`，而是一个babel插件，`.babelrc`配置：

```
{
  "plugins": [
    "styled-jsx/babel"
  ]
}
复制代码
```

然后就直接用了

```
render () {
    return <div className='table'>
        <div className='row'>
            <div className='cell'>A0</div>
            <div className='cell'>B0</div>
        </div>
        <style jsx>{`
          .table {
            margin: 10px;
          }
          .row {
            border: 1px solid black;
          }
          .cell {
            color: red;
          }
    `}</style>
    </div>;
}
复制代码
```

- ``的位置可以按喜好自定，样式总是作用于组件的所有元素
- 样式只作用于本组件，不影响全局也不影响子组件
- 实现方式大致是给组件内所有标签自动加上了一个独特`className` 例如

```
const App = () => (
  <div>
    <p>只有这个p会被上样式</p>
    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
)
复制代码
```

会被转化成

```
import _JSXStyle from 'styled-jsx/style'

const App = () => (
  <div className='jsx-123'>
    <p className='jsx-123'>只有这个p会被上样式</p>
    <_JSXStyle styleId='123' css={`p.jsx-123 {color: red;}`} />
  </div>
)
复制代码
```

从实现到原理，对比vue是不是非常像呢？如果你不喜欢将样式写在 render 里，styled-jsx 提供了一个 `css` 的工具函数：

```
import css from 'styled-jsx/css'

export default () => (
  <div>
    <button>styled-jsx</button>
    <style jsx>{button}</style>
  </div>
)

const button = css`button { color: hotpink; }`
复制代码
```

非常完美的css解决方案。 下面针对“选择标准”里提到的各个方面考察一下 styled-jsx

### 2. 动态css

和 styled-components，Motion 等模板字符串的解决方案一样，动态css轻而易举

```
export default (props) => (
  <div>
    <button>styled-jsx</button>
    <style jsx>{
      `button { color: ${props.color}; }`
    }</style>
  </div>
)
复制代码
```

同个组件里可以写无限个``标签，这里的最佳实践是将静态的css放一个标签，动态的放另一个，每次渲染时只有动态的重新计算和渲染

```
const Button = (props) => (
  <button>
     { props.children }
     <style jsx>{`
        button {
          color: #999;
          display: inline-block;
          font-size: 2em;
        }
     `}</style>
     <style jsx>{`
        button {
          padding: ${ 'large' in props ? '50' : '20' }px;
          background: ${props.theme.background};
        }
     `}</style>
  </button>
)
复制代码
```

两点注意：

- 只有写在 render 函数里的style是动态的，所以动态css不能如第二例那样提取出来
- 原声解决方法的 style props的样式会覆盖 styled-jsx 的样式

### 3. 如何使用Sass

两个字，插件。

- [styled-jsx-plugin-sass](https://github.com/giuseppeg/styled-jsx-plugin-sass)
- [styled-jsx-plugin-postcss](https://github.com/giuseppeg/styled-jsx-plugin-postcss)
- [styled-jsx-plugin-stylelint](https://github.com/giuseppeg/styled-jsx-plugin-stylelint)
- [styled-jsx-plugin-less](https://github.com/erasmo-marin/styled-jsx-plugin-less)
- [styled-jsx-plugin-stylus](https://github.com/omardelarosa/styled-jsx-plugin-stylus)

一应俱全。以Sass为例：

```
yarn add -D node-sass styled-jsx-plugin-sass
复制代码
```

`.babelrc`配置

```
{
  "plugins": [
    [
      "styled-jsx/babel",
      { "plugins": ["styled-jsx-plugin-sass"] }
    ]
  ]
}
复制代码
```

即可使用Sass。

### 4. 全局css

如同 Vue 以 `scoped` 为关键字，styled-jsx 以 `global` 为关键字。

```
export default () => (
  <div>
    <style jsx global>{`
      body {
        background: red
      }
    `}</style>
  </div>
)
复制代码
```

全局样式注明 global 即可。

有极少情况（比如传一个全局类给三方库）需要使单个选择器全局化，语法类似 css-module

```
div :global(.react-select) {
    color: red
}
复制代码
```

### 5. 三方UI库的支持

相对有点繁琐，思想是取得styled-jsx转化过后的类名，注入到三方库的className props里，这样即解决了支持，又保全了局部css，代码如下

```
import Link from 'react-router-dom' // 例子，给Link组件添加样式

const scoped = resolveScopedStyles(
  <scope>
    <style jsx>{'.link { color: green }'}</style>
  </scope>
)

const App = ({ children }) => (
  <div>
    {children}
    <Link to="/about" className={`link ${scoped.className}`}>
      About
    </Link>
    
    {scoped.styles}
  </div>
);

function resolveScopedStyles(scope) {
  return {
    className: scope.props.className, //就是被styled-jsx添加的独特className
    styles: scope.props.children      //就是style，注入到App组件中
  }
}
复制代码
```

当然，如果你不介意局部不局部，可以使用上面提到的`:global()` 语法

```
// 比如Form组件有类名form-item
export default () => (
  <div>
    <Form />
    <style jsx>{`
      div > :global(.form-item) {
        color: red
      }
    `}</style>
  </div>
)
复制代码
```

### 6. 语法高亮与补完

我使用VSCode：

- [语法高亮](https://marketplace.visualstudio.com/items?itemName=blanu.vscode-styled-jsx)
- [自动补完](https://marketplace.visualstudio.com/items?itemName=AndrewRazumovsky.vscode-styled-jsx-languageserver)

其他的见 github 上 readme。

### 7. 大小？性能？

- 可使用所有css语法
- 3kb的gzip大小
- 浏览器的prefix自动加了
- 有source-map 支持，方便debug
- 据作者说性能也很高

### 8. style-jsx vs styled-components

谢谢ziven27提议，我试着说说和现在最流行的 styled-components 库的区别。（方便讨论，“前者”代指style-jsx，“后者”代指style-components）

- 最大区别在于前者样式作用于整个组件，后者的样式只作用于所包裹的元素。打个比方就如同vue和inline css的区别。但其实只要使用sass的`&`嵌套，后者也是可以包裹组件最外层元素然后将其他元素样式统统写入的。虽然感觉不是后者的初衷。
- 后者与提供`className` props的三方库完美整合（比前者简洁太多）：

```
const RedButton = styled(Button)`background: red;`
复制代码
```

但对不提供`className` props的三方库一筹莫展（当然这种情况不太出现）。

- 后者由于使用了HOC模式，与其他所有HOC一样要处理ref的问题（包裹层的ref不同于原本元素的ref），多一事。
- 个人觉得前者的规则简洁明了（css怎么写就怎么写），后者有不少“魔术”的部分（比如props，theme），也引入了很多高级用法如`.extends` 样式继承以及`.attrs`封装公用props。

这里提到一个话题，到底是“魔术”好呢，还是朴实好呢？举个例子，比如theme（主题）：

```
// styled-components 使用Provider提供主题，主题可以是样式，也可以是函数
const Button = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

// 主题的样式
const theme = {
  fg: 'palevioletred',
  bg: 'white'
};

// 换前景色和背景色的函数
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});

render(
  <ThemeProvider theme={theme}>
    <div>
      <Button>Default Theme</Button>

      <ThemeProvider theme={invertTheme}>
        <Button>Inverted Theme</Button>
      </ThemeProvider>
    </div>
  </ThemeProvider>
);
复制代码
```

甚至还提供了一个HOC，在styled-components外使用theme

```
import { withTheme } from 'styled-components'
复制代码
```

强大不强大？对比之下，styled-jsx没有任何与theme相关的api，只是朴朴实实地靠props传递达成主题：

```
// styled-jsx
import { colors, spacing } from '../theme'
import { invertColor } from '../theme/utils'

const Button = ({ children }) => (
  <button>
     { children }
     <style jsx>{`
        button {
          padding: ${ spacing.medium };
          background: ${ colors.primary };
          color: ${ invertColor(colors.primary) };
        }
     `}</style>
  </button>
)
复制代码
```

这个问题要看应用场景和个人喜好吧，我属于不喜欢过多“魔术”，爱简单api（哪怕多点代码）的那派。大家有啥想法和指正，多多留言。

## 最后

有2个细小缺点

1. 和CRA整合时，css-in-js 的解决方式不会热加载，每次都刷新页面。
2. 和CRA整合时，由于是babel插件，需要eject或者使用[`react-app-rewired`](https://github.com/timarney/react-app-rewired)来加入 babel plugin 的设置。

之前有小伙伴留言表示有坑（谢谢，看到这样的留言觉得写blog的决定太对了）

```
同样觉得styled-jsx非常好，最近一直在用。
但目前还是有些不成熟的地方，主要是：
1、局部样式无法支持第三方组件标签，只能支持普通html标签
2、对stylelint缺乏支持，官方出的stylelint插件只是一个demo。在vscode中用stylelint插件时也是有很大的坑。
复制代码
```

<Vssue title="Vssue Demo" />