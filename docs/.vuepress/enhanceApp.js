import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './public/css/devices.min.css'


function renderGitment(fullPath) {
  const gitment = new Gitment({
    id: fullPath,
    owner: 'JoeHR',  // 必须是你自己的github 账号
    repo: 'BlogGitment', // 上一个准备的 github 仓库
    oauth: {
      client_id: '03b80e713d2c06457d5f', // 第一步注册 OAuth application 后获取到的 Client ID
      client_secret: 'df570dc96a027eee0bda106007160a1e48cdd07c', // 第一步注册 OAuth application 后获取到的 Clien Secret
    }
  })
  gitment.render('comments-container')
}

function integrateGitment(router) {
  const linkGitment = document.createElement('link')
  const scriptGitment = document.createElement('script')
  linkGitment.href = 'https://jjeejj.github.io/css/gitment.css'
  linkGitment.rel = 'stylesheet'
  scriptGitment.src = 'https://www.wenjunjiang.win/js/gitment.js'
  document.body.appendChild(linkGitment)
  document.body.appendChild(scriptGitment)

  router.afterEach(to => {
    // 已被初始化则根据页面重新渲染 评论区
    if (scriptGitment.onload && window.Gitment) {
      renderGitment(to.fullPath)
    } else {
      const commentsContainer = document.createElement('div')
      commentsContainer.id = 'comments-container'
      commentsContainer.classList.add('theme-default-content')
      const $page = document.querySelector('.page')
      if ($page && window.Gitment) {
        if (!document.querySelector('#comments-container')) {
          $page.appendChild(commentsContainer)
        }
        renderGitment(to.fullPath)
      }
    }

  })
}


export default ({
  Vue,    // VuePress 正在使用的 Vue 构造函数
  options,  // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData  // 站点元素据
}) => {
  Vue.use(ElementUI)
  // try {
  //   // 生成静态页时在node中执行，没有document对象
  //   document && integrateGitment(router)
  // } catch (e) {
  //   console.error(e.message)
  // }
  // ...做一些其他的应用级别的优化
}