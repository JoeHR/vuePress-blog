



本篇介绍了在Mac OS, Windows, Linux下的Docker安装方法。



先来一个官方的介绍：

> Docker Engine is available for Linux ([CentOS](https://store.docker.com/editions/community/docker-ce-server-centos), [Debian](https://store.docker.com/editions/community/docker-ce-server-debian), [Fedora](https://store.docker.com/editions/community/docker-ce-server-fedora), [Oracle Linux](https://store.docker.com/editions/enterprise/docker-ee-server-oraclelinux), [RHEL](https://store.docker.com/editions/enterprise/docker-ee-server-rhel), [SUSE](https://store.docker.com/editions/enterprise/docker-ee-server-sles), and [Ubuntu](https://store.docker.com/editions/community/docker-ce-server-ubuntu)) or [Windows Server](https://store.docker.com/editions/enterprise/docker-ee-server-windows) operating systems and is based on containerd - the open source container runtime project that Docker donated to the Cloud Native Computing Foundation (CNCF) in 2017. It is available as both a free community-supported engine and as a commercially-supported enterprise engine (Docker Engine-Enterprise) that also forms the foundation for an enterprise container platform.

基本上全平台已经覆盖，英文好的同学，可以自取。

## Mac OS上的Docker安装方法

**方法一官方`dmg`：**

官方下载地址：

[Docker Descktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

对系统的要求：

> Requires Apple Mac OS Sierra 10.12 or above. Download [Docker Toolbox](https://docs.docker.com/toolbox/overview/) for previous OS versions.

只要系统是 Mac OS Sierra 10.12以上即可。

下载完`Docker.dmg`安装包之后，双击即可以安装，可能需要系统管理员权限，输入密码即可。

运行过后，小图标：

[![图片裂了，联系：lw96@live.com](http://blog.static.toimc.com/blog/img/2019/docker%E5%85%A5%E9%97%A8%E4%B9%8B%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/docker-install.png?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)Mac上Docker安装运行之后](http://blog.static.toimc.com/blog/img/2019/docker入门之安装教程/docker-install.png?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)

安装完之后，在终端工具中，使用`docker version`来查看Docker版本。

[![图片裂了，联系：lw96@live.com](http://blog.static.toimc.com/blog/img/2019/docker%E5%85%A5%E9%97%A8%E4%B9%8B%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/docker-version.jpg?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)docker版本](http://blog.static.toimc.com/blog/img/2019/docker入门之安装教程/docker-version.jpg?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)

设置中国区加速地址：

[![图片裂了，联系：lw96@live.com](http://blog.static.toimc.com/blog/img/2019/docker%E5%85%A5%E9%97%A8%E4%B9%8B%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/docker-acc.jpg?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)docker加速](http://blog.static.toimc.com/blog/img/2019/docker入门之安装教程/docker-acc.jpg?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)

> 阿里云加速：[Docker 镜像加速器](https://yq.aliyun.com/articles/29941)

**方法二brew cask：**

复制

```shell
brew update 
brew cask install docker

# 删除的方法, 还需要手动删除Docker.app
brew cask uninstall docker
```

上面的命令将会把Docker安装在`Applications`目录下。

## Windows上Docker安装

官方下载地址：[Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

对系统的要求：

> Requires Microsoft Windows 10 Professional or Enterprise 64-bit. For previous versions get [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

需要Windows 10专业版及企业的64位版本，在Windows server 2016以上亲测是可用的。Windows 8/7/Vista/Xp之类的，就别想了，老实去装Windows 10或者虚拟机中去使用。

[![图片裂了，联系：lw96@live.com](http://blog.static.toimc.com/blog/img/2019/docker%E5%85%A5%E9%97%A8%E4%B9%8B%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/windows-docker.jpg?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)windows-docker安装示例](http://blog.static.toimc.com/blog/img/2019/docker入门之安装教程/windows-docker.jpg?watermark/2/text/VG9pbWPlh7rlk4E=/fontsize/800)

## Linux上Docker安装

### Centos中Docker安装方法

1. 先删除旧的版本(如果没有可以跳过)

   ```shell
   $ sudo yum remove docker \
                     docker-client \
                     docker-client-latest \
                     docker-common \
                     docker-latest \
                     docker-latest-logrotate \
                     docker-logrotate \
                     docker-engine
   ```

2. 安装必须的依赖：

   ```shell
   $ sudo yum install -y yum-utils \
     device-mapper-persistent-data \
     lvm2
   ```

   添加`stable`的Docker-ce的源：

   ```shell
   $ sudo yum-config-manager \
       --add-repo \
       https://download.docker.com/linux/centos/docker-ce.repo
   ```

3. 安装`docker-ce`:

   ```shell
   $ sudo yum install docker-ce docker-ce-cli containerd.io
   ```

4. 选择指定的安装版本(可选)

   ```shell
   $ yum list docker-ce --showduplicates | sort -r
   docker-ce.x86_64  3:18.09.1-3.el7      docker-ce-stable
   docker-ce.x86_64  3:18.09.0-3.el7      docker-ce-stable
   docker-ce.x86_64  18.06.1.ce-3.el7     docker-ce-stable
   docker-ce.x86_64  18.06.0.ce-3.el7     docker-ce-stable
   ```

   我们来举个例子，比如我们要安装`3:18.09.1-3.el7`这个版本，使用如下命令结构：

   ```shell
   $ sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
   ```

   命令说明：

   第一部分是`docker-ce`，第二部分是版本号`18.09.1`，看明白了吗？就是这样子：

   ```shell
   $ sudo yum install -y docker-ce-18.09.1 docker-ce-cli-18.09.1
   ```

5. 启动服务并测试一下：

   ```shell
   # 启动服务
   sudo systemctl start docker
   
   # 来一个Hello World吧
   sudo docker run hello-world
   Unable to find image 'hello-world:latest' locally
   latest: Pulling from library/hello-world
   1b930d010525: Pull complete
   Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
   Status: Downloaded newer image for hello-world:latest
   
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   
   To generate this message, Docker took the following steps: 
   	1. The Docker client contacted the Docker daemon. 
   	2. The Docker daemon pulled the "hello-world" image from the Docker Hub.    			(amd64) 
   	3. The Docker daemon created a new container from that image which runs the    			executable that produces the output you are currently reading. 
   	4. The Docker daemon streamed that output to the Docker client, which sent it    		to your terminal.
   
   To try something more ambitious, you can run an Ubuntu container with:
   $ docker run -it ubuntu bash
   
   Share images, automate workflows, and more with a free Docker ID: 				  https://hub.docker.com/
   
   For more examples and ideas, visit: 
   https://docs.docker.com/get-started/
   ```

   如果看到上面的提示，说明Docker已经成功安装并运行了了。

6. 关于升级&删除：

   升级：

   ```shell
   # 更新所有
   yum -y update

   # 更新指定
yum -y update docker-ce docker-ce-cli containerd.io
   ```
   
   删除：
   
   ```shell
   sudo yum remove docker-ce
   
   # 删除文件系统
   sudo rm -rf /var/lib/docker
   ```

### Debian中Docker的安装方法

1. 删除旧的版本(可跳过)

   ```shell
   $ sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 安装依赖：

   ```shell
   $ sudo apt-get update
   
   $ sudo apt-get install \    
   	apt-transport-https \    
   	ca-certificates \    
   	curl \    
   	gnupg2 \    
   	software-properties-common    
   	
   # 添加GPG key
   $ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
   
   $ sudo apt-key fingerprint 0EBFCD88
   pub   4096R/0EBFCD88 2017-02-22      
   	  Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
   uid                  Docker Release (CE deb) <docker@docker.com>
   sub   4096R/F273FCD8 2017-02-22
   ```

3. 使用`stable`安装源：

   - [x86_64 / amd64](https://www.toimc.com/docker入门之安装教程/#tab-1)

   ```shell
   $ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
   ```

   

   - [armhf](https://www.toimc.com/docker入门之安装教程/#tab-2)

   ```shell
   $ sudo add-apt-repository \
   "deb [arch=armhf] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
   ```

   - [arm64](https://www.toimc.com/docker入门之安装教程/#tab-3)

   ```shell
   $ sudo add-apt-repository \
   "deb [arch=arm64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable
   ```

4. 安装`docker-ce`：

   ```shell
   $ sudo apt-get update
   
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

5. 安装指定的版本：(可选)

   ```shell
   $ apt-cache madison docker-ce
   
     docker-ce | 5:18.09.1~3-0~debian-stretch | https://download.docker.com/linux/debian stretch/stable amd64 Packages
     docker-ce | 5:18.09.0~3-0~debian-stretch | https://download.docker.com/linux/debian stretch/stable amd64 Packages
     docker-ce | 18.06.1~ce~3-0~debian        | https://download.docker.com/linux/debian stretch/stable amd64 Packages
     docker-ce | 18.06.0~ce~3-0~debian        | https://download.docker.com/linux/debian stretch/stable amd64 Packages
     ...
   ```

   安装格式：

   ```shell
   $ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
   ```

   举例说明：比如要安装`5:18.09.1~3-0~debian-stretch`版本的docker的话：

   ```shell
   $ sudo apt-get install docker-ce=18.09.1 docker-ce-cli=18.09.1 containerd.io
   ```

4. 启动服务并测试：

   ```shell
   $ sudo service docker start
   
   # 查看Docker运行状态
   $ sudo service docker status
   
   $ sudo docker run hello-world
   ```

### Ubuntu中Docker安装方法

1. 删除旧的版本(可跳过)

   ```shell
   $ sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 安装依赖：

   ```shell
   $ sudo apt-get update
   
   $ sudo apt-get install \
       apt-transport-https \
       ca-certificates \
       curl \
       gnupg-agent \
       software-properties-common
       
   # 添加GPG key
   $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   
   $ sudo apt-key fingerprint 0EBFCD88
       
   pub   rsa4096 2017-02-22 [SCEA]
         9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
   uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
   sub   rsa4096 2017-02-22 [S]
   ```

3. 使用`stable`安装源：

   - [x86_64/amd64](https://www.toimc.com/docker入门之安装教程/#tab-ubuntu-1)

   ```shell
   $ sudo add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
   ```

   

   - [armhf](https://www.toimc.com/docker入门之安装教程/#tab-ubuntu-2)

   ```shell
   $ sudo add-apt-repository \
      "deb [arch=armhf] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
   ```

   

   - [arm64](https://www.toimc.com/docker入门之安装教程/#tab-ubuntu-3)

   ```shell
   $ sudo add-apt-repository \
      "deb [arch=arm64] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
   ```

   

   - [ppc64le (IBM Power)](https://www.toimc.com/docker入门之安装教程/#tab-ubuntu-4)

   ```shell
   $ sudo add-apt-repository \
      "deb [arch=ppc64el] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
   ```

   

   - [s390x (IBM Z)](https://www.toimc.com/docker入门之安装教程/#tab-ubuntu-5)

   ```shell
   $ sudo add-apt-repository \
      "deb [arch=s390x] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
   ```

4. 安装`docker-ce`：

   ```shell
   $ sudo apt-get update
   
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

5. 安装指定的版本：(可选)

   ```shell
   $ apt-cache madison docker-ce
   
     docker-ce | 5:18.09.1~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
     docker-ce | 5:18.09.0~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
     docker-ce | 18.06.1~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
     docker-ce | 18.06.0~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
     ...
   ```

   安装格式：

   ```shell
   $ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
   ```

   举例说明：比如要安装`5:18.09.1~3-0~ubuntu-xenial`版本的docker的话：

   ```shell
   $ sudo apt-get install docker-ce=18.09.1 docker-ce-cli=18.09.1 containerd.io
   ```

1. 启动服务并测试：

   ```shell
   $ sudo service docker start
   
   # 查看Docker运行状态
   $ sudo service docker status
   
   $ sudo docker run hello-world
   ```

## Docker-compose集合命令

Compose工具是一个`批量`工具，用于运行与管理多个`docker`容器。

官方文档：[Install Docker Compose](https://docs.docker.com/compose/install/)

1. 在Mac/Windows中，已经集成了docker-compose命令

2. 在WindowsServer中
   先启动PowerShell

   ```powershell
   [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
   ```

   然后运行如下命令：

   ```powershell
   Invoke-WebRequest "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-Windows-x86_64.exe" -UseBasicParsing -OutFile $Env:ProgramFiles\Docker\docker-compose.exe
   ```

   然后测试一下：`docker-compose --version`

3. Linux中：

   ```shell
   # 下载docker-compose
   sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   
   # 给予执行权限
   sudo chmod +x /usr/local/bin/docker-compose
   
   # 测试命令
   $ docker-compose --version
   docker-compose version 1.23.2, build 1110ad01
   ```

### docker-compose的简单使用

先找到一个目录例如 `/home`,编辑docker-compose.yml 文件 （没有该文件新建一个），按照 yamL 语法在文件中添加 你需要管理的 服务 ，这里以  两个 mysql 为例

```yaml
version: "3"
services:
  mysql1:
    image: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    ports:
      - 28002:3306

  mysql2:
    image: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    ports:
      - 28003:3306
```

编辑好`docker-compose.yml`文件后 保存后退出，使用 `docker-compose up`命令去更新 docker-compose服务

```shell
[root@VM_0_6_centos home]# ^C
[root@VM_0_6_centos home]# vi docker-compose.yml 
[root@VM_0_6_centos home]# docker-compose up     
Creating network "home_default" with the default driver
Pulling mysql1 (mysql:)...
latest: Pulling from library/mysql
80369df48736: Pull complete
e8f52315cb10: Pull complete
cf2189b391fc: Pull complete
cc98f645c682: Pull complete
27a27ac83f74: Pull complete
fa1f04453414: Pull complete
d45bf7d22d33: Pull complete
3dbac26e409c: Pull complete
9017140fb8c1: Pull complete
b76dda2673ae: Pull complete
bea9eb46d12a: Pull complete
e1f050a38d0f: Pull complete
Pulling mysql2 (mysql:)...
latest: Pulling from library/mysql
Creating home_mysql2_1 ... done
Creating home_mysql1_1 ... done
Attaching to home_mysql1_1, home_mysql2_1
...
```

使用 docker ps 查看docker 容器 ,可以看到 docker-compose.yml 中添加的两个服务镜像 已经 在运行中

```shell
-rw-r--r-- 1 root root 259 Nov 21 07:09 docker-compose.yml
[root@VM_0_6_centos home]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                NAMES
2c5b3fc20ee8        mysql               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        33060/tcp, 0.0.0.0:28002->3306/tcp   home_mysql1_1
0d97c8d6cfb3        mysql               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        33060/tcp, 0.0.0.0:28003->3306/tcp   home_mysql2_1
[root@VM_0_6_centos home]# 
```

docker-compose 和 docker 一样 也有 `run`,`start`,`stop`,`rm`等命令

```shell
[root@VM_0_6_centos home]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                NAMES
2c5b3fc20ee8        mysql               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        33060/tcp, 0.0.0.0:28002->3306/tcp   home_mysql1_1
0d97c8d6cfb3        mysql               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        33060/tcp, 0.0.0.0:28003->3306/tcp   home_mysql2_1
[root@VM_0_6_centos home]# 
[root@VM_0_6_centos home]# 
[root@VM_0_6_centos home]# 
[root@VM_0_6_centos home]# docker-compose stop
Stopping home_mysql1_1 ... done
Stopping home_mysql2_1 ... done
[root@VM_0_6_centos home]# docker-compose rm
Going to remove home_mysql1_1, home_mysql2_1
Are you sure? [yN] y
Removing home_mysql1_1 ... done
Removing home_mysql2_1 ... done
[root@VM_0_6_centos home]# 
```

### docker-compose.yml 文件 属性 详解

#### version 

作用：指定docker-Egine 的版本,指定 docker-compose.yml 文件的写法格式

哪些Compose文件版本支持特定的Docker版本 

| **Compose file format（）** | **Docker Engine release** |
| :-------------------------- | :------------------------ |
| 3.7                         | 18.06.0+                  |
| 3.6                         | 18.02.0+                  |
| 3.5                         | 17.12.0+                  |
| 3.4                         | 17.09.0+                  |
| 3.3                         | 17.06.0+                  |
| 3.2                         | 17.04.0+                  |
| 3.1                         | 1.13.1+                   |
| 3.0                         | 1.13.0+                   |
| 2.4                         | 17.12.0+                  |
| 2.3                         | 17.06.0+                  |
| 2.2                         | 1.13.0+                   |
| 2.1                         | 1.12.0+                   |
| 2.0                         | 1.10.0+                   |
| 1.0                         | 1.9.1.+                   |

[官网提供的一个 version:3 的 案例]( https://docs.docker.com/compose/compose-file/ )

example Compose file version 3 

```yaml
version: "3.7"
services:

  redis:
    image: redis:alpine
    ports:
      - "6379"
    networks:
      - frontend
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints: [node.role == manager]

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure

  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - "5001:80"
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints: [node.role == manager]

networks:
  frontend:
  backend:

volumes:
  db-data:
```

#### services

多个容器集合

定义 本工程 的 服务列表 ，包含 应用于该服务启动的每个容器的配置 

#### build

配置构建时，Compose 会利用它自动构建镜像，该值可以是一个路径，也可以是一个对象，用于指定 Dockerfile 参数

```yaml
build: ./dir

# or

build:
    context: ./dir
    dockerfile: Dockerfile
    args:
        buildno: 1
```

####  **command**

覆盖容器启动后默认执行的命令

```yaml
command: bundle exec thin -p 3000

# 或者

command: [bundle,exec,thin,-p,3000]
```

#### dns

配置 dns 服务器，可以是一个值或列表

```yml
dns: 8.8.8.8

或者

dns: - 8.8.8.8
     - 9.9.9.9
```

#### dns_search

配置 DNS 搜索域，可以是一个值或列表

```yaml
dns_search: example.com

或者

dns_search: - dc1.example.com
    		- dc2.example.com
```

#### environment

环境变量配置，可以用数组或字典两种方式

```yaml
environment:
    RACK_ENV: development
    SHOW: 'ture'
    
或者
    
environment:
    - RACK_ENV=development
    - SHOW=ture
```

#### env_file

从文件中获取环境变量，可以指定一个文件路径或路径列表，其优先级低于 environment 指定的环境变量

```yaml
env_file: .env

或者

env_file:
    - ./common.env
```

#### expose

暴露端口，只将端口暴露给连接的服务，而不暴露给主机

```yaml
expose:
    - "3000"
    - "8000"
```

#### image

指定服务所使用的镜像

```yaml
image: java
```

#### network_mode

设置网络模式

```yaml
network_mode: "bridge"
# or
network_mode: "host"
# or
network_mode: "none"
# or
network_mode: "service:[service name]"
# or
network_mode: "container:[container name/id]"
```

#### ports

对外暴露的端口定义，和 expose 对应

```yaml
ports:   # 暴露端口信息  - "宿主机端口:容器暴露端口"- "8763:8763"- "8763:8763"
```

#### links

将指定容器连接到当前连接，可以设置别名，避免ip方式导致的容器重启动态改变的无法连接情况

```yaml
links:    # 指定服务名称:别名 
    - docker-compose-eureka-server:compose-eureka
```

#### volumes

卷挂载路径

```yaml
volumes:
  - /lib
  - /var
```

#### logs

日志输出信息

```yaml
--no-color          单色输出，不显示其他颜.
-f, --follow        跟踪日志输出，就是可以实时查看日志
-t, --timestamps    显示时间戳
--tail              从日志的结尾显示，--tail=200
```

## Docker 仓库

[公共  仓库 docker-hub]( https://hub.docker.com/ )

在 docker-hub 上注册一个账号

![1574292427391](F:\myfiles\学习\share\札记\Docker入门之安装教程\Docker入门之安装教程.assets\1574292427391.png)

这里可以看到 自己创建上传的镜像



然后 在安装 docker 的 主机上登录 docker-hub 账号

```shell
[root@VM_0_6_centos home]# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: pigk^Hjoe^H^H^H^H^H
Password: 
Error response from daemon: Get https://registry-1.docker.io/v2/: unauthorized: incorrect username or password
[root@VM_0_6_centos home]# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: pigjoe
Password: 
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
[root@VM_0_6_centos home]# 
```

### 提交镜像

- 1. commit 镜像打tag

```shell
$ docker commit 容器id(container id) dockerhub用户名/镜像名称：镜像tag
```

例如 提交 mysql 容器（打tag）

```shell
$ docker commit d68f1d62a0f2 pigjoe/mysql:1.0
```

- 使用 `docker image` 命令 查看 镜像 

```shell
$ docker image
```

- push 要 上传的 镜像

```
$ docker push 上传的镜像
```



```shell
[root@VM_0_6_centos home]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@VM_0_6_centos home]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS               NAMES
d68f1d62a0f2        mysql               "docker-entrypoint.s…"   57 seconds ago      Exited (0) 19 seconds ago                       home_mysql2_1
37fd5e41efed        mysql               "docker-entrypoint.s…"   57 seconds ago      Exited (0) 19 seconds ago                       home_mysql1_1
[root@VM_0_6_centos home]# docker-compose stop
[root@VM_0_6_centos home]# docker-compose start
Starting mysql1 ... done
Starting mysql2 ... done
[root@VM_0_6_centos home]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                                NAMES
d68f1d62a0f2        mysql               "docker-entrypoint.s…"   About a minute ago   Up 5 seconds        33060/tcp, 0.0.0.0:28003->3306/tcp   home_mysql2_1
37fd5e41efed        mysql               "docker-entrypoint.s…"   About a minute ago   Up 5 seconds        33060/tcp, 0.0.0.0:28002->3306/tcp   home_mysql1_1
[root@VM_0_6_centos home]# ^C
[root@VM_0_6_centos home]# docker commit d68f1d62a0f2 pigjoe/mysql:1.0
sha256:60eefadec7685120e9d1379a33d314d57c3d4152ad4066f00fd08f8c583258cd
[root@VM_0_6_centos home]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
pigjoe/mysql        1.0                 60eefadec768        16 seconds ago      456MB
mysql               latest              c8ee894bd2bd        4 weeks ago         456MB
[root@VM_0_6_centos home]# docker push pigjoe/mysql
The push refers to repository [docker.io/pigjoe/mysql]
379b2ece0c61: Pushed 
d06c354a14f8: Mounted from library/mysql 
8521e29a77f7: Mounted from library/mysql 
b0a6c99eccba: Mounted from library/mysql 
a6dc48312854: Mounted from library/mysql 
5a2d7ca14b2f: Mounted from library/mysql 
13272fe0aa5c: Mounted from library/mysql 
ca3e8d7fe261: Mounted from library/mysql 
452ea71a57ff: Mounted from library/mysql 
d8cb0457f31e: Mounted from library/mysql 
3c353031df8b: Mounted from library/mysql 
096401f81d2c: Mounted from library/mysql 
67ecfc9591c8: Mounted from library/mysql 
1.0: digest: sha256:5f98a8fd74670280fc60d04fbdf2b3b773db93e42ffd8977cac3713019c444ee size: 3035
[root@VM_0_6_centos home]# 
```

![1574293713434](F:\myfiles\学习\share\札记\Docker入门之安装教程\Docker入门之安装教程.assets\1574293713434.png)



登录 docker-hub 就可以 看到 刚才提交的 镜像

### 拉取镜像

如果想从 docker-hub 上拉取镜像

使用 docker pull 命令

例如拉取 刚才提交的 镜像

```shell
$ docker pull pigjoe/mysql:1.0
```

![1574294028251](F:\myfiles\学习\share\札记\Docker入门之安装教程\Docker入门之安装教程.assets\1574294028251.png)



![1574293983732](F:\myfiles\学习\share\札记\Docker入门之安装教程\Docker入门之安装教程.assets\1574293983732.png)

这里因为本地 已经存在 该镜像，所以 只是 更新 该镜像