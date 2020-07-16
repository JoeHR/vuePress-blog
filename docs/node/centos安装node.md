<!--
 * @Author: rh
 * @Date: 2020-07-16 14:13:49
 * @LastEditTime: 2020-07-16 14:22:17
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
--> 
# 在 Centos 7 中安装 Node.js 12.x LTS 最新版

由于 centos 中，Node.js 的 yum 源默认不是最新发行版，所以为了安装最新稳定版的nodejs,我们可以采用 二进制发行版 来快速安装 Node.js

执行命令：

```shell
curl -sL https://rpm.nodesource.com/setup_10.x | bash -
```

**注意** 上面命令中的`setup_10.x` 表示你即将安装的 最新稳定发行版，如果想安装12.x版本的，上面的 `setup_10.x` 改为 `setup_12.x`即可

这个命令将为问哦们配置Node.js NPM 存储库

配置了存储库之后，需要清理yum 源缓存并选择最快的源重新生成缓存

```shell
sudo yum clean all

sudo yum makecache fast
```

安装编译环境：

```shell

sudo yum install -y gcc-c++ make
```

安装Node.js

```shell

sudo yum install -y nodejs
```

查看Node.js 版本
```
node -v
```

如果输出的版本不是最新的Node.js版本的话，那么执行命令`yum remove nodejs`将已安装的Node.js移除，然后重新安装即可

<Vssue title="Vssue Demo" />