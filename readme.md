基于 webpack5+vue3 做的单页面

* vue3 使用过程中遇到的点
  配置：
  * 与Vue2不同的是，编译的包由vue-template-compiler 变成 vue/compiler-sfc
    
  查漏补缺：
  * 内置特殊元素 component 的 is 属性：当 is 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。或者，is 也可以直接绑定到组件的定义。

  
  新特性：
  * filter 被取消了
  * 生命周期部分命名修改了，新增了renderTracked、renderTriggered


* 新增
  1. scss
  2. 多页面展示
  3. three

* three
  * three1 入门
    * 场景 **Scene**、Fog、FogExp2
    * 相机 **PerspectiveCamera**、OrthographicCamera、StereoCamera等
    * 渲染器 **WebGLRenderer** 等
    * 几何体 **BoxGeometry** 等
    * 材质 **MeshBasicMaterial** 等
    * 利用 requestAnimationFrame 方法制作动画
  * three2 入门
    * 灯光 **PointLight** 等
    * 控制器 **OrbitControls** 等
  * three3 学习加载模型
    * 加载器 **GLTFLoader** 等
        > 由于不知道加载模型加载成功没有，就去看了源码。发现GLTFLoader 是运用了 FileLoader 函数，其实就是运用了fetch请求方法。对比了three以前的版本，他们的区别是旧版使用的是XMLHttpRequest，而新版运用了 fetch 方法。fetch 没有 progress 的方法与，就利用 ProgressEvent 方法去测量请求过程的速度等，而 XMLHttpRequest 是本身自带 progress 方法的。

        > 检查加载成功后，还是找不到模型。就调试了下相机、灯光的位置才发现了。

        > 不知道为什么我导入的模型，只写一行不行，要加个动画一直渲染才行。因为我看很多博主写的都一行也行，不知道是不是模型的问题。并且，我用几何体时也可以。

          <!-- 只有这句 -->
          renderer.render(scene, camera);
          <!-- 加了动画 -->
          const animate = () => {
            requestAnimationFrame(tick);
            renderer.render(scene, camera);
            controls.update();
          }
          animate();
        
        (```)

        > 加
    * 控制器 **OrbitControls** 等
      > three 在用多个 scene 情况下，我用 OrbitControls 也没办法生效。发现只用一个 scene 时就生效了。有待考证如果在多个 scene 情况下该怎么转动！
      > 加了控制器以后模型的位置发生变化，我看相机的 position 没变。
    * 灯光 **DirectionalLight**、**PointLight** 等