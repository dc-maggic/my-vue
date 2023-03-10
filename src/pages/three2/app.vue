<template>
    <canvas id="wrapper" ref="wrapper"/>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
		scene.background = new THREE.Color(0x1A1A1A);
		scene.fog = new THREE.Fog(0x1A1A1A, 1, 1000);

		// 初始化相机
		const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
		// camera.position.set(2, 1, 4);
		camera.position.z = 10
		scene.add(camera);

		// 添加球体作星球
		const sphereGeometry = new THREE.SphereGeometry( 1 );
		const material = new THREE.MeshBasicMaterial( { color: 'pink', wireframe: true } );
		const sphere = new THREE.Mesh( sphereGeometry, material );
		sphere.rotation.y = -0.1 * (Math.PI / 2);
		scene.add( sphere );
		// 添加圆环作轨道
		const torusGeometry = new THREE.TorusGeometry( 1.5, 0.1 );
		const torusMaterial  = new THREE.MeshBasicMaterial( { color: 'orange', wireframe: true } );
		const torus = new THREE.Mesh( torusGeometry, torusMaterial );
		torus.rotation.x =  Math.PI / 2;
		torus.rotation.y = -0.1 * (Math.PI / 2);
		scene.add( torus );
		// 添加多面体作卫星
		const icosahedronGeometry = new THREE.IcosahedronGeometry(0.15, 0);
		const icosahedronMaterial = new THREE.MeshBasicMaterial( { color: 'yellow' } );
		const icosahedron = new THREE.Mesh( icosahedronGeometry, icosahedronMaterial );
			icosahedron.position.y = 1.5 * Math.cos(rot);
			icosahedron.position.x = 1.5 * Math.cos(rot);
		scene.add( icosahedron );

		// 添加控制器
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		// 添加灯光
		// const light = new THREE.AmbientLight(0xffffff, 1.5);
		// scene.add(light);

		renderer.render( scene, camera );
		const axis = new THREE.Vector3(0, 0, 1);
		let rot = 0;
		// 动画循环
		function animate() {
			requestAnimationFrame( animate );
			sphere && (sphere.rotation.y += .005);
			torus && torus.rotateOnAxis(axis, Math.PI / 400);
			rot += 0.01;
			icosahedron.position.z = 1.5 * Math.sin(rot);
			icosahedron.position.y = 1.5 * Math.cos(rot);
			icosahedron.position.x = 1.5 * Math.cos(rot);
			icosahedron.rotation.x += 0.01;
			icosahedron.rotation.y += 0.01;
			icosahedron.rotation.z += 0.01;
			renderer.render( scene, camera );
			controls.update();
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