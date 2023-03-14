<template>
    <div class='shadow_page'>
		<!-- <div id="loading-text-intro"><p>Loading</p></div> -->
		<div class="content">
			<nav class="header"></nav>
			<section class="section first">
			<div class='info'></div>
			<canvas id='canvas-container' class='wrapper' ref="container"></canvas>
			</section>
			<section class="section second">
			<div class="second-container"></div>
			<canvas id='canvas-container-details' class='wrapper' ref="detail"></canvas>
			</section>
		</div>
	</div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Clock, Scene, LoadingManager, WebGLRenderer, sRGBEncoding, Group, PerspectiveCamera, DirectionalLight, PointLight, MeshPhongMaterial, AmbientLight } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export default{
    name: 'three3',
    mounted() {
        // 定义渲染尺寸
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		// 初始化渲染器1
		const canvas1 = this.$refs.container
		const renderer = new THREE.WebGLRenderer({ 
			canvas: canvas1,
			// antialias: true,
			// alpha: true,
			// powerPreference: 'high-performance' 
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		// renderer.autoClear = true;
		// outputEncoding 属性控制输出渲染编码。
		renderer.outputEncoding = sRGBEncoding;

		// 初始化渲染器2
		const canvas2 = this.$refs.detail
		const renderer2 = new THREE.WebGLRenderer({ 
			canvas: canvas2,
			antialias: false
		});
		renderer2.setSize(sizes.width, sizes.height);
		renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer2.autoClear = true;

		// 初始化场景
		const scene = new THREE.Scene();

		// 初始化相机
		const cameraGroup = new Group();
		scene.add(cameraGroup);
		const camera = new PerspectiveCamera(35, sizes.width / sizes.height, 1, 100)
		camera.position.set(0 ,2, 10);
		cameraGroup.add(camera);



		// 直射光
		const directionLight = new DirectionalLight(0xffffff, .8);
		directionLight.position.set(5, 5, 7.5);
		scene.add(directionLight);


		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath( '/draco/' );
		dracoLoader.setDecoderConfig({ type: 'js' });
		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);
		// 模型加载
		let oldMaterial;
		loader.load('/model/statue.glb', function (gltf) {

				console.log(gltf)
			gltf.scene.traverse((obj) => {
				if (obj.isMesh) {
					oldMaterial = obj.material;
					obj.material = new MeshPhongMaterial({
						shininess: 100
					})
				}
			})
			scene.add(gltf.scene);
			oldMaterial.dispose();
			renderer.renderLists.dispose();
		});
		const tick = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		}
		tick();
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