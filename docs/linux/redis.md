## 相关概念

Redis 是完全开源免费的，遵守BSD 开源许可协议，是一个高性能的 `key-value` 数据库

Redis 与其他 `key-value`缓存产品相比：支持数据的持久化，多数据结构list、set、zset、hash 等的存储，支持数据备份，支持事务，数据的原子性（要么不做要么全做）

应用场景：缓存（读写性能优异），计数&消息系统（高并发、发布/订阅阻塞队列功能），分布式会话session & 分布式锁（秒杀场景）

| 分类            | Redis      | Mongo                    |
| --------------- | ---------- | ------------------------ |
| 存储方式        | key-value  | document                 |
| 使用方式&可靠性 |            | sql &完整的ACID 事务支持 |
| 应用场景        | 高性能缓存 | 海量数据分析             |

## 安装和使用

安装方法一： [redis](https://redis.io/download) 官网下载源码安装

安装方法二： [redis dowload](https://redis.io/download)页面 有  docker 安装 redis 的连接

编写 docker-compose.yml

```yml
version: '3'
services:
  redis-test:
    image: 'redis'
    restart: always
    container_name: 'redis-test'
    ports:
      - 15001:6379
    volumes:
      - /home/redistest:/data
    command: ['redis-server', '--requirepass', '123456']

```

上传docker-compose.yml 到 /home/redistest 目录,然后运行下面命令即可安装运行  redis 镜像

```shell
docker-compose up -d
```

上面的步骤也可以直接用一句命令代替运行：

```shell
docker run -itd --restart=always --name redis-test -p 15001:6379 -v /home/redistest:/data redis redis-server --requirepass 123456
```

使用下列命令 查看 运行 日志

```shell
docker logs -f redis-test
```

:::warning

放置在公网访问的redis服务需要考虑几点：1. 防火墙规则有没有放行，运营商的防火墙有没有放行 2. bind的IP需要设置成为0.0.0.0，才能让其他所有的服务访问的到（不过这样做也不太安全，需要设置密码），最好是绑定到指定的IP，并设置访问密码

:::

安装方法3:

去 github上下载 redis.conf
[redis.conf链接地址](https://github.com/redis/redis/blob/6.0.10/redis.conf)

将 redis.conf 拷贝道 /home/myredisconf 目录下
并修改三处

- 注释掉 `bind 127.0.0.1`
- 将`protected-mode` 改成 `no` 关闭
- 将 `appendonly` 改成 `yes`

```
# bind 127.0.0.1
protected-mode no
appendonly yes
```

然后执行下列命令
```shell
docker run -p 6379:6379 --privileged=true --name redis -v /home/myredisconf/redis.conf:/root/redis/redis.conf  -v /home/myredis:/data   -d --restart=always  redis:latest redis-server --appendonly yes
```

如果出现了 docker redis WARNING: IPv4 forwarding is disabled. Networking will not work. 错误，那么我们需要配置系统的/etc/sysctl.conf

```shell

vi /etc/sysctl.conf

net.ipv4.ip_forward = 1  # 添加这段代码

systemctl restart network && systemctl restart docker  # 重启network服务 和 docker

sysctl net.ipv4.ip_forward # 查看是否修改成功（备注：返回1 就是成功）

```

## Redis Cli

[redis 命令参考](http://doc.redisfans.com/)

[redis 命令参考](http://redisdoc.com/)

常见的命令：

设置/取值 （String,Hash,List,Set）

进入 redis-cli

```shell
docker exec -it redis-test redis-cli

# 或者 分两步进行也可以

docker exec -it redis-test /bin/bash

redis-cli
```

### connection 连接

:::info

redis登录的两种方式：

比如redis运行在本机，密码是123456

命令行的方式：redis-cli -h 127.0.0.1 -a 123456，

使用命令行进入redis交互终端，redis-cli，然后再使用auth 123456进行登录。

:::

**AUTH password**

通过设置配置文件中 `requirepass` 项的值(使用命令 `CONFIG SET requirepass password` )，可以使用密码来保护 Redis 服务器。

如果开启了密码保护的话，在每次连接 Redis 服务器之后，就要使用 `AUTH` 命令解锁，解锁之后才能使用其他 Redis 命令。

如果 `AUTH` 命令给定的密码 `password` 和配置文件中的密码相符的话，服务器会返回 `OK` 并开始接受命令输入。

另一方面，假如密码不匹配的话，服务器将返回一个错误，并要求客户端需重新输入密码。

```she
auth 123456
```

```shell
# 设置密码

redis> CONFIG SET requirepass secret_password   # 将密码设置为 secret_password
OK

redis> QUIT                                     # 退出再连接，让新密码对客户端生效

[huangz@mypad]$ redis

redis> PING                                     # 未验证密码，操作被拒绝
(error) ERR operation not permitted

redis> AUTH wrong_password_testing              # 尝试输入错误的密码
(error) ERR invalid password

redis> AUTH secret_password                     # 输入正确的密码
OK

redis> PING                                     # 密码验证成功，可以正常操作命令了
PONG


# 清空密码

redis> CONFIG SET requirepass ""   # 通过将密码设为空字符来清空密码
OK

redis> QUIT
```

**ECHO message**

打印一个特定的信息 `message` ，测试时使用。

```shell
redis> ECHO "Hello Moto"
"Hello Moto"

redis> ECHO "Goodbye Moto"
"Goodbye Moto"
```

**PING**

使用客户端向 Redis 服务器发送一个 `PING` ，如果服务器运作正常的话，会返回一个 `PONG` 。

通常用于测试与服务器的连接是否仍然生效，或者用于测量延迟值。

```shell
# 客户端和服务器连接正常

redis> PING
PONG

# 客户端和服务器连接不正常(网络不正常或服务器未能正常运行)

redis 127.0.0.1:6379> PING
Could not connect to Redis at 127.0.0.1:6379: Connection refused
```

**QUIT**

请求服务器关闭与当前客户端的连接。

一旦所有等待中的回复(如果有的话)顺利写入到客户端，连接就会被关闭。

```shell
$ redis

redis> QUIT

$
```

**SELECT index**

切换到指定的数据库，数据库索引号 `index` 用数字值指定，以 `0` 作为起始索引值。

默认使用 `0` 号数据库。

```shell
redis> SET db_number 0         # 默认使用 0 号数据库
OK

redis> SELECT 1                # 使用 1 号数据库
OK

redis[1]> GET db_number        # 已经切换到 1 号数据库，注意 Redis 现在的命令提示符多了个 [1]
(nil)

redis[1]> SET db_number 1
OK

redis[1]> GET db_number
"1"

redis[1]> SELECT 3             # 再切换到 3 号数据库
OK

redis[3]>                      # 提示符从 [1] 改变成了 [3]
```

### String

SET key value [EX seconds] [PX milliseconds] [NX|XX]**

将字符串值 `value` 关联到 `key` 。

如果 `key` 已经持有其他值， [SET](http://doc.redisfans.com/string/set.html#set) 就覆写旧值，无视类型。

对于某个原本带有生存时间（TTL）的键来说， 当 [*SET*](http://doc.redisfans.com/string/set.html#set) 命令成功在这个键上执行时， 这个键原有的 TTL 将被清除。

从 Redis 2.6.12 版本开始， [*SET*](http://doc.redisfans.com/string/set.html#set) 命令的行为可以通过一系列参数来修改：

- `EX second` ：设置键的过期时间为 `second` 秒。 `SET key value EX second` 效果等同于 `SETEX key second value` 。
- `PX millisecond` ：设置键的过期时间为 `millisecond` 毫秒。 `SET key value PX millisecond` 效果等同于 `PSETEX key millisecond value` 。
- `NX` ：只在键不存在时，才对键进行设置操作。 `SET key value NX` 效果等同于 `SETNX key value` 。
- `XX` ：只在键已经存在时，才对键进行设置操作。

```shell
# 对不存在的键进行设置

redis 127.0.0.1:6379> SET key "value"
OK

redis 127.0.0.1:6379> GET key
"value"


# 对已存在的键进行设置

redis 127.0.0.1:6379> SET key "new-value"
OK

redis 127.0.0.1:6379> GET key
"new-value"


# 使用 EX 选项

redis 127.0.0.1:6379> SET key-with-expire-time "hello" EX 10086
OK

redis 127.0.0.1:6379> GET key-with-expire-time
"hello"

redis 127.0.0.1:6379> TTL key-with-expire-time
(integer) 10069


# 使用 PX 选项

redis 127.0.0.1:6379> SET key-with-pexpire-time "moto" PX 123321
OK

redis 127.0.0.1:6379> GET key-with-pexpire-time
"moto"

redis 127.0.0.1:6379> PTTL key-with-pexpire-time
(integer) 111939


# 使用 NX 选项

redis 127.0.0.1:6379> SET not-exists-key "value" NX
OK      # 键不存在，设置成功

redis 127.0.0.1:6379> GET not-exists-key
"value"

redis 127.0.0.1:6379> SET not-exists-key "new-value" NX
(nil)   # 键已经存在，设置失败

redis 127.0.0.1:6379> GEt not-exists-key
"value" # 维持原值不变


# 使用 XX 选项

redis 127.0.0.1:6379> EXISTS exists-key
(integer) 0

redis 127.0.0.1:6379> SET exists-key "value" XX
(nil)   # 因为键不存在，设置失败

redis 127.0.0.1:6379> SET exists-key "value"
OK      # 先给键设置一个值

redis 127.0.0.1:6379> SET exists-key "new-value" XX
OK      # 设置新值成功

redis 127.0.0.1:6379> GET exists-key
"new-value"


# NX 或 XX 可以和 EX 或者 PX 组合使用

redis 127.0.0.1:6379> SET key-with-expire-and-NX "hello" EX 10086 NX
OK

redis 127.0.0.1:6379> GET key-with-expire-and-NX
"hello"

redis 127.0.0.1:6379> TTL key-with-expire-and-NX
(integer) 10063

redis 127.0.0.1:6379> SET key-with-pexpire-and-XX "old value"
OK

redis 127.0.0.1:6379> SET key-with-pexpire-and-XX "new value" PX 123321
OK

redis 127.0.0.1:6379> GET key-with-pexpire-and-XX
"new value"

redis 127.0.0.1:6379> PTTL key-with-pexpire-and-XX
(integer) 112999


# EX 和 PX 可以同时出现，但后面给出的选项会覆盖前面给出的选项

redis 127.0.0.1:6379> SET key "value" EX 1000 PX 5000000
OK

redis 127.0.0.1:6379> TTL key
(integer) 4993  # 这是 PX 参数设置的值

redis 127.0.0.1:6379> SET another-key "value" PX 5000000 EX 1000
OK

redis 127.0.0.1:6379> TTL another-key
(integer) 997   # 这是 EX 参数设置的值
```

**GET key**

返回 `key` 所关联的字符串值。

如果 `key` 不存在那么返回特殊值 `nil` 。

假如 `key` 储存的值不是字符串类型，返回一个错误，因为 [GET](http://doc.redisfans.com/string/get.html#get) 只能用于处理字符串值。

```shell
# 对不存在的 key 或字符串类型 key 进行 GET

redis> GET db
(nil)

redis> SET db redis
OK

redis> GET db
"redis"


# 对不是字符串类型的 key 进行 GET

redis> DEL db
(integer) 1

redis> LPUSH db redis mongodb mysql
(integer) 3

redis> GET db
(error) ERR Operation against a key holding the wrong kind of value
```

### Key

**KEYS pattern**

`KEYS *` 匹配数据库中所有 `key` 。

`KEYS h?llo` 匹配 `hello` ， `hallo` 和 `hxllo` 等。

`KEYS h*llo` 匹配 `hllo` 和 `heeeeello` 等。

`KEYS h[ae]llo` 匹配 `hello` 和 `hallo` ，但不匹配 `hillo` 。

特殊符号用 `\` 隔开

:::warning

[KEYS](http://doc.redisfans.com/key/keys.html#keys) 的速度非常快，但在一个大的数据库中使用它仍然可能造成性能问题，如果你需要从一个数据集中查找特定的 `key` ，你最好还是用 Redis 的集合结构(set)来代替。

:::

```shell
redis> MSET one 1 two 2 three 3 four 4  # 一次设置 4 个 key
OK

redis> KEYS *o*
1) "four"
2) "two"
3) "one"

redis> KEYS t??
1) "two"

redis> KEYS t[w]*
1) "two"

redis> KEYS *  # 匹配数据库内所有 key
1) "four"
2) "three"
3) "two"
4) "one"
```

### 哈希表 Hash

**HSET key field value**

将哈希表 `key` 中的域 `field` 的值设为 `value` 。

如果 `key` 不存在，一个新的哈希表被创建并进行 [HSET](http://doc.redisfans.com/hash/hset.html#hset) 操作。

如果域 `field` 已经存在于哈希表中，旧值将被覆盖。

```shell
redis> HSET website google "www.g.cn"       # 设置一个新域
(integer) 1

redis> HSET website google "www.google.com" # 覆盖一个旧域
(integer) 0
```

**HGET key field**

返回哈希表 `key` 中给定域 `field` 的值

```shell
# 域存在

redis> HSET site redis redis.com
(integer) 1

redis> HGET site redis
"redis.com"


# 域不存在

redis> HGET site mysql
(nil)
```

**HGETALL key**

返回哈希表 `key` 中，所有的域和值。

在返回值里，紧跟每个域名(field name)之后是域的值(value)，所以返回值的长度是哈希表大小的两倍。

```shell
redis> HSET people jack "Jack Sparrow"
(integer) 1

redis> HSET people gump "Forrest Gump"
(integer) 1

redis> HGETALL people
1) "jack"          # 域
2) "Jack Sparrow"  # 值
3) "gump"
4) "Forrest Gump"
```

**HMSET key field value [field value ...]**

同时将多个 `field-value` (域-值)对设置到哈希表 `key` 中。

此命令会覆盖哈希表中已存在的域。

如果 `key` 不存在，一个空哈希表被创建并执行 [HMSET](http://doc.redisfans.com/hash/hmset.html#hmset) 操作。

```shell
redis> HMSET website google www.google.com yahoo www.yahoo.com
OK

redis> HGET website google
"www.google.com"

redis> HGET website yahoo
"www.yahoo.com"
```

**HMGET key field [field ...]**

返回哈希表 `key` 中，一个或多个给定域的值。

如果给定的域不存在于哈希表，那么返回一个 `nil` 值。

因为不存在的 `key` 被当作一个空哈希表来处理，所以对一个不存在的 `key` 进行 [HMGET](http://doc.redisfans.com/hash/hmget.html#hmget) 操作将返回一个只带有 `nil` 值的表。

```shell
redis> HMSET pet dog "doudou" cat "nounou"    # 一次设置多个域
OK

redis> HMGET pet dog cat fake_pet             # 返回值的顺序和传入参数的顺序一样
1) "doudou"
2) "nounou"
3) (nil)                                      # 不存在的域返回nil值
```

### 列表 List

**LPOP key**: 移除并返回列表 `key` 的头元素。

**RPOP key**:移除并返回列表 `key` 的尾元素。

**LPUSH key value [value ...]**:将一个或多个值 `value` 插入到列表 `key` 的表头

**RPUSH key value [value ...]**:将一个或多个值 `value` 插入到列表 `key` 的表尾(最右边)。

## 配置 redis.conf , 缓存redis 数据（生产需要）
