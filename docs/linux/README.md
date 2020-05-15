# 查看系统命令

## 查看 linux 系统发行版本 和内核

```
lsb_release -a
```



## 查看内核版本

```
uname -a
```

## 查看端口是否正常被监听
```shell
netstat -an | grep 监听端口

netstat -an | grep 80
```

## 查看公网Ip

curl https://ip.cn ： 查看 公网 ip

curl cip.cc

curl ifconfig.me



## 防火墙

### 查看 firewall 服务状态

```
systemctl status firewalld
```

- 出现Active: active (running)切高亮显示则表示是启动状态。
- 出现 Active: inactive (dead)灰色表示停止，看单词也行。

###  查看firewall的状态 

```
firewall-cmd --state
```

###  开启、重启、关闭、firewalld.service服务 

- 开启

  ```
  service firewalld start
  ```

  

- 重启

  ```
  service firewalld restart
  ```

  

- 关闭

  ```
  service firewalld stop
  ```

  

### 查看防火墙规则

```
firewall-cmd --list-all
```

- 查看8080端口是否开放

  ```
  firewall-cmd --query-port=8080/tcp
  ```

- 开放80端口

  ```
  firewall-cmd --permanent --add-port=80/tcp
  ```

- 移除8080端口

  ```
  firewall-cmd --permanent --remove-port=8080/tcp
  ```

- 重启防火墙(修改配置后要重启防火墙) 

  ```
  firewall-cmd --reload
  ```

  <Vssue title="Vssue Demo" />