const sidebar = require('./config/sidebar')
const nav = require('./config/nav')
const plugins = require('./config/plugins')

module.exports = {
  title: '个人主页',
  description: 'rh的博客',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
    ['meta',{name: 'viewport', content:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;',}],
  ],
  plugins,
  themeConfig: {
    logo: '/img/logo.png',
    repo: 'https://github.com/JoeHR/vuePress-blog',
    repoLabel: 'Github',
    lastUpdated: '最后更新时间',// 1.接受字符串，它设置了最后更新时间的label，例如：最后更新时间：2019年5月3日 21:51:53   2.设置true，开启最后更新时间  3.设置false，不开启最后更新时间(默认)
    sidebarDepth: 2,
    nav,
    sidebar,
    baiDu:{
      tongJi: 'https://hm.baidu.com/hm.js?tongJi',
      autoPush: true,
      pinYin: true,
    }
  },
  markdown: {
    // lineNumbers: true
  },
};
