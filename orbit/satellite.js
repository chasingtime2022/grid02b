import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  // renderer.setClearColor(0xaaaaaa);
  renderer.shadowMap.enabled = true;
  const textureLoader = new THREE.TextureLoader();

  // 摄像机创建函数
  function makeCamera(fov = 40) {
    const aspect = 2; // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }

  const scene = new THREE.Scene();

  //   // 地平面建模;
  //   const groundGeometry = new THREE.PlaneGeometry(1, 1);
  //   const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xcc8866 });
  //   const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  //   groundMesh.receiveShadow = true;
  //   scene.add(groundMesh);

  // 球体建模
  const objects = [];

  const radius = 1;
  // const widthSegments = 6;
  // const heightSegments = 6;
  const sphereGeometry = new THREE.SphereGeometry(
    radius
    // widthSegments,
    // heightSegments
  );

  // 太阳系 solarSystem
  const solarSystem = new THREE.Object3D();
  objects.push(solarSystem);
  scene.add(solarSystem);

  // 太阳 sun
  // const sunMaterial = new THREE.MeshPhongMaterial({
  //   // map: textureLoader.load("./satellite/color_512_0.png"),
  //   color: 0xffffff,
  // });
  // const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  // sunMesh.scale.set(5, 5, 5);
  // solarSystem.add(sunMesh);
  // objects.push(sunMesh);

  // 太阳放光
  // const emitLight1 = new THREE.DirectionalLight(0xffffff, 1);
  // emitLight1.position.set(1, 0, 0);
  // sunMesh.add(emitLight1);
  // objects.push(emitLight1);

  // const emitLight2 = new THREE.DirectionalLight(0xffffff, 1);
  // emitLight2.position.set(-1, 0, 0);
  // sunMesh.add(emitLight2);
  // objects.push(emitLight2);

  // 太阳视角
  const sunCamera = makeCamera();
  sunCamera.position.set(40, 0, 0);
  solarSystem.add(sunCamera);

  // 太阳光照
  scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  const sunLight = new THREE.PointLight(0xffffff);
  sunLight.position.set(0, 0, 0).normalize();
  sunLight.intensity = 2;
  sunLight.castShadow = true;
  solarSystem.add(sunLight);
  objects.push(sunLight);

  // 地月系统 earthOrbit
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 50;
  // earthOrbit.rotation.x = 0.4;
  // earthOrbit.add(new THREE.AxesHelper(50));
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  // 地球 earthOrbit.earthMesh
  const earthMaterial = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: textureLoader.load("./orbit/textures/planets/earth_atmos_2048.jpg"),
    specularMap: textureLoader.load(
      "./orbit/textures/planets/earth_specular_2048.jpg"
    ),
    normalMap: textureLoader.load(
      "./orbit/textures/planets/earth_normal_2048.jpg"
    ),

    // y scale is negated to compensate for normal map handedness.
    normalScale: new THREE.Vector2(0.85, -0.85),
  });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthMesh.position.x = 0;
  // earthMesh.rotation.z = 0.5;
  // earthMesh.rotateX(1);
  // earthMesh.rotateY(1);
  earthMesh.rotateZ(-0.4);
  earthMesh.scale.set(3, 3, 3);
  // earthMesh.add(new THREE.AxesHelper(10));
  const rotateAxis = new THREE.Vector3(0, 1, 0);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  // 环境光照
  const envLight = new THREE.DirectionalLight(0xffffff, 0.3);
  envLight.position.set(0, 0, 0);
  earthMesh.add(envLight);
  objects.push(envLight);

  // 光线
  // {
  //   const light = new THREE.DirectionalLight(0xffffff, 0.01);
  //   light.position.set(0, 0, 100);
  //   earthMesh.add(light);
  //   light.castShadow = true;
  //   light.shadow.mapSize.width = 2048;
  //   light.shadow.mapSize.height = 2048;

  //   const d = 50;
  //   light.shadow.camera.left = -d;
  //   light.shadow.camera.right = d;
  //   light.shadow.camera.top = d;
  //   light.shadow.camera.bottom = -d;
  //   light.shadow.camera.near = 1;
  //   light.shadow.camera.far = 50;
  //   light.shadow.bias = 0.001;
  // }

  // 地球视角 earthMesh.earthCamera
  const earthCameraFov = 75;
  const earthCamera = makeCamera(earthCameraFov);
  earthCamera.position.set(0, 0.5, 0);
  earthMesh.add(earthCamera);

  // // 宇宙视角
  const cosmosCamera = makeCamera();
  // //   camera.position.set(8, 4, 10).multiplyScalar(3);
  cosmosCamera.position.set(0, 10, 0).multiplyScalar(1);
  earthOrbit.add(cosmosCamera);
  // // camera.lookAt(0, 0, 0);

  // 卫星轨道系统 gridOrbitZ
  // const gridOrbitZ = new THREE.Object3D();
  // gridOrbitZ.position.x = 50;
  // gridOrbitZ.rotation.y = -0.3;
  // earthOrbit.add(gridOrbitZ);
  // objects.push(gridOrbitZ);

  // 卫星轨道系统 gridOrbitX
  const gridOrbit = new THREE.Object3D();
  gridOrbit.position.x = 0;
  earthOrbit.add(gridOrbit);
  objects.push(gridOrbit);

  // obj卫星
  const gridOBJ = null;
  var objLoader = new OBJLoader();
  // const satellite = objLoader.load("./satellite/satellite.obj");
  // satellite.scale.set(1, 1, 1);
  objLoader.load("./satellite/satellite.obj", function (object) {
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 5, 0);
    // object.add(new THREE.AxesHelper(50));
    gridOrbit.add(object);
    objects.push(object);
    // return object;
  });

  // 卫星
  const gridMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });

  //grid 1
  const gridMesh1 = new THREE.Mesh(sphereGeometry, gridMaterial);
  gridMesh1.scale.set(0.01, 0.01, 0.01);
  gridMesh1.position.y = 5;
  // gridMesh1.add(new THREE.AxesHelper(50));
  // gridMesh.position.x = 0.3;
  gridOrbit.add(gridMesh1);
  objects.push(gridMesh1);

  //grid 2
  const gridMesh2 = new THREE.Mesh(sphereGeometry, gridMaterial);
  gridMesh2.scale.set(0.01, 0.01, 0.01);
  // gridMesh2.position.y = 3;
  // gridMesh2.add(new THREE.AxesHelper(500));
  // gridMesh.position.x = 0.3;
  gridMesh2.rotateZ(-0.5);
  earthMesh.add(gridMesh2);
  objects.push(gridMesh2);

  // 卫星视角
  const gridCamera = makeCamera();
  gridCamera.position.set(0, 12, 0);
  gridOrbit.add(gridCamera);

  // 月球轨道
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 50;
  earthOrbit.add(moonOrbit);

  // 月球
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load("./orbit/textures/planets/moon_1024.jpg"),
  });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  // moonMesh.scale.set(1, 1, 1);
  moonMesh.position.x = 10;

  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  // 月球视角
  const moonCamera = makeCamera();
  moonMesh.add(moonCamera);

  // 自动缩放
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const targetPosition = new THREE.Vector3();

  const cameras = [
    { cam: cosmosCamera, desc: "Cosmos Camera" },
    { cam: earthCamera, desc: "Earth Camera" },
    { cam: sunCamera, desc: "Sun Camera" },
    { cam: gridCamera, desc: "GRID Satellite Camera" },
    { cam: moonCamera, desc: "Moon Camera" },
  ];

  const infoElem = document.querySelector("#info");
  // 地球标签
  const earthDiv = document.createElement("div");
  earthDiv.className = "label";
  earthDiv.textContent = "Earth";
  earthDiv.style.marginTop = "-2em";
  const earthLabel = new CSS2DObject(earthDiv);
  earthLabel.position.set(0, 25, 0);
  earthMesh.add(earthLabel);

  // 月球标签
  const moonDiv = document.createElement("div");
  moonDiv.className = "label";
  moonDiv.textContent = "Moon";
  moonDiv.style.marginTop = "-2em";
  const moonLabel = new CSS2DObject(moonDiv);
  moonLabel.position.set(0, 10, 10);
  moonMesh.add(moonLabel);

  // 卫星标签
  const gridDiv = document.createElement("div");
  gridDiv.className = "label";
  gridDiv.textContent = "GRID Satellite";
  gridDiv.style.marginTop = "-2em";
  const gridLabel = new CSS2DObject(gridDiv);
  gridLabel.position.set(0, 15, 10);
  gridMesh1.add(gridLabel);

  // 文本渲染
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  document.body.appendChild(labelRenderer.domElement);

  // 渲染
  let count = 0;
  let point_pair = [];
  const lineGroup = new THREE.Group();
  lineGroup.position.set(50, 0, 0);
  earthOrbit.add(lineGroup);

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      cameras.forEach((cameraInfo) => {
        const camera = cameraInfo.cam;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      });
    }

    // 星球运转
    // objects.forEach((obj) => {
    //   obj.rotation.y = time * 0.1;
    // });
    // gridOrbit.rotation.x = time * 0.1;
    // solarSystem.rotation.y = time * 1;
    // 地球公转
    earthOrbit.position.x = Math.cos(time / 10) * 50;
    earthOrbit.position.z = Math.sin(time / 10) * 50;

    // 月球公转
    moonOrbit.rotation.y = time * 0.1;

    // 月球自转
    moonMesh.rotation.y = time * 0.1;

    // 地球自转
    earthMesh.rotateOnAxis(rotateAxis, 0.001);
    // earthMesh.rotation.y = time * 0.5;

    // 卫星轨道
    // gridOrbitZ.rotation.y = time * 0.1;
    gridOrbit.rotation.x = time * 0.1;

    // 轨迹
    const grid_pos = new THREE.Vector3();
    const earth_pos = new THREE.Vector3();
    let attached_pos = new THREE.Vector3();
    gridMesh1.getWorldPosition(grid_pos);
    earthOrbit.getWorldPosition(earth_pos);
    // gridMesh2.position.copy(gridMesh1.position);
    // gridMesh2.position.copy(pos);
    // gridMesh2.getWorldPosition(pos);
    // gridMesh1.worldToLocal(pos);

    if (count % 60 === 1) {
      if (point_pair.length > 2) {
        point_pair.shift();
      }
      // point_pair.push(gridMesh2.position);
      // console.log(gridMesh2.position);
      console.log(grid_pos);
      attached_pos = grid_pos.sub(earth_pos).divideScalar(1);
      // attached_pos = grid_pos.divideScalar(0.01);
      // attached_pos = gridMesh2.position.divideScalar(20);
      // console.log(attached_pos);
      point_pair.push(attached_pos);
      // point_pair.push(pos);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints(point_pair);
      const line = new THREE.Line(lineGeo, lineMat);
      earthOrbit.add(line);
    }

    count += 1;
    if (earthOrbit.children.length > 30) {
      earthOrbit.remove(earthOrbit.children[5]);
    }

    // look at earth from sun
    earthMesh.getWorldPosition(targetPosition);
    sunCamera.lookAt(targetPosition);
    // sunLight.lookAt(targetPosition);

    // look at earth from cosmos 屏幕视角
    earthMesh.getWorldPosition(targetPosition);
    cosmosCamera.lookAt(targetPosition);

    // look at earth from GRID satellite 卫星视角
    earthMesh.getWorldPosition(targetPosition);
    gridCamera.lookAt(targetPosition);

    // // look at GRID from moon 月球视角
    earthMesh.getWorldPosition(targetPosition);
    moonCamera.lookAt(targetPosition);

    // // look at GRID from earth 地球视角
    gridMesh1.getWorldPosition(targetPosition);
    earthCamera.lookAt(targetPosition);

    const camera = cameras[(time * 0.1) % cameras.length | 0];
    infoElem.textContent = camera.desc;

    // labelRenderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera.cam);
    // labelRenderer.render(scene, camera.cam);
    renderer.shadowMap.enabled = true;
    // renderer.render(scene, sunCamera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
