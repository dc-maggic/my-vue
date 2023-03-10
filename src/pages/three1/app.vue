<template>
    <canvas id="wrapper" ref="wrapper"/>
</template>
<script>
import * as THREE from 'three';
export default{
    name: 'three1',
    mounted() {
		// 场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。

        // 定义渲染尺寸
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		// 初始化渲染器
		const canvas = this.$refs.wrapper
		const renderer = new THREE.WebGLRenderer({ canvas: canvas });
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// 初始化场景
		const scene = new THREE.Scene();

		// 初始化相机
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
		camera.position.z = 3;
		scene.add(camera);

		// 添加立方体
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshBasicMaterial( { color: 'pink' } );
		const cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;
		// 动画循环
		function animate() {
			requestAnimationFrame( animate );
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render( scene, camera );
		}
		animate();
    },
	methods: {
	}
}

</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html, body {
  overflow: hidden;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>