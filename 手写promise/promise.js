// 手写promise
class MyPromise {
  constructor(executor) {
    this.initValue();
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  initValue() {
    this.promiseState = 'pending'; // 状态
    this.promiseResult = null; // 结果
    this.onFulfilledCallbacks = []; // 成功回调
    this.onRejectedCallbacks = []; // 失败回调
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    if (this.promiseState !== 'pending') return;
    this.promiseState = 'fulfilled';
    this.promiseResult = value;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.promiseResult);
    }
  }

  reject(value) {
    if (this.promiseState !== 'pending') return;
    this.promiseState = 'rejected';
    this.promiseResult = value;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.promiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (res) => res;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const returnPromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        const resolvePromise = (cb) => {
          try {
            const x = cb(this.promiseResult);
            if (x === returnPromise) {
              reject('不能返回自己');
            } else if (x instanceof MyPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (error) {
            reject(error);
          }
        };
        if (this.promiseState === 'fulfilled') {
          resolvePromise(onFulfilled);
        } else if (this.promiseState === 'rejected') {
          resolvePromise(onRejected);
        } else if (this.promiseState === 'pending') {
          this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
          this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
        }
      }, 0);
    });
    return returnPromise;
  }

  all(array) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(array)) {
        throw new TypeError('You must pass an array to all.');
      }
      const result = [];
      let count = 0;
      // 遍历 array 拿到每一条数据
      array.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            result[index] = value;
            count++;
            // 判断 result 结果值的长度 和 array参数的长度相等  执行最外面的 resolve 返回 all 结果
            if (count === array.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  race(array) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(array)) {
        throw new TypeError('You must pass an array to all.');
      }
      array.forEach((promise) => {
        MyPromise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
}

const pro = new MyPromise((resolve) => {
  resolve(123);
});
pro
  .then((res) => {
    console.log(res); // 123
    return new MyPromise((resolve) => {
      resolve(999);
    });
  })
  .then((res) => {
    console.log(res); // 999
  });

const pro2 = new Promise((resolve) => {
  resolve(123);
});
pro2
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      resolve(999);
    });
  })
  .then((res) => {
    console.log(res);
  });
