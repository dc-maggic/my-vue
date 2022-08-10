基于 webpack5+vue3 做的单页面

* vue3 使用过程中遇到的点
  配置：
  * 与Vue2不同的是，编译的包由vue-template-compiler 变成 vue/compiler-sfc
    
  查漏补缺：
  * 内置特殊元素 component 的 is 属性：当 is 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。或者，is 也可以直接绑定到组件的定义。
  
  新特性：
  * filter 被取消了
  * 生命周期部分命名修改了，新增了renderTracked、renderTriggered

...待补充