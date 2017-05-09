(function(){

let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');
// Promise
// Hi!
// Resolved
// Promise新建后立即执行，所以首先输出的是“Promise”。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以“Resolved”最后输出。

}());






(function(){

/**p1是一个Promise，3秒之后变为rejected。
p2的状态在1秒之后改变，resolve方法返回的是p1。
由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
所以，后面的then语句都变成针对后者（p1）。又过了2秒，p1变为rejected，导致触发catch方法指定的回调函数。
Error: fail
    at Timeout.setTimeout (/Users/daicy/Promise-demo/Promise-demo.js:2:27)
    at tryOnTimeout (timers.js:232:11)
    at Timer.listOnTimeout (timers.js:202:5)
**/
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))

})();




/**
then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

**/
(function(){

  var promise = new Promise((resolve,reject)=>{
    resolve("2个then");
  });
  promise.then((a)=>{
     return new Promise((resolve,reject)=>{
        resolve(a);
     });
  }).then((b)=>{
     console.log(b);
  });

})();


/**
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
推荐使用 catch 来处理 reject的回调
**/
(function(){

var promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});

}());




//  catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
(function(){

 var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});


})();


/**
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))


Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。

Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。
所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。
**/
(function(){

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});

})();

(function(){
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
})();



//应用 加载图片
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};



















