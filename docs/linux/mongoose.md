## 核心概念

| 分类 | Oralce/Mysql   | MongoDB            | Mongoose                          |
| ---- | -------------- | ------------------ | --------------------------------- |
| 1    | 数据库实例     | MongoDB实例        | Mongoose                          |
| 2    | 模式（schema） | 数据库（database） | mongoose                          |
| 3    | 表（table）    | 集合（collection） | 模板（Schema）<br />模型（Model） |
| 4    | 行（row）      | 文档（document）   | 实例（instance）                  |
| 5    | Primary key    | Object(_id)        | Object(_id)                       |
| 6    | 表字段Column   | Field              | Field                             |

## 快速使用,node.js 集成

- 安装 mongoose

```shell
npm install -S mongoose
```

- 使用 mongoose 连接 mongodb

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://test:123456@localhost:27017/testdb',{useNewUrlParser: true,
  useUnifiedTopology: true,})

const db = mongoose.connection

db.on('error',console.error.bind(console,'connection error'))
db.once('open',()=>{console.log('we are connected!')})
```

- 使用 mongoose 插入数据

```js
//  创建 model 模型
const User = mongoose.model('users',{name:String,age:Number,email:String})

// 上面等价于
// const userSchema = new mongoose.Schema(name:String,age:Number,email:String})
// cost User = mongoose.model('users',userSchema)


// 创建实例
const testUser = new User({
    name:'test',
    age:30,
    email:"test@test.com"
})

// 保存实例插入 mongodb 数据库中
testUser.save().then(()=>{
    console.log('save Ok!')
})


```

