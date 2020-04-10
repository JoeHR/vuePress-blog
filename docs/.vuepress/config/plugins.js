module.exports = [
    '@vuepress/back-to-top',
    '@vuepress/nprogress',
    [
        '@vssue/vuepress-plugin-vssue',{
            // 设置 `platform` 而不是 `api`
            platform:'github',
            owner:"JoeHR",
            repo:"BlogGitment",
            clientId:"03b80e713d2c06457d5f",
            clientSecret:"df570dc96a027eee0bda106007160a1e48cdd07c"
        }
    ]
]