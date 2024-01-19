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
