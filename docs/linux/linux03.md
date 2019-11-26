# 使用Docker,Docker-compose 快速 搭建Gitlab

> ** gitlab 至少需要2核2G的配置 **

## Docker 搭建 gitlab

[官方安装文档]( https://docs.gitlab.com/omnibus/docker/ ) 

官方文档 给出的搭建 gitlab命令只有下面这条命令：

```shell
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

- --detach ： 跟 -d 参数 相同，表示  后台 运行
- --hostname:  主机域名（没有域名 可有 直接写 ip，有域名的
- -- publish:  标识使用开放的端口  443 一般是 https 端口，80端口一般是 默认的访问端口，22 是 克隆需要访问的端口，（一般 ssh 走的也是 22端口，直接走22 端口 容易 被攻击）
- --name:  镜像名称
- --restart:  docker 服务重启的时候 ，gitlab服务也自动重启
- --volume:  将 gitlab 上的一些数据和日志 配置 映射到 宿主机上

但在这里，我们不采用默认的配置，修改一些配置，所有

将上面的命令 复制 修改成 下面的样式，然后运行下面的命令：

```shell
sudo docker run --detach \
  --hostname ***.**.**.** \
  --publish 13800:80 --publish 13822:22 \
  --name gitlab_test \
  --restart always \
  gitlab/gitlab-ce:latest
```

运行命令 结果如下：

```shell
[root@VM_0_6_centos ~]# sudo docker run --detach \
>   --hostname 宿主机的ip \
>   --publish 13800:80 --publish 13822:22 \
>   --name gitlab_test \
>   --restart always \
>   gitlab/gitlab-ce:latest
Unable to find image 'gitlab/gitlab-ce:latest' locally
latest: Pulling from gitlab/gitlab-ce
e80174c8b43b: Pull complete 
d1072db285cc: Pull complete 
858453671e67: Pull complete 
3d07b1124f98: Pull complete 
43d9dea843dd: Pull complete 
cab5a34e8fb7: Pull complete 
635509edca6d: Pull complete 
f91b4dfa0ce0: Pull complete 
a3ea8e47245c: Pull complete 
e6ad628e595f: Pull complete 
Digest: sha256:bbd8d61fbf66321e454225001e67ff5bf19ef9f64c1f26210ea4479130cc4e5d
Status: Downloaded newer image for gitlab/gitlab-ce:latest
0308ae8385076c8be779d1e2e1d61a0565e8a0d10443b2a8a6280a977794e325
[root@VM_0_6_centos ~]# 
[root@VM_0_6_centos ~]# 
[root@VM_0_6_centos ~]# 
[root@VM_0_6_centos ~]# 
[root@VM_0_6_centos ~]# docker ps
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                    PORTS                                                   NAMES
0308ae838507        gitlab/gitlab-ce:latest   "/assets/wrapper"        49 minutes ago      Up 49 minutes (healthy)   443/tcp, 0.0.0.0:13822->22/tcp, 0.0.0.0:13800->80/tcp   gitlab_test
d68f1d62a0f2        mysql                     "docker-entrypoint.s…"   About an hour ago   Up About an hour          33060/tcp, 0.0.0.0:28003->3306/tcp                      home_mysql2_1
37fd5e41efed        mysql                     "docker-entrypoint.s…"   About an hour ago   Up About an hour          33060/tcp, 0.0.0.0:28002->3306/tcp                      home_mysql1_1
[root@VM_0_6_centos ~]# docker ps |grep gitlab_test
0308ae838507        gitlab/gitlab-ce:latest   "/assets/wrapper"        50 minutes ago      Up 50 minutes (healthy)   443/tcp, 0.0.0.0:13822->22/tcp, 0.0.0.0:13800->80/tcp   gitlab_test
[root@VM_0_6_centos ~]# 
```



然后 开放 防火墙 13800 对外端口

```shell
firewall-cmd --add-port=13800/tcp --permanent
```

打印 docker 日志

```shell
docker logs -f gitlab_test
```

[gitlab访问]（ http://122.51.167.54:13800/ ）

