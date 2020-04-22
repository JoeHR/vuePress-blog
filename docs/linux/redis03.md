## 安装 redis npm依赖

```shell
npm i redis
```

node 集成 redis

```js
const redis = require("redis");
const client = redis.createClient({
	host:'xxx.xxx.xxx.xxx',
	port:15001,
	password:'123456',
	detect_buffers:true,
	retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});

client.set("hello", "world", function(err) {
  // This will either result in an error (flush parameter is set to true)
  // or will silently fail and this callback will not be called at all (flush set to false)
  console.error(err);
});

// No further commands will be processed
client.end(true);

client.get("hello", function(err) {
  console.error(err); // => 'The connection has already been closed.'
});

```

