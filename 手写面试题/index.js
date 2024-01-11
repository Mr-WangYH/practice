// -------------- 手写Object.create --------------
// function create(obj) {
//   function Fun(){

//   }
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
//   return function {
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
//   return function {
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
//     if (!obj !== null) {
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
//   console.log(this);
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
//   if (typeof num1 !== 'string' || typeof num2 !== 'string') {
//     throw new Error('必须传字符串');
//   }
//   // 参数为字符串，返回字符串
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

//   for (var j = 0; j < result.length - 1; j++) {
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
//           .match(/d{3}/g)
//           .join(',') +
//         after
//       );
//     } else {
//       return before.match(/d{3}/g).join(',') + after;
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
