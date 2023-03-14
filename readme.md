基于 webpack5+vue3 做的单页面

* vue3 使用过程中遇到的点
  配置：
  * 与Vue2不同的是，编译的包由vue-template-compiler 变成 vue/compiler-sfc
    
  查漏补缺：
  * 内置特殊元素 component 的 is 属性：当 is 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。或者，is 也可以直接绑定到组件的定义。
  * three 的 GLTFLoader 是运用了 FileLoader 函数，其实就是运用了fetch请求方法。对比了three以前的版本，他们的区别是旧版使用的是XMLHttpRequest，而新版运用了 fetch 方法。fetch 没有 progress 的方法与，就利用 ProgressEvent 方法去测量请求过程的速度等，而 XMLHttpRequest 是本身自带 progress 方法的。
  
  新特性：
  * filter 被取消了
  * 生命周期部分命名修改了，新增了renderTracked、renderTriggered


* 新增
  1. scss
  2. 多页面展示
...待补充