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
		renderer.outputEncoding = THREE.sRGBEncoding;

		// 做2个渲染器就不给旋转了！！
		// 初始化渲染器2
		// const canvas2 = this.$refs.detail
		// const renderer2 = new THREE.WebGLRenderer({ 
		// 	canvas: canvas2,
		// 	antialias: false
		// });
		// renderer2.setSize(sizes.width, sizes.height);
		// renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		// renderer2.autoClear = true;

		// 初始化场景
		const scene = new THREE.Scene();

		// 初始化相机
		const cameraGroup = new THREE.Group();
		scene.add(cameraGroup);
		const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100)
		camera.position.set(0 ,2, 15);
		cameraGroup.add(camera);

		// 直射光
		const directionLight = new THREE.DirectionalLight(0xffffff, .8);
		directionLight.position.set(-50, 19, 20);
		scene.add(directionLight);
		// 添加灯光
		const light = new THREE.PointLight( 'orange', 2.7, 4, 3 );
		light.position.set( 2, 0, 2);
		scene.add(light);
		
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath( '/draco/' );
		dracoLoader.setDecoderConfig({ type: 'js' });
		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);
		// 模型加载
		let oldMaterial;
		loader.load('/model/statue.glb', function (gltf) {
			gltf.scene.traverse((obj) => {
				if (obj.isMesh) {
					oldMaterial = obj.material;
					obj.material = new THREE.MeshPhongMaterial({
						shininess: 100
					})
				}
			})
			scene.add(gltf.scene);
			oldMaterial.dispose();
			renderer.renderLists.dispose();
		});
		// 鼠标事件 灯光移动
		this.$cursor= {x:0, y:0}
		document.addEventListener('mousemove', this.mouseEvent, false);

		// 动画
		const clock = new THREE.Clock()
		let previousTime = 0;
		const animate = () => {
			const elapsedTime = clock.getElapsedTime(),
				deltaTime = elapsedTime - previousTime;
			previousTime = elapsedTime;
			const { y: parallaxY, x: parallaxX } = this.$cursor;
			light.position.y -= (parallaxY * 9 + light.position.y - 2) * deltaTime;
			light.position.x += (parallaxX * 8 - light.position.x) * 2 * deltaTime;
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}
		animate();
    },
	methods: {
		mouseEvent(e) {
			e.preventDefault();
			this.$cursor.x = e.clientX / window.innerWidth - .5;
			this.$cursor.y = e.clientY / window.innerHeight - .5;
		}
	},
	beforeUnmount() {
		document.removeEventListener('mousemove', this.mouseEvent)
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