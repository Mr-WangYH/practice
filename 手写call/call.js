let obj = {
  value: 1,
};

function fn(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

Function.prototype.call2 = function (content, ...arg) {
  content = content || window;
  content.fn = this;
  const res = content.fn(...arg);
  delete content.fn;
  return res;
};

Function.prototype.apply2 = function (content, arg) {
  content = content || window;
  content.fn = this;
  let res;
  if (!!arg) {
    res = content.fn(...arg);
  } else {
    res = content.fn();
  }

  delete content.fn;
  return res;
};

Function.prototype.bind2 = function (content, ...arg) {
  content = content || window;
  const self = this;
  const returnFn = function (...arg2) {
    const params = [...arg, ...arg2];
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof returnFn ? this : content, params);
  };
  returnFn.prototype = this.prototype;
  return returnFn;
};

fn.call2(obj, 231, 342);

fn.bind2(obj, 231)(899);
