

# 使用Docker,Docker-compose 快速 搭建Gitlab

> ** gitlab 至少需要2核2G的配置 **

## Docker 搭建 gitlab

[官方安装文档](  https://docs.gitlab.com/omnibus/docker/README.html  ) 

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





## 使用 docker-compose 来安装 Gitlab

### 1、先删除 上面 安装的 Gitlab

- `docker ps` 或者 `docker ps -a`

```shell
[root@VM_0_6_centos ~]# docker ps -a
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                PORTS                                                   NAMES
0308ae838507        gitlab/gitlab-ce:latest   "/assets/wrapper"        6 days ago          Up 6 days (healthy)   443/tcp, 0.0.0.0:13822->22/tcp, 0.0.0.0:13800->80/tcp   gitlab_test
d68f1d62a0f2        mysql                     "docker-entrypoint.s…"   6 days ago          Up 6 days             33060/tcp, 0.0.0.0:28003->3306/tcp                      home_mysql2_1
37fd5e41efed        mysql
```

- 停止 Gitlab_test 镜像：`docker stop gitlab_test`

- 删除 gitlab_test 镜像： docker rm gitlab_test

### 2、创建编辑 docker-compose.yml 文件

>  **前提是 已安装好  docker-compose **

- 进入 到 某个目录（自定义）
- 创建或编辑已有的 docker-compose.yml 文件

```yaml
# docker-compose.yml

web:
  image: 'gitlab/gitlab-ce:latest'
  restart: always
  hostname: '122.51.167.54'
  environment:
    GITLAB_OMNIBUS_CONFIG: |
      external_url 'http://122.51.167.54'
      # Add any other gitlab.rb configuration here, each on its own line
  ports:
    - '13800:80'
    - '13822:22'
  volumes:
    - '/srv/gitlab/config:/etc/gitlab'
    - '/srv/gitlab/logs:/var/log/gitlab'
    - '/srv/gitlab/data:/var/opt/gitlab'

```

- 保存退出后  运行 `docker-compose up -d`命令
- 之后 浏览器打开 122.51.167.54:13800 就可以访问 gitlab

### 附件：完整的 gitlab docker-compose 配置

```
version: "2"

services:
  redis:
    restart: always
    image: sameersbn/redis:4.0.9-2
    command:
      - --loglevel warning
    volumes:
      - redis-data:/temp/lib/redis:Z

  postgresql:
    restart: always
    image: sameersbn/postgresql:10-2
    volumes:
      - postgresql-data:/temp/lib/postgresql:Z
    environment:
      - DB_USER=gitlab
      - DB_PASS=password
      - DB_NAME=gitlabhq_production
      - DB_EXTENSION=pg_trgm

  gitlab:
    restart: always
    image: sameersbn/gitlab:12.4.3
    depends_on:
      - redis
      - postgresql
    ports:
      - "13800:80"
      - "13822:22"
    volumes:
      - gitlab-data:/temp/git/data:Z
    environment:
      - DEBUG=false

      - DB_ADAPTER=postgresql
      - DB_HOST=postgresql
      - DB_PORT=5432
      - DB_USER=gitlab
      - DB_PASS=password
      - DB_NAME=gitlabhq_production

      - REDIS_HOST=redis
      - REDIS_PORT=6379

      - TZ=Asia/Kolkata
      - GITLAB_TIMEZONE=Kolkata

      - GITLAB_HTTPS=true
      - SSL_SELF_SIGNED=true

      - GITLAB_HOST=122.51.167.54
      - GITLAB_PORT=13800
      - GITLAB_SSH_PORT=13822
      - GITLAB_RELATIVE_URL_ROOT=
      - GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alphanumeric-string
      - GITLAB_SECRETS_SECRET_KEY_BASE=long-and-random-alphanumeric-string
      - GITLAB_SECRETS_OTP_KEY_BASE=long-and-random-alphanumeric-string

      - GITLAB_ROOT_PASSWORD=12345678
      - GITLAB_ROOT_EMAIL=qiaoxinhen@sina.com

      - GITLAB_NOTIFY_ON_BROKEN_BUILDS=true
      - GITLAB_NOTIFY_PUSHER=false

      - GITLAB_EMAIL=notifications@example.com
      - GITLAB_EMAIL_REPLY_TO=noreply@example.com
      - GITLAB_INCOMING_EMAIL_ADDRESS=reply@example.com

      - GITLAB_BACKUP_SCHEDULE=daily
      - GITLAB_BACKUP_TIME=01:00

      - SMTP_ENABLED=false
      - SMTP_DOMAIN=www.example.com
      - SMTP_HOST=smtp.gmail.com
      - SMTP_PORT=587
      - SMTP_USER=mailer@example.com
      - SMTP_PASS=password
      - SMTP_STARTTLS=true
      - SMTP_AUTHENTICATION=login

      - IMAP_ENABLED=false
      - IMAP_HOST=imap.gmail.com
      - IMAP_PORT=993
      - IMAP_USER=mailer@example.com
      - IMAP_PASS=password
      - IMAP_SSL=true
      - IMAP_STARTTLS=false

      - OAUTH_ENABLED=false
      - OAUTH_AUTO_SIGN_IN_WITH_PROVIDER=
      - OAUTH_ALLOW_SSO=
      - OAUTH_BLOCK_AUTO_CREATED_USERS=true
      - OAUTH_AUTO_LINK_LDAP_USER=false
      - OAUTH_AUTO_LINK_SAML_USER=false
      - OAUTH_EXTERNAL_PROVIDERS=

      - OAUTH_CAS3_LABEL=cas3
      - OAUTH_CAS3_SERVER=
      - OAUTH_CAS3_DISABLE_SSL_VERIFICATION=false
      - OAUTH_CAS3_LOGIN_URL=/cas/login
      - OAUTH_CAS3_VALIDATE_URL=/cas/p3/serviceValidate
      - OAUTH_CAS3_LOGOUT_URL=/cas/logout

      - OAUTH_GOOGLE_API_KEY=
      - OAUTH_GOOGLE_APP_SECRET=
      - OAUTH_GOOGLE_RESTRICT_DOMAIN=

      - OAUTH_FACEBOOK_API_KEY=
      - OAUTH_FACEBOOK_APP_SECRET=

      - OAUTH_TWITTER_API_KEY=
      - OAUTH_TWITTER_APP_SECRET=

      - OAUTH_GITHUB_API_KEY=
      - OAUTH_GITHUB_APP_SECRET=
      - OAUTH_GITHUB_URL=
      - OAUTH_GITHUB_VERIFY_SSL=

      - OAUTH_GITLAB_API_KEY=
      - OAUTH_GITLAB_APP_SECRET=

      - OAUTH_BITBUCKET_API_KEY=
      - OAUTH_BITBUCKET_APP_SECRET=

      - OAUTH_SAML_ASSERTION_CONSUMER_SERVICE_URL=
      - OAUTH_SAML_IDP_CERT_FINGERPRINT=
      - OAUTH_SAML_IDP_SSO_TARGET_URL=
      - OAUTH_SAML_ISSUER=
      - OAUTH_SAML_LABEL="Our SAML Provider"
      - OAUTH_SAML_NAME_IDENTIFIER_FORMAT=urn:oasis:names:tc:SAML:2.0:nameid-format:transient
      - OAUTH_SAML_GROUPS_ATTRIBUTE=
      - OAUTH_SAML_EXTERNAL_GROUPS=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_EMAIL=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_NAME=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_USERNAME=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_FIRST_NAME=
      - OAUTH_SAML_ATTRIBUTE_STATEMENTS_LAST_NAME=

      - OAUTH_CROWD_SERVER_URL=
      - OAUTH_CROWD_APP_NAME=
      - OAUTH_CROWD_APP_PASSWORD=

      - OAUTH_AUTH0_CLIENT_ID=
      - OAUTH_AUTH0_CLIENT_SECRET=
      - OAUTH_AUTH0_DOMAIN=
      - OAUTH_AUTH0_SCOPE=

      - OAUTH_AZURE_API_KEY=
      - OAUTH_AZURE_API_SECRET=
      - OAUTH_AZURE_TENANT_ID=

volumes:
  redis-data:
  postgresql-data:
  gitlab-data:

```

<Vssue title="Vssue Demo" />