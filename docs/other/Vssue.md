<!--
 * @Author: rh
 * @Date: 2020-06-09 09:36:45
 * @LastEditTime: 2020-06-09 09:38:11
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
--> 

## 介绍
Vssue (/'vɪʃuː/，由 "V" 和 "Issue" 组合而来) 是一个 Vue 组件 / 插件，可以为你的静态页面开启评论功能。

由于你的页面是“静态”的，你没有数据库和后端 API 的支持。但是你希望让你的页面拥有评论功能，让用户可以登录和发表评论。代码托管平台（如 Github、Gitlab、Bitbucket、Coding 等平台）提供了 OAuth API ，在它们的帮助下，Vssue 可以让用户通过这些平台的帐号登录，将评论存储在这些平台的 Issue 系统中，并在当前页面展示。

这也是 Vssue 名字的由来：由 Vue 驱动并基于 Issue 实现。

Vssue 的灵感来自于 Gitment 和 Gitalk，但是和它们有些区别：

Vssue 支持 Github, Gitlab, Bitbucket, Gitee 和 Gitea，并且很容易扩展到其它平台。Gitment 和 Gitalk 仅支持 Github。
Vssue 可以发表、编辑、删除评论。Gitment 和 Gitalk 仅能发表评论。
Vssue 是基于 Vue.js 开发的，可以集成到 Vue 项目中，并且提供了一个 VuePress 插件。 Gitment 基于原生JS，而 Gitalk 基于 Preact。

## 如何工作的
