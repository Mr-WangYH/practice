// -------------- 手写Object.create --------------
// function create(obj) {
//   function Fun(){  }
//   Fun.prototype = obj;
//   Fun.prototype.constructor = Fun;
//   return new Fun()
// }

// -------------- 手写instanceof -------------------
// function myInstanceof(obj, ctor) {
//   var proto = Object.getPrototypeOf(obj);
//   var prototype = ctor.prototype;
//   while (true) {
//     if (!proto) return false;
//     if (proto === prototype) return true;
//     proto = Object.getPrototypeOf(proto);
//   }
// }

// -------------- 手写new ------------------------
// 在调用new之后会发生这几个步骤：
// 1、创建一个空对象
// 2、设置原型：将空白对象的原型设置为函数的prototype对象
// 3、让函数的this指向这个对象，执行构造函数的代码（为空白对象添加属性）
// 4、判断函数的返回值
//   4.1.  如果是引用类型，直接返回，比如构造函数主动返回了一个对象：function T(){return {x: 1}}
//   4.2.  如果不是引用类型，返回空白对象; 比如构造函数返回一个数字：function T(){return 1}

// myNew(构造函数，构造函数的参数)
// function myNew() {
//   var newObject = null;
//   var result = null;
//   var Fun = Array.prototype.shift.call(arguments);
//   if (typeof Fun !== 'function') {
//     throw new Error('不是一个函数');
//     return;
//   }
//   newObject = Object.create(Fun.prototype);
//   result = Fun.apply(newObject, arguments);
//   var flag = result && (typeof result === 'function' || typeof result === 'object');
//   return flag ? result : newObject;
// }

// -------------- 拦截构造函数调用(必须使用new调用) ----------------
// function Person(name) {
//   if (new.target !== Person) {
//     throw new Error('构造函数，请使用new调用');
//   } else {
//     this.name = name;
//   }
// }

// ------------------- 防抖函数 --------------------
// function debounce(fn,wait){
//   let timer = null;
//   return function() {
//     if(timer){
//       clearTimeout(timer);
//       timer = null
//     }else {
//       timer = setTimeout(() => {
//         fn.apply(this.arguments)
//       },wait)
//     }
//   }
// }

// ----------------- 节流函数 -----------------
// function throttle(fn,wait){
//   let timer = null;
//   return function() {
//     if(timer) return
//     timer = setTimeout(() => {
//       timer = null
//       fn.apply(this.arguments)
//     },wait)

//   }
// }

// -------------------- 类型判断函数 -----------------
// function getType(value) {
//   if (value === null) {
//     return 'null';
//   }
//   if (value === undefined) {
//     return 'undefined';
//   }
//   if (typeof value === 'object') {
//     return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
//   } else {
//     return typeof value;
//   }
// }

// ---------------- 浅拷贝 -------------------
// function shallowCopy(object) {
//   if (!object || typeof object !== 'object') return;
//   var newObj;
//   if (Object.prototype.toString.call(object) === '[object Array]') {
//     newObj = [];
//     for (var i = 0; i < object.length; i++) {
//       newObj[i] = object[i];
//     }
//   } else {
//     newObj = {};
//     for (var key in object) {
//       newObj[key] = object[key];
//     }
//   }
//   return newObj;
// }

// ------------------ 简单深拷贝 -------------------
// function deepClone(target, map = new WeakMap()) {
//   const isArr = Object.prototype.toString.call(target) === '[object Array]';
//   const isNull = typeof target === 'object' && !target;
//   if (map.get(target)) {
//     return target;
//   }
//   if (typeof target !== 'object' || isNull) return target;
//   const newObj = isArr ? [] : {};
//   map.set(target, newObj);
//   for (let key in target) {
//     if (target.hasOwnProperty(key)) {
//       const value = target[key];
//       newObj[key] = deepClone(value, map);
//     }
//   }
//   return newObj;
// }

// ---------------- 实现 Object.assign --------------
// Object.prototype.myAssign = function (target, ...source) {
//   if (target === null) {
//     throw new Error('can not be null');
//   }
//   const res = Object(target);
//   source.forEach((obj) => {
//     if (obj !== null) {
//       for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//           res[key] = obj[key];
//         }
//       }
//     }
//   });
//   return res;
// };

// ------------------ 模拟实现一个Object.freeze ------------------
// Object.freeze() 方法可以冻结一个对象。冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。

// function myFreeze(obj) {
//   Object.seal(obj); // 让对象属性不能删除
//   for (let key in obj) {
//     if (obj.hasOwnProporty(key)) {
//       Object.defineProperty(obj, key, {
//         writable: false,
//       });
//       myFreeze(obj[key]);
//     }
//   }
// }

// ------------------- 实现一个map和reduce函数 ---------------------
// map
// Array.prototype.myMap = function (fn, context) {
//   const arr = Array.prototype.slice.call(this);
//   const newList = [];
//   arr.forEach((element, i) => {
//     newList.push(fn.call(context, element, i));
//   });
//   return newList;
// };

// reduce
// Array.prototype.myReduce = function (fn, initValue) {
//   var arr = Array.prototype.slice.call(this);
//   var startIndex = initValue || initValue === 0 ? 0 : 1;
//   var sum = initValue || initValue === 0 ? initValue : arr[0];
//   for (var i = startIndex; i < arr.length; i++) {
//     sum = fn.call(null, sum, arr[i], i, this);
//   }
//   return sum;
// };

// -------------- 处理0.1 + 0.2问题 ----------------
// function add(num1, num2) {
//   var r1, r2, m;
//   try {
//     r1 = num1.toString().split('.')[1].length;
//   } catch (error) {
//     r1 = 0;
//   }
//   try {
//     r2 = num2.toString().split('.')[1].length;
//   } catch (error) {
//     r2 = 0;
//   }
//   m = Math.pow(10, Math.max(r1, r2));
//   const res = (num1 * m + num2 * m) / m;
//   return res;
// }

// ----------------- 解决大数相加 ---------------
// var addStrings = function (num1, num2) {
//   // 参数为字符串，返回字符串
//   var res = '';
//   var i1 = num1.length - 1;
//   var i2 = num2.length - 1;
//   var arr = 0;
//   while (i1 >= 0 || i2 >= 0) {
//     var n = num1[i1] ? +num1[i1] : 0;
//     var m = num2[i2] ? +num2[i2] : 0;
//     var sum = n + m + arr;
//     if (sum / 10 >= 1) {
//       res = (sum % 10) + res;
//       arr = 1;
//     } else {
//       res = sum + res;
//       arr = 0;
//     }
//     i1--;
//     i2--;
//   }
//   return arr === 1 ? arr + res : res;
// };

// ---------------- 大数相乘 --------------------
// var multiply = function (num1, num2) {
//   // 参数为字符串，返回字符串
//   if (typeof num1 !== 'string' || typeof num2 !== 'string') {
//     throw new Error('必须传字符串');
//   }
//   var result = '0';
//   var i = num1.length - 1;
//   while (i >= 0) {
//     var temp = Array(num1.length - 1 - i)
//       .fill('0')
//       .join('');
//     var sum = '0';
//     var item = +num1[i];
//     while (item > 0) {
//       sum = addStrings(sum, num2);
//       item--;
//     }
//     result = addStrings(sum + temp, result);
//     i--;
//   }

//   for (var j = 0; j < result.length ; j++) {
//     if (result[j] !== '0') {
//       return result.slice(j);
//     }
//   }
//   return '0';

//   function addStrings(num1, num2) {
//     if (typeof num1 !== 'string' || typeof num2 !== 'string') {
//       throw new Error('必须传字符串');
//     }
//     // 参数为字符串，返回字符串
//     var res = '';
//     var i1 = num1.length - 1;
//     var i2 = num2.length - 1;
//     var arr = 0;
//     while (i1 >= 0 || i2 >= 0) {
//       var n = num1[i1] ? +num1[i1] : 0;
//       var m = num2[i2] ? +num2[i2] : 0;
//       var sum = n + m + arr;
//       if (sum / 10 >= 1) {
//         res = (sum % 10) + res;
//         arr = 1;
//       } else {
//         res = sum + res;
//         arr = 0;
//       }
//       i1--;
//       i2--;
//     }
//     return arr === 1 ? arr + res : res;
//   }
// };

// ----------------- 对象扁平化 -----------------------
/* 题目*/
// var entryObj = {
//   a: {
//     b: {
//       c: [
//         {
//           dd: { afas: 12 },
//         },
//       ],
//     },
//     d: {
//       xx: 'adxx',
//     },
//     e: 'ae',
//   },
// };

// 要求转换成如下对象
// var outputObj = {
// 	'a.b.c.dd': 'abcdd',
// 	'a.d.xx': 'adxx',
// 	'a.e': 'ae'
// }

// function flat(obj, path = '', res = {}, isArray) {
//   for (let [key, value] of Object.entries(obj)) {
//     if (Array.isArray(value)) {
//       let _k = isArray ? `${path}[${key}]` : `${path}${key}`;
//       flat(value, _k, res, true);
//     } else if (typeof value === 'object') {
//       let _k = isArray ? `${path}[${key}].` : `${path}${key}.`;
//       flat(value, _k, res, false);
//     } else {
//       let _k = isArray ? `${path}[${key}]` : `${path}${key}`;
//       res[_k] = value;
//     }
//   }
//   return res;
// }

// ------------------------ 数字千分位分割 ------------------
// function format(number) {
//   number = number.toString();
//   var before = number.includes('.') ? number.split('.')[0] : number;
//   var after = number.includes('.') ? number.split('.')[1] : '';
//   var len = before.length;
//   if (len > 3) {
//     after = after ? '.' + after : after;
//     if (len % 3 > 0) {
//       return (
//         before.slice(0, len % 3) +
//         before
//           .slice(len % 3)
//           .match(/\d{3}/g)
//           .join(',') +
//         after
//       );
//     } else {
//       return before.match(/\d{3}/g).join(',') + after;
//     }
//   } else {
//     return number;
//   }
// }

// ---------------------- js下划线转驼峰处理 ----------------------
// function camelCase(str) {
//   return str.replace(/_([a-z])/g, function (match, group1) {
//     return group1.toUpperCase();
//   });
// }

// --------------------- Hex转RGB的方法 ----------------------
//HEX十六进制颜色值转换为RGB(A)颜色值
// function hexToRgb(val) {
//   // 16进制颜色值的正则
//   var reg = /[0-9a-zA-Z]{3}|[0-9a-zA-Z]{6}/;
//   var color = val.toLowerCase().slice(1);
//   var result = [];
//   if (reg.test(color)) {
//     var resultColor = '';
//     if (color.length === 3) {
//       for (var i = 0; i < color.length; i++) {
//         resultColor += color[i] + color[i];
//       }
//     } else {
//       resultColor = color;
//     }
//     for (var i = 0; i < resultColor.length; i = i + 2) {
//       result.push(parseInt('0x' + resultColor[i] + resultColor[i + 1]));
//     }
//     return {
//       rgb: `rgb(${result.join(',')})`,
//       r: result[0],
//       g: result[1],
//       b: result[2],
//     };
//   } else {
//     result = '无效';
//     return { rgb: result };
//   }
// }

// -------------------------- 获取URL中的参数 -------------------
// function name(url) {
//   url = url || window.location.href;
//   var paramsList = url.match(/[?&](.+?=[^&]+)/gim);
//   var result = paramsList.reduce((obj, b) => {
//     const list = b.slice(1).split('=');
//     obj[list[0]] = list[1];
//     return obj;
//   }, {});
//   return result;
// }

// -------------------- 如何使用for...of遍历对象 --------------
// 想要遍历对象，可以给对象添加一个Symbol.iterator属性，并指向一个迭代器即可
// var obj = {
//   a: 1,
//   b: 2,
//   c: 3,
// };
// obj[Symbol.iterator] = function* () {
//   var keys = Object.keys(obj);
//   for (var k of keys) {
//     yield [k, obj[k]];
//   }
// };

// for (var [k, v] of obj) {
//   console.log(k, v);
// }

// --------------------- 函数柯里化实现 ------------------------
// function curry(fn, arg) {
//   const length = fn.length;   // 函数参数长度
//   arg = arg || [];
//   return function () {
//     const params = [...arg, ...arguments];
//     if (params.length >= length) {
//       return fn.apply(this, params);
//     } else {
//       return curry(fn, params);
//     }
//   };
// }

// -------------------- 数组转成树 ----------------
// function arrToTree(arr) {
//   const map = {};
//   const result = [];
//   for (const value of arr) {
//     map[value.id] = value;
//   }
//   for (var i = 0; i < arr.length; i++) {
//     const pid = arr[i].pid;
//     if (pid) {
//       map[pid].children = map[pid].children || [];
//       map[pid].children.push(arr[i]);
//     } else {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// -------------------- 树转数组 -----------------------
// function treeToArr(arr, result = []) {
//   for (var i = 0; i < arr.length; i++) {
//     const children = arr[i].children;
//     if (children) {
//       treeToArr(children, result);
//       delete arr[i].children;
//       result.push(arr[i]);
//     } else {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// ------------------ 使用 setTimeout 实现 setInterval --------------
// function myInterval(fn, wait) {
//   let timer = null;
//   function interval() {
//     fn();
//     timer = setTimeout(interval, wait);
//   }
//   timer = setTimeout(interval, wait);
//   return {
//     clear() {
//       clearTimeout(timer);
//     },
//   };
// }

// ------------------- 实现一个发布订阅模式 --------------------
// class EventCenter {
//   constructor() {
//     this.event = {};
//   }

//   subscribe(eventName, callback) {
//     if (!this.event[eventName]) {
//       this.event[eventName] = [callback];
//     } else {
//       this.event[eventName].push(callback);
//     }
//   }

//   unSubscribe(eventName, callback) {
//     if (!this.event[eventName] || !this.event[eventName].length) {
//       throw new Error('not find event ' + eventName);
//     } else {
//       if (!callback) {
//         delete this.events[eventName];
//       } else {
//         const index = this.event[eventName].findIndex((el) => el === callback);
//         if (index === -1) {
//           throw new Error('没有');
//         } else {
//           this.event[eventName].splice(index, 1);
//         }
//         if (this.event[eventName].length === 0) {
//           delete this.events[eventName];
//         }
//       }
//     }
//   }

//   dispatch(eventName, ...arg) {
//     if (!this.event[eventName] || !this.event[eventName].length) {
//       throw new Error();
//     } else {
//       this.event[eventName].forEach((cb) => {
//         cb(...arg);
//       });
//     }
//   }
// }

// -------------------- 实现斐波那契数列 --------------------
// 递归方式
// function fn(n) {
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   return fn(n - 2) + fn(n - 1);
// }

// 非递归方式
// function fn(n) {
//   let pre1 = 0;
//   let pre2 = 1;
//   let current = 1;

//   if (n === 2) return current;
//   for (let i = 2; i < n; i++) {
//     pre1 = pre2;
//     pre2 = current;
//     current = pre1 + pre2;
//   }
//   return current;
// }

// ---------------------- 请求并发控制 ----------------
// 实现一个并发请求函数concurrencyRequest(urls, maxNum)，要求如下：
// • 要求最大并发数 maxNum
// • 每当有一个请求返回，就留下一个空位，可以增加新的请求
// • 所有请求完成后，结果按照 urls 里面的顺序依次打出（发送请求的函数可以直接使用fetch即可）
// 并发请求函数
// const concurrencyRequest = (urls, maxNum) => {
//   return new Promise((resolve) => {
//     if (urls.length === 0) {
//       return resolve([]);
//     }
//     const results = [];
//     let index = 0; // 下一个请求的下标
//     // 发送请求
//     async function request() {
//       if (index === urls.length) return;
//       const i = index; // 保存序号，使result和urls相对应
//       try {
//         const res = await fetch(urls[i]);
//         // resp 加入到results
//         results[i] = res;
//       } catch (err) {
//         // err 加入到results
//         results[i] = err;
//       } finally {
//         index++;
//         // 判断是否所有的请求都已完成
//         if (index === urls.length) {
//           console.log('完成了');
//           resolve(results);
//         } else {
//           request();
//         }
//       }
//     }

//     // maxNum和urls.length取最小进行调用
//     const times = Math.min(maxNum, urls.length);
//     for (let i = 0; i < times; i++) {
//       request();
//     }
//   });
// };

// --------------- 实现lazy链式调用: person.eat().sleep(2).eat() ------------
// function Person() {
//   this.queue = [];
//   this.lock = false;
//   this.eat = function () {
//     this.queue.push(
//       () =>
//         new Promise((resolve) => {
//           console.log('eat');
//           resolve();
//         })
//     );
//     return this;
//   };
//   this.sleep = function (wait) {
//     this.queue.push(
//       () =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             console.log('sleep');
//             resolve('');
//           }, wait * 1000);
//         })
//     );
//     return this;
//   };
//   this.run = async function () {
//     if (this.queue.length && !this.lock) {
//       this.lock = true;
//       const task = this.queue.shift();
//       await task();
//       this.lock = false;
//       this.run();
//     }
//   };
// }

// ----------------- lazy-load实现 ---------------------------
// 首先将页面上的图片的 src 属性设为 loading.gif，而图片的真实路径则设置在 data-src 属性中，页面滚动的时候计算图片的位置与滚动的位置，当图片出现在浏览器视口内时，将图片的 src 属性设置为 data-src 的值，这样，就可以实现延迟加载。
// <img src="images/loading.gif" data-src="images/1.png"></img>
// function lazyload() {
//   var images = document.getElementsByTagName('img');
//   var len = images.length;
//   var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
//   return function () {
//     var seeHeight = document.documentElement.clientHeight;
//     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     for (var i = n; i < len; i++) {
//       if (images[i].offsetTop < seeHeight + scrollTop) {
//         if (images[i].getAttribute('src') === 'images/loading.gif') {
//           images[i].src = images[i].getAttribute('data-src');
//         }
//         n = n + 1;
//       }
//     }
//   };
// }
// var loadImages = lazyload();
// loadImages(); //初始化首页的页面图片
// window.addEventListener('scroll', loadImages, false);

// --------------------- 实现一个只执行一次的函数 -----------------------
// function once(fn) {
//   let called = false;
//   let result = null;
//   return function () {
//     if (called) {
//       return result;
//     }
//     called = true;
//     result = fn.apply(this, arguments);
//     return result;
//   };
// }

// ------------------ LRU 算法实现 --------------------
// class LRUCahe {
//   constructor(capacity) {
//     this.cache = new Map();
//     this.capacity = capacity;
//   }
//   get(key){
//     if(this.cache.has(key)){
//       const value = this.cache.get(key);
//       this.cache.delete(key);
//       this.cache.set(key, value);
//       return value
//     }
//     return undefined
//   }
//   set(key,value){
//     if(this.cache.has(key)){
//       this.cache.delete(key);
//     }else if(this.cache.size >= this.capacity){
//       this.cache.delete(this.cache.keys().next().value);
//     }
//     this.cache.set(key, value);
//   }
// }

const obj = {
  name: 'John',
  age: 30,
};

const proxy = new Proxy(obj, {
  get(target, property) {
    console.log(target);
    console.log(`Getting ${property}`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
  },
});

console.log(proxy.name); // Getting name, John
proxy.name = 'Alice'; // Setting name to Alice
console.log(proxy.name); // Getting name, Alice

console.log(proxy.age); // Getting age, 30
proxy.age = 40; // Setting age to 40
console.log(proxy.age); // Getting age, 40
