import * as THREE from "three";

// 全局变量
const rotationSpeed = 222;
let camera, scene, renderer;
let earth, moon, satellite;
let clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();

init();
animate();

// 初始化
function init() {
  // 常量
  const earthR = 5;
  const moonR = 0.5;
  const satelliteR = 0.1;
  // 相机
  camera = new THREE.PerspectiveCamera(
    20,
    (window.innerWidth ) / (window.innerHeight - 200),
    50,
    1e7
  );
  camera.position.set(0, 0, 70);

  // 场景
  scene = new THREE.Scene();

  // 光源
  scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  const envLight = new THREE.DirectionalLight(0xffffff);
  envLight.position.set(-10, 0, 20).normalize();
  envLight.intensity = 2;
  envLight.castShadow = true;
  scene.add(envLight);

  // 地球
  const earthGeometry = new THREE.SphereGeometry(earthR);
  const earthMaterial = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: textureLoader.load("./orbit/textures/planets/earth_atmos_2048.jpg"),
    specularMap: textureLoader.load("./orbit/textures/planets/earth_specular_2048.jpg"),
    normalMap: textureLoader.load("./orbit/textures/planets/earth_normal_2048.jpg"),

    // y scale is negated to compensate for normal map handedness.
    normalScale: new THREE.Vector2(0.85, -0.85),
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  // 月球
  const moonGeometry = new THREE.SphereGeometry(moonR);
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load("./orbit/textures/planets/moon_1024.jpg"),
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);

  // 卫星
  const satelliteGeometry = new THREE.SphereGeometry(satelliteR);
  const satelliteMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load("./orbit/textures/planets/moon_1024.jpg"),
  });
  satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
  scene.add(satellite);

  // 渲染
  const canvas = document.querySelector("#orbit");
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth , window.innerHeight - 200);

  // 阴影
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // 自动缩放
  window.addEventListener("resize", () => {
    // Update Sizes
    screenSize.width = window.innerWidth;
    screenSize.height = window.innerHeight;

    // Update Camera
    camera.aspect = screenSize.width / (screenSize.height - 200);
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(screenSize.width, screenSize.height - 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}

// 动画帧
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const elapsed = clock.getElapsedTime();
  const delta = clock.getDelta();

  // 月球
  moon.position.set(Math.sin(elapsed / 5) * 25, 0, Math.cos(elapsed / 5) * 25);

  // 卫星
  satellite.position.set(
    Math.sin(elapsed / 3) * 6,
    Math.cos(elapsed / 3) * 6,
    0
  );

  // 摄像机
  // camera.position.set(
  // 	Math.sin(elapsed / 3) / 111,
  // 	Math.cos(elapsed / 3) / 11,
  // 	0
  // );

  // 地球自转
  earth.rotation.y += rotationSpeed * delta;
  renderer.render(scene, camera);
}
