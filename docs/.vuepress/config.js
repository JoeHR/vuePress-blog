module.exports = {
  title: '个人主页',
  description: 'rh的博客',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;' }],
  ],
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
        ]
      },
      { text: '阅读日志', link: '/readlog' },
      { text: '关于', link: '/about/' },
      { text: 'Github', link: 'https://www.github.com/codeteenager' },
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
            "",
            ['js01', '语音合成']
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
      ],
      '/linux/': [
        "",
        ["linux01", "docker入门之安装教程"],
        ["linux02", "ssh密钥方式远程链接linux"]
      ],
      '/other/': [
        ""
      ]
    }
  }
}