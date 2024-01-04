<!--
 * @Descripttion: 
 * @version: 
 * @Author: 阿鸿
 * @Date: 2023-04-03 15:56:46
 * @LastEditors: 阿鸿
 * @LastEditTime: 2023-05-17 20:25:20
-->
# ts

## TypeScript 是什么

[TypeScript](https://typescript.bootcss.com/) 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

## TypeScript 与 JavaScript 的区别

|         TypeScript          |          JavaScript           | 
| ----------------------- | ------------------------------------ |
| JavaScript 的超集用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页 |
| 可以在编译期间发现并纠正错误 | 作为一种解释型语言，只能在运行时发现错误 |
| 强类型，支持静态和动态类型 | 弱类型，没有静态类型选项 |
| 最终被编译成 JavaScript 代码，使浏览器可以理解	 | 可以直接在浏览器中使用 |
| 支持模块、泛型和接口 | 不支持模块，泛型或接口 |
| 可以在编译期间发现并纠正错误 | 作为一种解释型语言，只能在运行时发现错误 |

## 安装 TypeScript

```js
npm install -g typescript
```

## 验证 TypeScript

```js
tsc -v 
```

## 编译 TypeScript 文件

```js
tsc xxx.ts
```

## TypeScript 基础类型

### Boolean 类型

```js
let isDone: boolean = false;
```

### Number 类型

```js
let count: number = 10;
```

### String 类型

```js
let name: string = "bob";
```
还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（`），并且以${ expr }这种形式嵌入表达式

```js
let name: string = `Gene`;
let sentence: string = `Hello, my name is ${ name }
```

### Symbol 类型

Symbols是不可改变且唯一的。

```js
let sym2 = Symbol("key");
let sym3 = Symbol("key");
sym2 === sym3; // false, symbols是唯一的

let sym = Symbol();
let obj = {
    [sym]: "value"
};
```

### Array 类型

有两种方式可以定义数组。 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组;第二种方式是使用数组泛型，Array<元素类型>

```js
let list: number[] = [1, 2, 3];

let list: Array<number> = [1, 2, 3];
```

### Tuple(元组) 类型

众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子：

```js
let x: [string, number];
x = ['hello', 10];
```
当访问一个越界的元素，会使用联合类型替代：

```js
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
x[6] = true; // Error, 布尔不是(string | number)类型
```

在元组初始化的时候，我们还必须提供每个属性的值，不然也会出现错误，比如：

```js
x = ['hello'];   // Error, 不能将类型“[string]”分配给类型“[string, number]”。源具有 1 个元素，但目标需要 2 个。
```

### Enum 类型

enum类型是对JavaScript标准数据类型的一个补充。使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript 支持数字的和基于字符串的枚举。

```js
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;    // 0
let dirName = Direction[0];  // NORTH
```

默认情况下，从0开始为元素编号。也就是NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。

以上的枚举示例经编译后，对应的 ES5 代码如下：

```js
"use strict";
var Direction;

(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));

var dir = Direction.NORTH;
```

当然我们也可以设置 NORTH 的初始值，比如：

```js
enum Direction {
  NORTH = 3,
  SOUTH,    // 4
  EAST,     // 5
  WEST,     // 6
}
```

枚举的成员值也可以是字符串

```js
enum Enum {
  A,    // 0
  B,    // 1
  C = "C",
  D = "D",
  E = 8,
  F,    // 9  对应的值是离他最近的数字枚举值 + 1
}
```

以上代码对应的 ES5 代码如下：

```js
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```

### Any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型（也被称作全局超级类型）。它允许你在编译时可选择地包含或移除类型检查。

```js
let value: any = 666;
value = "abc";   //ok
value = false;   //ok

value.foo.bar; // OK
value.trim(); // OK
value();     // OK
new value(); // OK
value[0][1]; // OK
```

在许多场景下，这太宽松了。使用 any 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 any 类型，就无法使用 TypeScript 提供的大量的保护机制。为了解决 any 带来的问题，TypeScript 3.0 引入了 unknown 类型。

### Unknown 类型

就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）。

```js
let value: unknown;
value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

对 value 变量的所有赋值都被认为是类型正确的。但是，unknown 类型只能被赋值给 any 类型和 unknown 类型本身。

```js
let value: unknown;
let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

unknown 的作用就跟 any 高度类似了，你可以把它转化成任何类型，不同的地方是，在静态编译的时候，unknown 不能调用任何方法，而 any 可以。

```js
let value: unknown;
value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

### Void 类型

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void：

```js
function warnUser(): void {
    alert("This is my warning message");
}
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

```js
let unusable: void = undefined;
```

### Null 和 Undefined 类型

TypeScript 里，undefined 和 null 两者有各自的类型分别为 undefined 和 null。

```js
let u: undefined = undefined;
let n: null = null;
```

默认情况下null和undefined是所有类型的子类型。 

然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。

### Never 类型

never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```js
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

type human = 'boy' & 'girl' 
```

不过任何类型联合上 never 类型，还是原来的类型：

```js
type language = 'ts' | never   // language的类型还是'ts'类型
```

关于 never 有如下特性：

- 在一个函数中调用了返回 never 的函数后，之后的代码都会变成deadcode

```js
function test() {
  error();  		// 这里的error指上面返回never的函数
  console.log(111); 	// Error: 编译器报错，此行代码永远不会执行到
}
```

- 无法把其他类型赋给 never：

```js
let n: never;
let o: any = {};
n = o;  // Error: 不能把一个非never类型赋值给never类型，包括any
```

## 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

类型断言有两种形式：

1. “尖括号” 语法

```js
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

2. as 语法

```js
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 联合类型

能够通过联合类型将多个类型组合成一个类型

```ts
let arr: (number | string)[] = [1, 'a', 3, 'b']

type EventNames = 'click' | 'scroll' | 'mousemove';
```

- 解释：`|`（竖线）在 TS 中叫做**联合类型**，即：由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种
- 注意：这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（|| 或）混淆了

## 类型别名

能够使用类型别名给类型起别名

- `类型别名（自定义类型）`：为任意类型起别名
- 使用场景：当同一类型（复杂）被多次使用时，可以通过类型别名，**简化该类型的使用**

```ts
type CustomArray = (number | string)[]

let arr1: CustomArray = [1, 'a', 3, 'b']
let arr2: CustomArray = ['x', 'y', 6, 7]
```

- 解释:
  1. 使用 `type` 关键字来创建自定义类型
  2. 类型别名（比如，此处的 *CustomArray*）可以是任意合法的变量名称
  3. 推荐使用大写字母开头
  4. 创建类型别名后，直接使用该类型别名作为变量的类型注解即可

## 交叉类型

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```js
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
```

### 同名基础类型属性的合并

那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：

```js
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
```

在上面的代码中，接口 X 和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，此时 XY 类型或 YX 类型中成员 c 的类型是不是可以是 string 或 number 类型呢？比如下面的例子：

```js
p = { c: 6, d: "d", e: "e" };  // Err: Type 'number' is not assignable to type 'never'

q = { c: "c", d: "d", e: "e" };  // Err: Type 'string' is not assignable to type 'never'
```

为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 never 呢？这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

### 同名非基础类型属性的合并

在上面示例中，刚好接口 X 和接口 Y 中内部成员 c 的类型都是基本数据类型，那么如果是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：

```js
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);

// abc: {
//   x: {
//     d: true,
//     e: 'semlinker',
//     f: 666
//   }
// }
```
由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。

## 运算符

### 非空断言运算符 !

这个运算符可以用在变量名或者函数名之后，用来强调对应的元素是非 null|undefined 的

```js
function onClick(callback?: () => void) {
  callback!();		// 参数是可选入参，加了这个感叹号!之后，TS编译不报错
}
```

### 可选链运算符 ?.

?.用来判断左侧的表达式是否是 null | undefined，如果是则会停止表达式运行，可以减少我们大量的&&运算。

比如我们写出a?.b时，编译器会自动生成如下代码

```js
a === null || a === void 0 ? void 0 : a.b;
```

### 空值合并运算符 ??

??与||的功能是相似的，区别在于 ??在左侧表达式结果为 null 或者 undefined 时，才会返回右侧表达式 。

比如我们书写了let b = a ?? 10，生成的代码如下：

```js
let b = a !== null && a !== void 0 ? a : 10;
```

而 || 表达式，大家知道的，则对 false、''、NaN、0 等逻辑空值也会生效，不适于我们做对参数的合并。

## 操作符

### 键值获取 keyof

keyof 可以获取一个类型所有键值，返回一个联合类型，如下：

```js
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" 
type K3 = keyof { [x: string]: Person };  // string | number
```

### 实例类型获取 typeof

typeof 是获取一个对象/实例的类型，如下：

```js
const me: Person = { name: 'gzx', age: 16 };
type P = typeof me;  // { name: string, age: number | undefined }

function toArray(x: number): Array<number> {
  return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]
```

### 遍历属性 in

in 只能用在类型的定义中，可以对枚举类型进行遍历，如下：

```js
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

## 泛型

泛型在 TS 中可以说是一个非常重要的属性，它承载了从静态定义到动态调用的桥梁，同时也是 TS 对自己类型定义的元编程。泛型可以说是 TS 类型工具的精髓所在，也是整个 TS 最难学习的部分。

### 基本使用

泛型可以用在普通类型定义，类定义、函数定义上，如下：

```js
// 普通类型定义
type Dog<T> = { name: string, type: T }
// 普通类型使用
const dog: Dog<number> = { name: 'ww', type: 20 }

// 类定义
class Cat<T> {
  private type: T;
  constructor(type: T) { this.type = type; }
}
// 类使用
const cat: Cat<number> = new Cat<number>(20); // 或简写 const cat = new Cat(20)

// 函数定义
function swipe<T, U>(value: [T, U]): [U, T] {
  return [value[1], value[0]];
}
// 函数使用
swipe<Cat<number>, Dog<number>>([cat, dog])  // 或简写 swipe([cat, dog])
```

注意，如果对一个类型名定义了泛型，那么使用此类型名的时候一定要把泛型类型也写上去。

而对于变量来说，它的类型可以在调用时推断出来的话，就可以省略泛型书写。

### 泛型推导与默认值

我们可以简化对泛型类型定义的书写，因为TS会自动根据变量定义时的类型推导出变量类型，这一般是发生在函数调用的场合的。

```js
type Dog<T> = { name: string, type: T }

function adopt<T>(dog: Dog<T>) { return dog };

const dog = { name: 'ww', type: 'hsq' };  // 这里按照Dog类型的定义一个type为string的对象
adopt(dog);  // Pass: 函数会根据入参类型推断出type为string
```

若不适用函数泛型推导，我们若需要定义变量类型则必须指定泛型类型。

```js
const dog: Dog<string> = { name: 'ww', type: 'hsq' }  // 不可省略<string>这部分
```

如果我们想不指定，可以使用泛型默认值的方案。

```js
type Dog<T = any> = { name: string, type: T }
const dog: Dog = { name: 'ww', type: 'hsq' }
dog.type = 123;    // 不过这样type类型就是any了，无法自动推导出来，失去了泛型的意义
```

### 泛型约束

有的时候，我们可以不用关注泛型具体的类型，如：

```js
function fill<T>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}
```

这个函数接受一个长度参数和默认值，结果就是生成使用默认值填充好对应个数的数组。我们不用对传入的参数做判断，直接填充就行了，但是有时候，我们需要限定类型，这时候使用extends关键字即可。

```js
function sum<T extends number>(value: T[]): number {
  let count = 0;
  value.forEach(v => count += v);
  return count;
}
```

这样你就可以以sum([1,2,3])这种方式调用求和函数，而像sum(['1', '2'])这种是无法通过编译的。

泛型约束也可以用在多个泛型参数的情况。

```js
function pick<T, U extends keyof T>(){};
```

这里的意思是限制了 U 一定是 T 的 key 类型中的子集，这种用法常常出现在一些泛型工具库中。

### 泛型条件

上面提到 extends，其实也可以当做一个三元运算符，如下：

```js
T extends U? X: Y
```

这里便不限制 T 一定要是 U 的子类型，如果是 U 子类型，则将 T 定义为 X 类型，否则定义为 Y 类型。

### 泛型推断 infer

infer 的中文是“推断”的意思，一般是搭配上面的泛型条件语句使用的，所谓推断，就是你不用预先指定在泛型列表中，在运行时会自动判断，不过你得先预定义好整体的结构。举个例子

```js
type Foo<T> = T extends {t: infer Test} ? Test: string
```

首选看 extends 后面的内容，{t: infer Test}可以看成是一个包含t属性的类型定义，这个t属性的 value 类型通过infer进行推断后会赋值给Test类型，如果泛型实际参数符合{t: infer Test}的定义那么返回的就是Test类型，否则默认给缺省的string类型。

```js
type One = Foo<number>  // string，因为number不是一个包含t的对象类型
type Two = Foo<{t: boolean}>  // boolean，因为泛型参数匹配上了，使用了infer对应的type
type Three = Foo<{a: number, t: () => void}> // () => void，泛型定义是参数的子集，同样适配
```

infer用来对满足的泛型类型进行子类型的抽取

## 泛型工具

### Partial<T>

此工具的作用就是将泛型中全部属性变为可选的。

```js
type Partial<T> = {
	[P in keyof T]?: T[P]
}
```

举个例子，这个类型定义在下面也会用到。

```js
type Animal = {
  name: string,
  category: string,
  age: number,
  eat: () => number
}
```

使用 Partial 包裹一下。

```js
type PartOfAnimal = Partial<Animal>;
const ww: PartOfAnimal = { name: 'ww' }; // 属性全部可选后，可以只赋值部分属性了
```

### Record<K, T>

此工具的作用是将 K 中所有属性值转化为 T 类型，我们常用它来申明一个普通 object 对象。

```js
type Record<K extends keyof any,T> = {
  [key in K]: T
}
```

这里特别说明一下，keyof any对应的类型为number | string | symbol，也就是可以做对象键(专业说法叫索引 index)的类型集合。

举个例子：

```js
const obj: Record<string, string> = { 'name': 'zhangsan', 'tag': '打工人' }
```

### Pick<T, K>

此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。

```js
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

我们还是用上面的Animal定义，看一下 Pick 如何使用。

```js
const bird: Pick<Animal, "name" | "age"> = { name: 'bird', age: 1 }
```

### Exclude<T, U>

此工具是在 T 类型中，去除 T 类型和 U 类型的交集，返回剩余的部分。

```js
type Exclude<T, U> = T extends U ? never : T
```

注意这里的 extends 返回的 T 是原来的 T 中和 U 无交集的属性，而任何属性联合 never 都是自身

```js
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;   // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

### Omit<T, K>

此工具可认为是适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。

```js
type Omit = Pick<T, Exclude<keyof T, K>>
```

在定义中，第一步先从 T 的 key 中去掉与 K 重叠的 key，接着使用 Pick 把 T 类型和剩余的 key 组合起来即可。

还是用上面的 Animal 举个例子：

```js
const OmitAnimal:Omit<Animal, 'name'|'age'> = { category: 'lion', eat: () => { console.log('eat') } }
```

可以发现，Omit 与 Pick 得到的结果完全相反，一个是取非结果，一个取交结果。

### ReturnType<T>

此工具就是获取 T 类型(函数)对应的返回值类型：

```js
type ReturnType<T extends (...args: any) => any>
  = T extends (...args: any) => infer R ? R : any;
```

```js
function foo(x: string | number): string | number { /*..*/ }
type FooType = ReturnType<foo>;  // string | number
```

### Required<T>

此工具可以将类型 T 中所有的属性变为必选项。

```js
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

这里有一个很有意思的语法-?，你可以理解为就是 TS 中把?可选属性减去的意思。

除了这些以外，还有很多的内置的类型工具，可以参考[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/utility-types.html)获得更详细的信息，同时 Github 上也有很多第三方类型辅助工具，如[utility-types](https://github.com/piotrwitek/utility-types)等。

## TypeScript 装饰器

装饰器是最新的 ECMA 中的一个提案，是一种与类（class）相关的语法，用来注释或修改类和类方法。

- 它是一个表达式
- 该表达式被执行后，返回一个函数
- 函数的入参分别为 target、name 和 descriptor
- 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象

### 装饰器的分类

- 类装饰器（Class decorators）
- 属性装饰器（Property decorators）
- 方法装饰器（Method decorators）
- 参数装饰器（Parameter decorators）

需要注意的是，若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用 experimentalDecorators 编译器选项：

命令行：

```js
tsc --target ES5 --experimentalDecorators
```
tsconfig.json：

```js
{
  "compilerOptions": {
     "target": "ES5",
     "experimentalDecorators": true
   }
}
```

### 类装饰器

类装饰器一般会接收一个目标类作为参数(target: TFunction - 被装饰的类)

```js
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
(myGreeting as any).greet();  // 'Hello Semlinker!';
```

如果想要传参数，可以：

```js
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

@Greeter("Hello TS!")
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
(myGreeting as any).greet(); // console output: 'Hello TS!';
```

### 属性装饰器

类属性装饰器可以用在类的属性、方法、get/set 函数中，一般会接收三个参数：

- target：被修饰的类
- name：string | symbol -类成员的名字
- descriptor：属性描述符，对象会将这个参数传给 Object.defineProperty

```js
// 只读
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
class Person {
    @readonly name = 'person'
}
const person = new Person();
person.name = 'tom'; 
```
```js
// 统计函数的执行时间
function time(target, name, descriptor) {
    const func = descriptor.value;
    if (typeof func === 'function') {
        descriptor.value = function(...args) {
            console.time();
            const results = func.apply(this, args);
            console.timeEnd();
            return results;
        }
    }
}
class Person {
    @time
    say() {
        console.log('hello')
    }
}
const person = new Person();
person.say();
```

### 参数装饰器

参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：

- target: Object - 被装饰的类
- name：string | symbol -类成员的名字
- parameterIndex: number - 方法中参数的索引值

```js
function Log(target: Function, name: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
	been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
	this.greeting = phrase; 
  }
}
//  "The parameter in position 0 at Greeter has been decorated" 
```

### 装饰器组合

装饰器是可以叠加的，根据离被装饰类/属性的距离来依次执行。

```js
class Person {
    @time
    @log
    say() {}
}
```

## 在 React 项目中使用 TS

### 创建新项目

- 命令：`npx create-react-app my-app --template typescript` 
- 说明：在命令行中，添加 `--template typescript` 表示创建支持 TS 的项目

- 项目目录的变化：
  1. 在项目根目录中多了一个文件：`tsconfig.json`
     - TS 的配置文件
  2. 在 src 目录中，文件的后缀有变化，由原来的 .js 变为 `.ts` 或 `.tsx`   
     - `.ts` ts 文件的后缀名
     - `.tsx` 是在 TS 中使用 React 组件时，需要使用该后缀，只要文件中使用了jsx模板，后缀名必须叫tsx
  3. 在 src 目录中，多了 `react-app-env.d.ts` 文件
     - `.d.ts` 类型声明文件，用来指定类型

### tsconfig的介绍

- tsconfig.json是typescript项目的配置文件，用于配置typescript
- tsconfig.json配置文件可以通过 `tsc --init` 生成
- 说明：所有的配置项都可以通过鼠标移入的方式，来查看配置项的解释说明。
- [tsconfig 文档链接](https://www.typescriptlang.org/tsconfig)

### 类型声明文件

.d.ts 结尾的文件，为.js文件提供类型声明。

- 说明:在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件。
- declare 关键字:用于类型声明，为其他地方(比如，.js 文件)已存在的变量声明类型，而不是创建一个新的变量。
  1. 对于 type、interface 等这些明确就是 TS 类型的(只能在 TS 中使用的)，可以省略 declare 关键字。
  2. 对于 let、function 等具有双重含义(在 JS、TS 中都能用)，应该使用 declare 关键字，明确指定此处用于类型声明。

```jsx
let count = 10
let songName = '痴心绝对'
let position = {
  x: 0,
  y: 0
}

function add(x, y) {
  return x + y
}

function changeDirection(direction) {
  console.log(direction)
}

const fomartPoint = point => {
  console.log('当前坐标：', point)
}
```

定义类型声明文件

```jsx
declare let count:number

declare let songName: string

interface Position {
  x: number,
  y: number
}

declare let position: Position

declare function add (x :number, y: number) : number

type Direction = 'left' | 'right' | 'top' | 'bottom'

declare function changeDirection (direction: Direction): void

type FomartPoint = (point: Position) => void

declare const fomartPoint: FomartPoint
```

### 类型声明文件-第三方库 

- 目前，几乎所有常用的第三方库都有相应的类型声明文件
- 第三方库的类型声明文件有两种存在形式:1 库自带类型声明文件 2 由 DefinitelyTyped 提供。 

1. 库自带类型声明文件：比如，axios

解释：这种情况下，正常导入该库，**TS 就会自动加载库自己的类型声明文件**，以提供该库的类型声明。

2. 由 DefinitelyTyped 提供

- DefinitelyTyped 是一个 github 仓库，用来提供高质量 TypeScript 类型声明
- [DefinitelyTyped 链接](https://github.com/DefinitelyTyped/DefinitelyTyped/)
- 可以通过 npm/yarn 来下载该仓库提供的 TS 类型声明包，这些包的名称格式为:`@types/*`
- 比如，@types/react、@types/lodash 等
- 说明：在实际项目开发时，如果你使用的第三方库没有自带的声明文件，VSCode 会给出明确的提示

### useState的使用

`useState`接收一个泛型参数，用于指定初始值的类型

```jsx
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

`useState`的使用：

```jsx
type Res = {
  id: number
  name: string
}[]
const [name, setName] = useState<string>('张三')
const [age, setAge] = useState<number>(28)
const [isProgrammer, setIsProgrammer] = useState<boolean>(true)
const [list, setList] = useState<Res>([])

// 如果你在set函数中的参数不符合声明的变量类型，程序会报错
<button onClick={() => setName(100)}>按钮</button>  // 报错
```

`useState`的类型推断，在使用useState的时候，只要提供了初始值，typescript会自动根据初始值进行类型推断，因此`useState`的泛型参数可以省略

### useEffect的使用

`useEffect`函数不涉及到任何泛型参数，在typescript中使用和javascript中使用完全一致。

```js
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
```

### useRef的使用

`useRef` 接收一个泛型参数

```js
function useRef<T>(initialValue: T): MutableRefObject<T>;
    
interface MutableRefObject<T> {
    current: T;
}
```

+ `useRef`的泛型参数用于指定current属性的值的类型
+ 如果使用useRef操作DOM，需要明确指定所操作的DOM的具体的类型，否则current属性会是null(**技巧：**如何获取一个DOM对象的类型，鼠标直接移动到该元素上，就会显示出来该元素的类型)

```jsx
const inputRef = useRef<HTMLInputElement>(null)
const get = () => {
  console.log(inputRef.current?.value)
}
```

### useHistory的使用

```jsx
export function useHistory<HistoryLocationState = H.LocationState>(): H.History<HistoryLocationState>;
```

+ useHistory如果仅仅实现跳转功能，和js中使用语法一致

```jsx
const history = useHistory()
const login = () => {
  history.push('/login')
}
```

+ useHistory可以通过泛型参数来指定state的类型

```tsx
const history = useHistory<{
  name: string
}>()
const login = () => {
  history.push({
    pathname: '/login',
    state: {
      name: 'zs',
    },
  })
}
```

### useLocation的使用

useLocation接收一个泛型参数，用于指定接收的state类型

```jsx
export function useLocation<S = H.LocationState>(): H.Location<S>;
```

基本使用

```jsx
import { useLocation } from 'react-router'

const location = useLocation<{ name: string } | null>()
const name = location.state?.name
```

### useParams的使用

useParams接收一个泛型参数，用于指定params对象的类型

```jsx
import { useParams } from 'react-router'

const params = useParams<{ id: string }>()
console.log(params.id)
```