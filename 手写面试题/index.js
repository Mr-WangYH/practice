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

// --------------- 冒泡排序 ---------------
// function bubbleSort(arr) {
//   const n = arr.length;
//   for (let i = 0; i < n - 1; i++) {
//     for (let j = 0; j < n - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }
//   return arr;
// }

// ------------------- 选择排序 ----------------------
// function selectionSort(arr) {
//   const len = arr.length;
//   for (var i = 0; i < len - 1; i++) {
//     var minIndex = i;
//     for (var j = i + 1; j < len; j++) {
//       if (arr[minIndex] > arr[j]) {
//         minIndex = j;
//       }
//     }
//     [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
//   }
//   return arr;
// }

// --------------------- 插入排序 -------------------
// function insertionSort(arr) {
//   const len = arr.length;
//   for (var i = 1; i < len; i++) {
//     let current = arr[i];
//     let j = i - 1;
//     while (j >= 0 && arr[j] > current) {
//       arr[j + 1] = arr[j];
//       j--;
//     }
//     arr[j + 1] = current;
//   }
//   return arr;
// }

// ---------------------- 快速排序 --------------------------
// function quickSort(arr) {
//   if (arr.length <= 1) {
//     return arr;
//   }
//   let pivot = arr[0];
//   let left = [];
//   let right = [];
//   for (var i = 1; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return quickSort(left).concat(pivot, quickSort(right));
// }

// --------------------- 希尔排序 ----------------------
// function shellSort(arr) {
//   const n = arr.length;
//   for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
//     for (let i = gap; i < n; i++) {
//       let temp = arr[i];
//       let j = i;
//       while (j >= gap && arr[j - gap] > temp) {
//         arr[j] = arr[j - gap];
//         j -= gap;
//       }
//       arr[j] = temp;
//     }
//   }
//   return arr;
// }

// ------------------------ 归并排序 ----------------------
// function mergeSort(arr) {
//   if (arr.length <= 1) {
//     return arr;
//   }
//   const middle = Math.floor(arr.length / 2);
//   const left = arr.slice(0, middle);
//   const right = arr.slice(middle);
//   return merge(mergeSort(left), mergeSort(right));
// }

// function merge(left, right) {
//   let result = [];
//   let leftIndex = 0;
//   let rightIndex = 0;
//   while (leftIndex < left.length && rightIndex < right.length) {
//     if (left[leftIndex] < right[rightIndex]) {
//       result.push(left[leftIndex]);
//       leftIndex++;
//     } else {
//       result.push(right[rightIndex]);
//       rightIndex++;
//     }
//   }
//   return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
// }

// ------------------------ 堆排序 ------------------------
// function heapSort(arr) {
//   const n = arr.length;
//   for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//     heapify(arr, n, i);
//   }
//   for (let i = n - 1; i > 0; i--) {
//     [arr[0], arr[i]] = [arr[i], arr[0]];
//     heapify(arr, i, 0);
//   }
//   return arr;
// }

// function heapify(arr, n, i) {
//   let largest = i;
//   const left = 2 * i + 1;
//   const right = 2 * i + 2;
//   if (left < n && arr[left] > arr[largest]) {
//     largest = left;
//   }
//   if (right < n && arr[right] > arr[largest]) {
//     largest = right;
//   }
//   if (largest !== i) {
//     [arr[i], arr[largest]] = [arr[largest], arr[i]];
//     heapify(arr, n, largest);
//   }
// }

// ----------------------- 计数排序 -----------------------
// function countingSort(arr) {
//   const max = Math.max(...arr);
//   const min = Math.min(...arr);
//   const range = max - min + 1;
//   const countArr = new Array(range).fill(0);
//   const output = new Array(arr.length);

//   for (let i = 0; i < arr.length; i++) {
//     countArr[arr[i] - min]++;
//   }
//   for (let i = 1; i < range; i++) {
//     countArr[i] += countArr[i - 1];
//   }
//   for (let i = arr.length - 1; i >= 0; i--) {
//     output[countArr[arr[i] - min] - 1] = arr[i];
//     countArr[arr[i] - min]--;
//   }
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = output[i];
//   }
//   return arr;
// }

// ------------------------ 桶排序 -------------------------
// function bucketSort(arr, bucketSize = 5) {
//   if (arr.length === 0) {
//     return arr;
//   }
//   const minValue = Math.min(...arr);
//   const maxValue = Math.max(...arr);
//   const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;

//   const buckets = new Array(bucketCount);
//   for (let i = 0; i < bucketCount; i++) {
//     buckets[i] = [];
//   }
//   for (let i = 0; i < arr.length; i++) {
//     const bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
//     buckets[bucketIndex].push(arr[i]);
//   }
//   arr.length = 0;
//   for (let i = 0; i < bucketCount; i++) {
//     insertionSort(buckets[i]);
//     arr.push(...buckets[i]);
//   }
//   return arr;
// }

// -------------------- 基数排序 --------------------
// function radixSort(arr) {
//   const maxDigit = getMaxDigit(arr);
//   for (let digit = 0; digit < maxDigit; digit++) {
//     const bucketList = Array.from({ length: 10 }, () => []);
//     for (let i = 0; i < arr.length; i++) {
//       const digitValue = getDigitValue(arr[i], digit);
//       bucketList[digitValue].push(arr[i]);
//     }
//     arr = bucketList.flat();
//   }
//   return arr;
// }

// function getMaxDigit(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length; i++) {
//     max = Math.max(max, arr[i].toString().length);
//   }
//   return max;
// }

// function getDigitValue(num, digit) {
//   return Math.floor(Math.abs(num) / Math.pow(10, digit)) % 10;
// }

console.log(quickSort([34, 4, 56, 3, 2, 89, 58]));
