<!--
 * @Author: rh
 * @Date: 2020-06-09 09:41:01
 * @LastEditTime: 2020-06-09 09:45:37
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
--> 

## 本地初始化项目，同步到远程仓库

```
cd ./app


echo "# test" >> README.md

git init

git add README.md

git commit -m "first commit"

git remote add origin 仓库地址

git push -u origin master

```

## 同步一个已经存在(已经git初始化过的)的项目到远程

```

cd ./app

git remote add origin https://github.com/JoeHR/test.git

git push -u origin master

```