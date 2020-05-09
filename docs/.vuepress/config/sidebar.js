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
      ],
    },
    {
      title: 'Vue学习',
      collapsable: false,
      children: [
        ['vue01', 'vue源码学习笔记01'],
        ['vue02', 'vue 函数节流和防抖'],
        ['vue03', 'vue 使用得一些小技巧'],
        ['vue04', 'vue 相关面试题']
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
  '/other/': ['', 'gitment'],
  '/node': [''],
  '/python': [''],
}
