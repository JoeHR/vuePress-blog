module.exports = {
  title: '个人主页',
  description: 'rh的博客',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' }],
  ],
  plugins: ['@vuepress/back-to-top'],
  themeConfig: {
    logo: "/img/logo.png",
    sidebarDepth: 2,
    nav: [
      { text: '主页', link: '/' },
      {
        text: '博客文章', items: [
          { text: '测试', link: '/test/' },
          { text: '前端', link: '/frontend/' },
          { text: 'linux', link: '/linux/' },
          { text: '杂文', link: '/other/' },
          { text: 'Node', link: '/node/' },
          { text: 'Python', link: '/python/' },
        ]
      },
      { text: '阅读日志', link: '/readlog' },
      { text: '关于', link: '/about/' },
      { text: 'Github', link: 'https://github.com/JoeHR' },
    ],
    sidebar: {
      '/test/': [
        {
          title: '测试',
          collapsable: false,
          children: [
            ""
          ]
        }
      ],
      '/frontend/': [
        {
          title: 'javascript',
          collapsable: false,
          children: [
            ['js01', '语音合成'],
            ['js02', 'JS循环优化'],
            ['js03', 'JS前端手写源码'],
            ['rollup01', 'rollupJs 打包工具'],
            ['performance', 'performance性能调试工具'],
            ['npm', '用npm打造超溜的前端工作流'],
            ['mui', 'muiJS'],
            "",
          ]
        },
        {
          title: 'css',
          collapsable: false,
          children: [
            ["css01", "css大法"],
            ["css02", "css小技巧"],
            ["css03", "css冷门技巧"],
          ]
        },
        {
          title: 'Vue学习',
          collapsable: false,
          children: [
            ["vue01", "vue源码学习笔记01"]
            ["vue02", "vue 函数节流和防抖"]
          ]
        },
      ],
      '/linux/': [
        "",
        ["linux01", "docker入门之安装教程"],
        ["linux02", "ssh密钥方式远程链接linux"],
        "linux03"
      ],
      '/other/': [
        "",
        "gitment"
      ],
      '/node': [
        ""
      ],
      '/python': [
        ""
      ]
    }
  },
  markdown: {
    lineNumbers: true
  }
}