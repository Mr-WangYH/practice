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
function shallowCopy(object) {
  if (!object || typeof object !== 'object') return;
  var newObj;
  if (Object.prototype.toString.call(object) === '[object Array]') {
    newObj = [];
    for (var i = 0; i < object.length; i++) {
      newObj[i] = object[i];
    }
  } else {
    newObj = {};
    for (var key in object) {
      newObj[key] = object[key];
    }
  }
  return newObj;
}
