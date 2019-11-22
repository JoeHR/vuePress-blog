## 单元测试

顾名思义单元测试就是测试最小单元，我们的单元可能是一个函数，一个button的样式，一个文案等等都可能是一个单元。那么我们在做需求的时候没有必要将所有的单元都做测试，那可能测试代码要比需求代码多得多呢。我们在做需求之前需要提前想好我们的测试用例，并针对测试用例编写测试代码，然后写需求代码。

### 为什么做单元测试

做前端的很多人可能不会去写单元测试，认为这是一个浪费时间的事情，我们有这么多的需求，哪还有时间跟精力去编写测试代码？这么想当然没有错，但是当一个项目由多人一起维护的时候，假如A写了一个页面，B去维护A的页面加了一些逻辑，C去维护该页面再添加一些逻辑，当A再去维护这个页面的时候，可能就会发现已经不是当初他认识的代码了，函数也不是原来的语义，大部分的变量不知道干什么用的。那么A需要捋清楚B、C的逻辑，在B、C的基础上小心翼翼的编写新的需求，生怕哪一步写错，导致线上的代码出错。长此以往下去代码越来越难以维护，越来越少的人能看懂页面内的逻辑，糊墙试代码将页面堵得水泄不通！当然这是最坏的想法，我们不防往好的一方面来想，假如我们每个人的编码水平都很高，都按着规范去写代码，A写完代码，B去维护的时候将A的代码全部了解之后健壮了新的代码，C去维护的时候再把A、B的代码全部掌握后再去写代码，一个月，三个月。。。

所以依赖我们自觉去维护代码首先对我们个人能力有很大要求，其次对我们精力也是恨到的浪费。我们要时刻注意是否自己的代码影响到别人的代码。从长远考虑，单元测试是一个大型项目的必然选择。

我们讲的单元测试，只是测试代码的最小单元，一个函数就是一个单元，在这里我要提倡大家去学习一下函数式编程。

## mocha

使用 NPM 全局安装 ：

```js
npm install --global mocha
```

也可以作为项目的依赖进行安装

```js
npm install --save-dev mocha
```

>  安装mocha> = v3.0.0，`npm`的版本应该> = v2.14.2。除此，确保使用Node.js的版本> = v4来运行mocha 

### 测试脚本的编写



 `Mocha`的作用是运行测试脚本，首先必须学会写测试脚本。所谓"测试脚本"，就是用来测试源码的脚本。 

下面是一个 加法模块 `add.js `的代码

```
// add.js
function add(x,y){
	return x+y
}

module.exports = add
```

 要测试这个加法模块是否正确，就要写测试脚本。 

 通常，测试脚本与所要测试的源码脚本同名，但是后缀名为`.test.js`（表示测试）或者`.spec.js`（表示规格）。比如，`add.js`的测试脚本名字就是[`add.test.js`](https://github.com/ruanyf/mocha-demos/blob/master/demo01/add.test.js)。 

```
// add.test.js

var add = require('./add.js')
var expect = require('chai').expect

describe('测试 add 函数'，function(){
	it('1+1应该等于2',function(){
		expect(add(1,1)).to.be(2)
	})
})
```

上面这段代码，就是测试脚本，它可以独立执行。测试脚本里面应该包括一个或多个`describe`块，每个`describe`块应该包括一个或多个`it`块。

`describe`块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。

`it`块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。



### 断言库的用法

上面的测试脚本里面 ，有一句断言

```
expect（add(1,1)）.to.be.equal(2)
```

所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用`add(1, 1)`，结果应该等于2。

所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。

```
var expect = require('chai').expect;
```

 断言库有很多种，Mocha并不限制使用哪一种。上面代码引入的断言库是[`chai`](http://chaijs.com/)，并且指定使用它的[`expect`](http://chaijs.com/api/bdd/)断言风格。 

 `expect`断言的优点是很接近自然语言，下面是一些例子。 

```
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```

基本上，`expect`断言的写法都是一样的。头部是`expect`方法，尾部是断言方法，比如`equal`、`a`/`an`、`ok`、`match`等。两者之间使用`to`或`to.be`连接。

如果`expect`断言不成立，就会抛出一个错误。事实上，只要不抛出错误，测试用例就算通过。

```
it('1 加 1 应该等于 2', function() {});
```

 上面的这个测试用例，内部没有任何代码，由于没有抛出了错误，所以还是会通过。 

### 异步测试

 Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用`-t`或`--timeout`参数指定超时门槛。 

```
it('测试应该5000毫秒后结束', function(done) {
  var x = true;
  var f = function() {
    x = false;
    expect(x).to.be.not.ok;
    done(); // 通知Mocha测试结束
  };
  setTimeout(f, 4000);
});
```

 上面的测试用例，需要4000毫秒之后，才有运行结果。所以，需要用`-t`或`--timeout`参数，改变默认的超时设置。 

```javascript
$ mocha -t 5000 timeout.test.js
```

 上面命令将测试的超时时限指定为5000毫秒。 

另外，上面的测试用例里面，有一个`done`函数。`it`块执行的时候，传入一个`done`参数，当测试结束的时候，必须显式调用这个函数，告诉Mocha测试结束了。否则，Mocha就无法知道，测试是否结束，会一直等到超时报错。你可以把这行删除试试看。

Mocha默认会高亮显示超过75毫秒的测试用例，可以用`-s`或`--slow`调整这个参数。

上面命令指定高亮显示耗时超过1000毫秒的测试用例。

下面是另外一个异步测试的例子[`async.test.js`](https://github.com/ruanyf/mocha-demos/blob/master/demo05/async.test.js)。

```
it('异步请求应该返回一个对象', function(done){
  request
    .get('https://api.github.com')
    .end(function(err, res){
      expect(res).to.be.an('object');
      done();
    });
});
```

 运行下面命令，可以看到这个测试会通过。 

```
$ mocha -t 10000 async.test.js
```

 另外，Mocha内置对Promise的支持，允许直接返回Promise，等到它的状态改变，再执行断言，而不用显式调用`done`方法。请看[`promise.test.js`](https://github.com/ruanyf/mocha-demos/blob/master/demo05/promise.test.js)。 

```
it('异步请求应该返回一个对象', function() {
  return fetch('https://api.github.com')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).to.be.an('object');
    });
});
```

### 测试用例的钩子

 Mocha在`describe`块之中，提供测试用例的四个钩子：`before()`、`after()`、`beforeEach()`和`afterEach()`。它们会在指定时间执行。 

```
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```

 进入[`demo06`](https://github.com/ruanyf/mocha-demos/tree/master/demo06)子目录，可以看到下面两个例子。首先是`beforeEach`的例子[`beforeEach.test.js`](https://github.com/ruanyf/mocha-demos/blob/master/demo06/beforeEach.test.js)。 

```
// beforeEach.test.js
describe('beforeEach示例', function() {
  var foo = false;

  beforeEach(function() {
    foo = true;
  });

  it('修改全局变量应该成功', function() {
    expect(foo).to.be.equal(true);
  });
});
```

