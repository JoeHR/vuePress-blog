/*
 * @Author: rh
 * @Description: 这不是一个 bug，这只是一个未列出来的特性
 * @LastEditors: rh
 */
module.exports = {
  '/test/': [
    {
      title: '测试',
      collapsable: false,
      children: [''],
    },
  ],
  '/frontend/': [
    {
      title: 'javascript',
      collapsable: false,
      children: [
        ['js01', '语音合成'],
        ['js02', 'JS循环优化'],
        ['js03', 'JS前端手写源码'],
        ['js04', 'JS前端实现十大经典排序算法'],
        ['js05', '一些优秀的工具函数'],
        ['rollup01', 'rollupJs 打包工具'],
        ['performance', 'performance性能调试工具'],
        ['npm', '用npm打造超溜的前端工作流'],
        ['mui', 'muiJS'],
        'dailyquestion',
        'eslint',
      ],
    },
    {
      title: 'css',
      collapsable: false,
      children: [
        ['css01', 'css大法'],
        ['css02', 'css小技巧'],
        ['css03', 'css冷门技巧'],
        ['css基础', 'css基础']
      ],
    },
    {
      title: 'React学习',
      collapsable: false,
      children: [
        ['react01', 'react的相关知识点'],
      ],
    },
    {
      title: 'Vue学习',
      collapsable: false,
      children: [
        ['vue01', 'vue源码学习笔记01'],
        ['vue02', 'vue 函数节流和防抖'],
        ['vue03', 'vue 使用得一些小技巧'],
        ['vue04', 'vue 相关面试题'],
        ['vue05', 'vue-cli3项目 升级到 vue-cli4']
      ],
    },
    {
      title: '进阶',
      collapsable: false,
      children: [
        ["单例模式", "单例模式"],
        ["装饰器模式", "装饰器模式"],
        ["浏览器事件", "浏览器事件"],
        ["虚拟Dom", "虚拟DOM简析"],
        ["call,apply以及bind的使用与区别", "call,apply及bind得使用与区别"],
        ["性能", "性能检测及加载优化"],
        ["函数妙用", "高级函数"],
        ["防篡改对象", "防篡改对象"],
        ["前端监控", "监控"],
        ["前端埋点", "前端监控与埋点"]
      ],
    },

  ],
  '/linux/': [
    '',
    ['linux01', 'docker入门之安装教程'],
    ['linux02', 'ssh密钥方式远程链接linux'],
    'linux03',
    'docker01',
    'mongodb01',
    'mongoose',
    ['redis', 'redis笔记1'],
    ['redis01', 'redis笔记2'],
    ['redis02', 'redis笔记3'],
  ],
  '/other/': ['', 'gitment',
    ['vscode插件配置', 'VS Code 配置 Vue 开发环境 - Vetur+ESLint+Prettier（2020）']
  ],
  '/node/': [
    '',
    ['centos安装node', 'centos7 快速安装Node 稳定发行版']
  ],
  '/python': [''],
}
