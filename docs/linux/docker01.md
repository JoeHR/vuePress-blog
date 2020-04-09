## docker 常用命令

### 列出所有容器ID

```shell
docker ps -aq
```

### 查看所有运行或者已停止（运行完毕的）容器

```shell
docker ps -a
```

### 停止所有的 docker容器，这样才能狗删除 其中的 images镜像

```shell
docker stop $(docker ps -a -q)

或者

docker stop $(docker ps -aq)
```

### 删除所有容器

```shell
docker rm $(docker ps -a -q)

或者 

docker rm $(docker ps -aq)
```

### 查看当前所有镜像

```shell
docker images
```

### 删除指定的 镜像，可以通过 镜像的 id 来指定删除谁

```shell
docker rmi <image id>
```

### 删除 untagged images,也就是那些 tag  为 <none> 的镜像

```shell
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```

### 删除全部镜像

```shell
docker rmi $(docker images -q)
```

### 强制删除全部镜像

```shell
docker rmi -f $(docker images -q)
```

### 从容器复制到宿主机

```shell
docker cp 容器名： 容器路径 宿主机路径

例如：
docker cp tomcat：/webapps/js/text.js /home/admin
```

### 从宿主机复制到容器

```shell
docker cp 宿主路径中文件      容器名  容器路径

例如：
docker cp /home/admin/text.js tomcat：/webapps/js
```

### 删除所有停止的容器

``` she
docker container prune
```

### 删除所有不使用（停止的）的镜像

```shell
docker image prune --force --all

或者
docker image prune -f -a
```

### 停止、启动、杀死、重启 一个容器

```shell
docker stop Name或者Id
docker start Name或者Id
docker kill Name或者Id
docker restart Name或者Id
```

### docker 进入容器，查看配置文件

```shell
docker exec	: 在运行的容器中执行命令
		-d : 分离模式，在后台运行
		-i : 即使没有附加也保持STDIN（标准输入）打开，以交互模式运行容器，通常与 -t 同时使用
		-t ：为容器重新分配一个伪输入终端，通常与 -i 同时使用
		
例如：
docker exec -if f94d2c317477 /bin/bash
docker exec -it testdb mongo
```

修改配置、退出容器

```shel
1、如果要正常退出不关闭容器，请按Ctrl+P+Q进行退出容器
2、如果使用exit退出，那么在退出之后会关闭容器，可以使用下面的流程进行恢复
使用docker restart命令重启容器
使用docker attach命令进入容器
```

