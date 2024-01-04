# 微信小程序
网页开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应，而在小程序中，二者是分开的，分别运行在不同的线程中。

## 小程序配置 app.json
[小程序配置 app.json]('https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html')

## 场景值
场景值用来描述用户进入小程序的路径。

对于小程序，可以在 App 的 onLaunch 和 onShow，或wx.getLaunchOptionsSync 中获取场景值。

## 逻辑层
注意：小程序框架的逻辑层并非运行在浏览器中，因此 JavaScript 在 web 中一些能力都无法使用，如 window，document 等。


## 注册小程序
[App()]('https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html')

注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。

App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。

整个小程序只有一个 App 实例，是全部页面共享的。开发者可以通过 getApp 方法获取到全局唯一的 App 实例，获取App上的数据或调用开发者注册在 App 上的函数。

## 注册页面
[Page()]('https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html')

对于小程序中的每个页面，都需要在页面对应的 js 文件中进行注册，指定页面的初始数据、生命周期回调、事件处理函数等。

简单的页面可以使用 Page() 进行构造。

## Component 构造器
Page 构造器适用于简单的页面。但对于复杂的页面， Page 构造器可能并不好用。
此时，可以使用 Component 构造器来构造页面。 Component 构造器的主要区别是：方法需要放在 methods: { } 里面。

Component 构造器也可用于定义组件，调用 Component 构造器时可以指定组件的属性、数据、方法等。

## 页面路由
[页面路由]('https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html')

开发者可以使用 getCurrentPages() 函数获取当前页面栈。

## 模块化
可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 module.exports 或者 exports 才能对外暴露接口。


## wxml 模版
```js
<!--wxml-->
<template name="staffName">
  <view>
    FirstName: {{firstName}}, LastName: {{lastName}}
  </view>
</template>

<template is="staffName" data="{{...staffA}}"></template>
<template is="staffName" data="{{...staffB}}"></template>
<template is="staffName" data="{{...staffC}}"></template>
```
```js
// page.js
Page({
  data: {
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'}
  }
})
```

## WXSS
尺寸单位:
rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

使用@import语句可以导入外联样式表，@import后跟需要导入的外联样式表的相对路径，用;表示语句结束。
```js
/** common.wxss **/
.small-p {
  padding:5px;
}
```
```js
/** app.wxss **/
@import "common.wxss";
.middle-p {
  padding:15px;
}
```

定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。

## wxs
WXS（WeiXin Script）是内联在 WXML 中的脚本段，是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。

[wxs语法]('https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/')

```js
<!--wxml-->
<wxs module="m1">
var msg = "hello world";

module.exports.message = msg;
</wxs>

<view> {{m1.message}} </view>
```

### 模块
每一个 .wxs 文件和 <wxs> 标签都是一个单独的模块。
每个模块都有自己独立的作用域。即在一个模块里面定义的变量与函数，默认为私有的，对其他模块不可见。
一个模块要想对外暴露其内部的私有变量与函数，只能通过 module.exports 实现。

### require函数
在.wxs模块中引用其他 wxs 文件模块，可以使用 require 函数。

引用的时候，要注意如下几点：

- 只能引用 .wxs 文件模块，且必须使用相对路径。
- wxs 模块均为单例，wxs 模块在第一次被引用时，会自动初始化为单例对象。多个页面，多个地方，多次引用，使用的都是同一个 wxs 模块对象。
- 如果一个 wxs 模块在定义之后，一直没有被引用，则该模块不会被解析与运行。

### <wxs> 标签
1、module 属性
module 属性是当前 <wxs> 标签的模块名。在单个 wxml 文件内，建议其值唯一。有重复模块名则按照先后顺序覆盖（后者覆盖前者）。不同文件之间的 wxs 模块名不会相互覆盖。

module 属性值的命名必须符合下面两个规则：

- 首字符必须是：字母（a-zA-Z），下划线（_）
- 剩余字符可以是：字母（a-zA-Z），下划线（_）， 数字（0-9）

2、src 属性
src 属性可以用来引用其他的 wxs 文件模块。

引用的时候，要注意如下几点：

- 只能引用 .wxs 文件模块，且必须使用相对路径。
- wxs 模块均为单例，wxs 模块在第一次被引用时，会自动初始化为单例对象。多个页面，多个地方，多次引用，使用的都是同一个 wxs 模块对象。
- 如果一个 wxs 模块在定义之后，一直没有被引用，则该模块不会被解析与运行。


### 注意事项
- <wxs> 模块只能在定义模块的 WXML 文件中被访问到。使用 <include> 或 <import> 时，<wxs> 模块不会被引入到对应的 WXML 文件中。
- <template> 标签中，只能使用定义该 <template> 的 WXML 文件中定义的 <wxs> 模块。

## 获取节点信息
[wx.createSelectorQuery()]('https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html')

## 动画
[this.animate]('https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html')


## skyline渲染引擎
当小程序基于 WebView 环境下时，WebView 的 JS 逻辑、DOM 树创建、CSS 解析、样式计算、Layout、Paint (Composite) 都发生在同一线程，在 WebView 上执行过多的 JS 逻辑可能阻塞渲染，导致界面卡顿。以此为前提，小程序同时考虑了性能与安全，采用了目前称为「双线程模型」的架构。

在 Skyline 环境下，我们尝试改变这一情况：Skyline 创建了一条渲染线程来负责 Layout, Composite 和 Paint 等渲染任务，并在 AppService 中划出一个独立的上下文，来运行之前 WebView 承担的 JS 逻辑、DOM 树创建等逻辑。

这种新的架构相比原有的 WebView 架构，有以下特点：

- 界面更不容易被逻辑阻塞，进一步减少卡顿
- 无需为每个页面新建一个 JS 引擎实例（WebView），减少了内存、时间开销
- 框架可以在页面之间共享更多的资源，进一步减少运行时内存、时间开销
- 框架的代码之间无需再通过 JSBridge 进行数据交换，减少了大量通信时间开销

