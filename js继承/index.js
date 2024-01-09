// ------------- 一、原型链继承 ---------------------
// function Parent() {
//   this.hobby = ['乒乓球', '篮球'];
//   this.getName = function () {
//     return this.name;
//   };
// }

// function Child(name) {
//   this.name = name;
// }

// Child.prototype = new Parent();
// const child1 = new Child('小龙');
// const child2 = new Child('小虎');

// child1.hobby.push('足球');
// console.log(child1.hobby); // [ '乒乓球', '篮球', '足球' ]
// console.log(child2.hobby); // [ '乒乓球', '篮球', '足球' ]

// 优点：
// 1.简单易懂： 原型链继承是一种非常直观的继承方式，它利用了 JavaScript 中原型和原型链的基本概念，因此易于理解和实现。
// 2.代码重用： 可以在原型对象上定义方法和属性，这些方法和属性将被所有继承该原型的子对象共享，从而实现了代码的重用。
// 3.运行时扩展： 可以随时向原型对象添加新的方法和属性，这将自动地被继承自该原型的所有对象所拥有。

// 缺点：
// 1.共享属性问题： 原型链继承最大的问题是所有子对象共享同一个原型对象，因此，如果一个子对象修改了继承的引用类型属性（如数组或对象），则会影响到其他子对象，这可能会导致意外的行为。
// 2.不能传递参数： 在使用原型链继承时，不能向父类构造函数传递参数，因为实例化子类时实际上是调用了父类构造函数，而不是传递参数的方式。
// 3.无法实现多继承： JavaScript 的原型链继承只支持单继承，一个子类只能继承一个父类的属性和方法。

// ----------------- 二、构造函数继承 ----------------------
// function Parent(name) {
//   this.hobby = ['乒乓球', '篮球'];
//   this.name = name;
//   this.getAge = function () {
//     return this.age;
//   };
// }
// Parent.prototype.getName = function () {
//   return this.name;
// };

// function Child(name, age) {
//   Parent.call(this, name);
//   this.age = age;
// }
// const child1 = new Child('小龙', 18);
// const child2 = new Child('小虎', 19);
// child1.hobby.push('足球');
// console.log(child1.hobby); // [ '乒乓球', '篮球', '足球' ]
// console.log(child2.hobby); // [ '乒乓球', '篮球']
// console.log(child1.getAge());
// console.log(child1.getName()); // 报错

// 优点：
// 1.属性不会被共享： 与原型链继承不同，构造函数继承不会共享父类的引用属性。这意味着每个子类实例都有自己的属性副本，不会相互影响。

// 缺点：
// 1.无法继承原型链上的方法： 一个主要的缺点是，构造函数继承无法继承父类原型上的方法。
// 2.不利于方法共享： 因为每个子类实例都会拥有父类构造函数内的属性和方法的副本，这可能会导致内存浪费，尤其在创建多个子类实例时。
// 3.不符合原型链继承的特点： 构造函数继承的方式并没有真正地继承父类的原型链，因此它不符合 JavaScript 原型链继承的思想。

// ------------- 三、组合继承 ----------------
// function Parent(name) {
//   this.hobby = ['乒乓球', '篮球'];
//   this.name = name;
//   this.getAge = function () {
//     return this.age;
//   };
// }
// Parent.prototype.getName = function () {
//   return this.name;
// };

// function Child(name, age) {
//   Parent.call(this, name);
//   this.age = age;
// }
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;

// const child1 = new Child('小龙', 18);
// const child2 = new Child('小虎', 19);
// child1.hobby.push('足球');
// console.log(child1.hobby); // [ '乒乓球', '篮球', '足球' ]
// console.log(child2.hobby); // [ '乒乓球', '篮球']
// console.log(child1.getAge());
// console.log(child1.getName());

// 优点：
// 1.继承父类属性和方法： 组合继承能够同时继承父类构造函数内的属性和方法，以及父类原型链上的方法。这使得子类非常灵活，能够使用父类的属性和方法，同时也能继承共享的方法。
// 2.不共享引用属性： 与构造函数继承不同，组合继承不会共享父类构造函数内的引用属性，因此每个子类实例都有自己的属性副本。

// 缺点：
// 1.多次调用父类构造函数： 一个主要的缺点是，组合继承在创建子类实例时会调用两次父类构造函数。这可能会导致性能开销，尤其是如果父类构造函数执行复杂操作或依赖外部资源。
// 2.原型链上的冗余数据： 由于 Child.prototype 包含了一个父类的实例，因此原型链上会存在一些冗余的数据，尽管这不会对子类的功能造成问题，但会占用额外的内存空间。

// ------------- 四、原型式继承 ---------------
// let parent = {
//   name: 'parent',
//   hobby: ['乒乓球', '篮球'],
//   getName: function () {
//     return this.name;
//   },
// };

// let person1 = Object.create(parent);
// person1.name = 'tom';
// person1.hobby.push('足球');

// let person2 = Object.create(parent);
// person2.hobby.push('羽毛球');

// console.log(person1.name); // tom
// console.log(person1.name === person1.getName()); // true
// console.log(person2.name); // parent
// console.log(person1.hobby); // [ '乒乓球', '篮球', '足球', '羽毛球' ]
// console.log(person2.hobby); // [ '乒乓球', '篮球', '足球', '羽毛球' ]

// 优点：
// 1.简单易用： 原型式继承是一种简单的方式来创建对象之间的继承关系，无需定义构造函数或类。
// 2.共享属性和方法： 由于多个实例共享原型对象上的属性和方法，这可以节省内存空间。

// 缺点：
// 1.共享引用类型属性： 原型式继承会导致多个实例共享引用类型属性，如果一个实例修改了这个属性，其他实例也会受到影响，可能引发意外的副作用。

// ---------------- 五、寄生式继承 -----------------
// let parent = {
//   name: 'parent',
//   hobby: ['乒乓球', '篮球'],
//   getName: function () {
//     return this.name;
//   },
// };

// function clone(parent) {
//   const clone = Object.create(parent);
//   clone.getHobby = function () {
//     return this.hobby;
//   };
//   return clone;
// }

// let person1 = clone(parent);
// person1.name = 'tom';
// person1.hobby.push('足球');

// let person2 = clone(parent);
// person2.hobby.push('羽毛球');

// console.log(person1.name); // tom
// console.log(person1.name === person1.getName()); // true
// console.log(person1.getHobby()); // [ '乒乓球', '篮球', '足球', '羽毛球' ]
// console.log(person2.getHobby()); // [ '乒乓球', '篮球', '足球', '羽毛球' ]
// console.log(person2.name); // parent

// 优点：
// 1.简单易用： 与原型式继承一样，寄生式继承也是一种简单的继承方式，无需定义构造函数或类。
// 2.可以在不修改原对象的情况下添加方法或属性： 通过在新对象上添加额外的方法或属性，可以在不改变原对象的情况下扩展其功能，这有助于保持原对象的封装性。

// 缺点：
// 1.共享引用类型属性： 与原型式继承一样，寄生式继承也会导致多个实例共享引用类型属性，可能存在篡改的风险。

// --------------- 六、寄生式组合继承 -------------
// function Parent(name) {
//   this.hobby = ['乒乓球', '篮球'];
//   this.name = name;
//   this.getAge = function () {
//     return this.age;
//   };
// }
// Parent.prototype.getName = function () {
//   return this.name;
// };

// function Child(name, age) {
//   Parent.call(this, name);
//   this.age = age;
// }

// function clone(parent, child) {
//   // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
//   child.prototype = Object.create(parent.prototype);
//   child.prototype.constructor = child;
// }

// clone(Parent, Child);

// const child1 = new Child('小龙', 18);
// const child2 = new Child('小虎', 19);

// console.log(child1.getAge()); // 18
// console.log(child1.getName()); // 小龙
// console.log(child2.getAge()); // 19
// console.log(child2.getName()); // 小虎

// 优点：
// 1.继承和实例化都得到了优化： 与传统的组合继承相比，寄生组合式继承避免了在子类构造函数中调用父类构造函数两次的问题，因此提高了性能。
// 2.避免了共享引用类型属性： 与原型式继承和寄生式继承相比，寄生组合式继承不会共享引用类型属性，因此不存在共享属性的问题。
// 3.保持了原型链： 这种继承方式保持了原型链的完整性，使得 instanceof 和其他原型链相关的特性能够正常工作。

// 缺点：
// 1.相对复杂： 相对于原型式继承和寄生式继承，寄生组合式继承需要更多的代码，可能会稍微复杂一些。而且可能需要一个额外的函数（clone 函数）来设置原型链，这增加了代码的复杂性。

// --------------------- ES6类继承 -------------------
// class Parent {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

// class Child extends Parent {
//   constructor(name, age) {
//     super(name);
//     this.age = age;
//   }
//   getAge() {
//     return this.age;
//   }
// }

// const child1 = new Child('张三', 18);
// const child2 = new Child('李四', 19);

// console.log(child1.getName()); // 张三
// console.log(child1.getAge()); // 18
// console.log(child2.getName()); // 李四
// console.log(child2.getAge()); // 19

// 优点：
// 1.清晰的语法：ES6 类继承使用 class 关键字，提供了一种更直观的方式来定义和扩展类，使代码更易读、易维护。
// 2.内置的 super 关键字：super 关键字简化了调用父类构造函数和方法的过程，使得在子类中扩展父类更加容易和直观。
// 3.支持封装性：ES6 类继承提供了公共和私有成员变量的支持，通过 constructor 中定义的成员变量和方法，可以实现更好的封装性。

// 缺点：
// 1.不支持早期 JavaScript 版本：ES6 类继承是现代 JavaScript 的一部分，因此不适用于旧版 JavaScript 环境，需要在支持 ES6 的环境中使用。
// 2.可能引发继承链问题：虽然 ES6 类继承简化了继承的语法，但仍然需要小心处理继承链问题，避免深层次的继承关系导致不易维护的代码。
// 3.不支持多继承：ES6 类继承不支持多继承，即一个类不能同时继承多个父类，这可能限制了某些特定情况下的代码结构。
