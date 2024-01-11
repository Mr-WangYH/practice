// JS实现数组扁平化的 6 种方式
// 一、递归
// function flatten(arr) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       result = result.concat(flatten(arr[i]));
//     } else {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// 二、reduce实现
// function flatten(arr) {
//     return arr.reduce(function(pre, cur){
//         return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
//     }, [])
// }

// 三、扩展运算符实现
// function flatten(arr) {
//   while (arr.some((i) => Array.isArray(i))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

// 四、split + toString 实现
// function flatten(arr) {
//   return arr
//     .toString()
//     .split(',')
//     .map((i) => Number(i));
// }

// 五、正则 + JSON实现
// function flatten(arr) {
//   let str = JSON.stringify(arr);
//   str = str.replace(/(\[|\])/g, '');
//   // 拼接最外层，变成JSON能解析的格式
//   str = '[' + str + ']';
//   return JSON.parse(str);
// }

// 六、Array.prototype.flat
// 参数Infinity表示完全展开;
// function flatten(arr) {
//   return arr.flat(Infinity);
// }
