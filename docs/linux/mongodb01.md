## 安装

[mongodb安装]( https://docs.mongodb.com/manual/installation/  )

docker-compose 安装 mongodb

```yaml
# docker-compose.yml
# Use root/example as user/password credentials
version: '3.1'

services:

  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - 27017:27017
    volumes:
      - /home/mongotest:/data/db

  # mongo-express:
  #  image: mongo-express
  #  restart: always
  #  ports:
  #    - 8081:8081
  #  environment:
  #    ME_CONFIG_MONGODB_ADMINUSERNAME: root
  #    ME_CONFIG_MONGODB_ADMINPASSWORD: example
```

运行 `docker-compose up -d` 命令 即安装成功

```she
docker-compose up -d
```

<Vssue title="Vssue Demo" />