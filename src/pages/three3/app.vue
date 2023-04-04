<template>
    <div class='shadow_page'>
		<transition>
			<div class="loading" v-show="loading"><p>Loading</p></div>
		</transition>
		<div class="content" v-show="!loading">
			<nav class="header"></nav>
			<section class="section first">
			<div class='info'>
				<button @click="rotateEvent">向左转90</button>
				<button @click="rotateEvent">向右转90</button>
			</div>
			<canvas id='canvas-container' class='wrapper' ref="container"></canvas>
			</section>
		</div>
	</div>
</template>
<script>
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
export default{
    name: 'three3',
	data() {
		return {
			loading: true
		}
	},
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
			antialias: true, // antialias - 是否执行抗锯齿。
			// alpha: true, //说是控制 alpha 值，不知道具体
			// powerPreference: 'high-performance' 
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		// renderer.autoClear = true;
		// outputEncoding 属性控制输出渲染编码。
		renderer.outputEncoding = THREE.sRGBEncoding;

		// 初始化场景
		const scene = new THREE.Scene();

		// 初始化相机
		const cameraGroup = new THREE.Group();
		scene.add(cameraGroup);
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
		camera.position.set(19, 1.54, -.1);
		cameraGroup.add(camera);

		// 直射光
		const directionLight = new THREE.DirectionalLight(0xffffff, .8);
		directionLight.position.set(-50, 19, 20);
		scene.add(directionLight);
		// 添加灯光
		const light = new THREE.PointLight( 'orange', 2.7, 4, 3 );
		light.position.set( 100, 0, 2);
		scene.add(light);
		
		// 加载器
		const manager = new THREE.LoadingManager();
		manager.onLoad = ()=> {
			this.loading = false
			// 隐藏加载页面动画
			new TWEEN.Tween({y:0})
				.to({ y: 100 }, 1000)  //1s时间y到10
				.easing(TWEEN.Easing.Quadratic.InOut)
    			.start()
				.onComplete(function () {  //动画完成
					TWEEN.remove(this);
				});
			// 使用Tween给相机添加入场动画
			new TWEEN.Tween(
				camera.position.set(0, 2, 1.2))
				.to({ x: 0, y: 2, z: 3.2 }, 2000)
				.easing(TWEEN.Easing.Quadratic.InOut)
    			.start()
				.onComplete(function () {
					TWEEN.remove(this);
				});
			window.scroll(0, 0)
		}

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath( '/draco/' );
		dracoLoader.setDecoderConfig({ type: 'js' });
		const loader = new GLTFLoader(manager);
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
			// 这里咋计算的？
			light.position.y -= (parallaxY * 8 + light.position.y - 2) * deltaTime;
			light.position.x += (parallaxX * 8 - light.position.x) * 2 * deltaTime;
			TWEEN.update();
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}
		animate();
    },
	methods: {
		mouseEvent(e) {
			e.preventDefault();
			this.$cursor.x = e.clientX / window.innerWidth - 0.5;
			this.$cursor.y = e.clientY / window.innerHeight - 0.5;
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
.loading {
  z-index: 3;
  position: absolute;
  width: 100vw;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #f9f0ec;
  background: radial-gradient(circle at center center, #5d5d5d 0, #090909 58%);
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translate(0, 100%);
}
.info {
	z-index: 1;
	color: red;
	position: absolute;
}
</style>