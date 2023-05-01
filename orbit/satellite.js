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
  // scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  // const sunLight = new THREE.PointLight(0xffffff);
  // sunLight.position.set(0, 0, 0).normalize();
  // sunLight.intensity = 2;
  // sunLight.castShadow = true;
  // solarSystem.add(sunLight);
  // objects.push(sunLight);

  // 地月系统 earthOrbit
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.z = -50;
  // earthOrbit.rotation.x = 0.4;
  // earthOrbit.add(new THREE.AxesHelper(50));
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  // // 坐标轴辅助线earthOrbit
  // const axes_earthOrbit = new THREE.AxesHelper(5);
  // earthOrbit.add(axes_earthOrbit);

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
  // earthMesh.position.x = 0;
  // earthMesh.rotation.z = 0.5;
  // earthMesh.rotateX(1);
  // earthMesh.rotateY(1);
  const earth_tilt = -(23.44 / 180) * Math.PI;
  const earthAgency = new THREE.Object3D();

  earthMesh.scale.set(3, 3, 3);
  // earthMesh.add(new THREE.AxesHelper(10));
  // const rotateAxis = new THREE.Vector3(0, 1, 0);
  earthAgency.add(earthMesh);
  earthAgency.rotation.z = earth_tilt; // 顺时针负；
  earthOrbit.add(earthAgency);
  objects.push(earthMesh);

  // 坐标轴辅助线earth
  // const axes_earth = new THREE.AxesHelper(2);
  // earthMesh.add(axes_earth);

  // noon光照
  // scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  const noonOrbit = new THREE.Object3D();
  const noonLight = new THREE.PointLight(0xffffff);
  noonLight.position.set(-50, 0, 0);
  noonLight.intensity = 2;
  noonLight.castShadow = true;
  noonOrbit.add(noonLight);
  earthMesh.add(noonOrbit);
  objects.push(noonLight);

  // // 坐标轴辅助线earthOrbit
  // const axes_noonLight = new THREE.AxesHelper(15);
  // const axes_noonOrbit = new THREE.AxesHelper(15);
  // noonOrbit.add(axes_noonLight);
  // earthMesh.add(axes_noonOrbit);

  // noonLight视角
  const noonCamera = makeCamera();
  noonCamera.position.set(0, 0, 0);
  noonCamera.zoom = 3;
  noonLight.add(noonCamera);

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
  earthCamera.position.set(0, 0, 8);
  earthCamera.zoom = 2;
  // earthMesh.add(earthCamera);

  // // 宇宙视角
  const cosmosCamera = makeCamera();
  // //   camera.position.set(8, 4, 10).multiplyScalar(3);
  cosmosCamera.position.set(-12, 0, 0).multiplyScalar(1);
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
  const gridAxis = new THREE.Vector3(1, 0, 0);
  gridOrbit.position.x = 0;
  const grid_tilt = -((90 - 82.568) / 180) * Math.PI; // 卫星轨道倾角; 82.568最高纬度
  // gridOrbit.rotateZ(earth_tilt + grid_tilt);
  gridOrbit.rotation.z = earth_tilt + grid_tilt;
  earthOrbit.add(gridOrbit);
  objects.push(gridOrbit);

  // 坐标辅助线gridOrbit
  // const axes_gridOrbit = new THREE.AxesHelper(7);
  // axes_gridOrbit.position.x = 5;
  // gridOrbit.add(axes_gridOrbit);

  const gridAgency = new THREE.Object3D();
  gridOrbit.add(gridAgency);

  // obj卫星
  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();
  mtlLoader.load("./satellite/Grid02B.mtl", (material) => {
    material.preload();
    //mtl文件中的材质设置到obj加载器
    objLoader.setMaterials(material);
    objLoader.load("./satellite/Grid02B.obj", function (object) {
      object.scale.set(0.02, 0.02, 0.02);
      object.position.set(0, 5, 0);
      // object.add(new THREE.AxesHelper(50));
      gridAgency.add(object);
      objects.push(object);
    });
  });
  const axes_grid = new THREE.AxesHelper(2);
  gridAgency.add(axes_grid);

  // 坐标辅助线gridOrbit
  // const axes_gridAgency = new THREE.AxesHelper(8);
  // gridAgency.add(axes_gridAgency);

  // 卫星
  const gridMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });

  //grid 1
  const gridMesh1 = new THREE.Mesh(sphereGeometry, gridMaterial);
  gridMesh1.scale.set(0.001, 0.001, 0.001);
  gridMesh1.position.y = 5;
  // gridMesh1.add(new THREE.AxesHelper(50));
  // gridMesh.position.x = 0.3;
  gridAgency.add(gridMesh1);
  objects.push(gridMesh1);

  // grid光照
  // scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  const grid_lightAgency = new THREE.Object3D();
  grid_lightAgency.position.set(0, 5, 0);

  const gridLight = new THREE.PointLight(0xffffff);
  gridLight.position.set(0, 3, 0);
  gridLight.intensity = 0.1;
  gridLight.castShadow = true;
  grid_lightAgency.add(gridLight);
  gridAgency.add(grid_lightAgency);
  objects.push(gridLight);

  // 坐标辅助线gridOrbit
  // const axes_gridLight = new THREE.AxesHelper(8);
  // gridLight.add(axes_gridLight);

  //grid 2
  const gridMesh2 = new THREE.Mesh(sphereGeometry, gridMaterial);
  gridMesh2.scale.set(0.001, 0.001, 0.001);
  // gridMesh2.position.y = 3;
  // gridMesh2.add(new THREE.AxesHelper(500));
  // gridMesh.position.x = 0.3;
  gridMesh2.rotateZ(-0.5);
  earthMesh.add(gridMesh2);
  objects.push(gridMesh2);

  // 卫星视角1顶视图
  const gridCamera_top = makeCamera();
  gridCamera_top.position.set(0, 10, 0);
  gridAgency.add(gridCamera_top);

  // 卫星视角2前视图
  const gridCamera_front = makeCamera();
  gridCamera_front.position.set(0, 6, -2);
  gridAgency.add(gridCamera_front);

  // 卫星视角3后视图
  const gridCamera_back = makeCamera();
  gridCamera_back.position.set(0, 6, 2);
  gridAgency.add(gridCamera_back);

  // 卫星视角4/底视图
  const gridCamera_bottom = makeCamera();
  gridCamera_bottom.position.set(2, 2, 5);
  gridCamera_bottom.zoom = 1;
  gridAgency.add(gridCamera_bottom);

  // 月球轨道
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 50;
  earthOrbit.add(moonOrbit);

  // 环绕相机
  const earthEquator = new THREE.Object3D();
  earthAgency.add(earthEquator);
  earthEquator.add(earthCamera);

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
    // { cam: cosmosCamera, desc: "Cosmos Camera" },
    { cam: earthCamera, desc: "Earth Camera" },
    // { cam: noonCamera, desc: "Sunlight Camera" },
    { cam: gridCamera_top, desc: "GRID Satellite Camera" },
    { cam: gridCamera_front, desc: "GRID Satellite Camera" },
    { cam: gridCamera_back, desc: "GRID Satellite Camera" },
    { cam: gridCamera_bottom, desc: "GRID Satellite Camera" },
    // // { cam: moonCamera, desc: "Moon Camera" },
    { cam: sunCamera, desc: "Sun Camera" },
  ];

  // const infoElem = document.querySelector("#info");
  // 地球标签
  // const earthDiv = document.createElement("div");
  // earthDiv.className = "label";
  // earthDiv.textContent = "Earth";
  // earthDiv.style.marginTop = "-2em";
  // const earthLabel = new CSS2DObject(earthDiv);
  // earthLabel.position.set(0, 25, 0);
  // earthMesh.add(earthLabel);

  // 月球标签
  // const moonDiv = document.createElement("div");
  // moonDiv.className = "label";
  // moonDiv.textContent = "Moon";
  // moonDiv.style.marginTop = "-2em";
  // const moonLabel = new CSS2DObject(moonDiv);
  // moonLabel.position.set(0, 10, 10);
  // moonMesh.add(moonLabel);

  // 卫星标签
  // const gridDiv = document.createElement("div");
  // gridDiv.className = "label";
  // gridDiv.textContent = "GRID Satellite";
  // gridDiv.style.marginTop = "-2em";
  // const gridLabel = new CSS2DObject(gridDiv);
  // gridLabel.position.set(0, 15, 10);
  // gridMesh1.add(gridLabel);

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

  // 获取经纬度
  // let latitude_last = document.querySelector("#latitude_value").innerHTML;
  // let longitude_last = document.querySelector("#longitude_value").innerHTML;
  // let altitude_last = document.querySelector("#altitude_value").innerHTML;
  // console.log(latitude);
  // earthMesh.rotateOnAxis(rotateAxis, -1.5); // 0度北美洲
  // earthMesh.rotateOnAxis(rotateAxis, (longitude / -180) * Math.PI);
  // earthMesh.rotateX(Math.PI/2);
  // earthMesh.rotateY(Math.PI / 2);
  // earthMesh.rotateZ(Math.PI / 2);

  // earthMesh.rotateOnAxis(rotateAxis, 1.7 + (longitude_last / -180) * Math.PI);

  let earth_velocity = (2 * Math.PI) / 24 / 3600 / 60;

  // gridOrbit.rotation.x = 1;
  let n = 0;

  // 获取当前时间
  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  let month,
    day,
    now_sec,
    now_day,
    noon_offset,
    season_rad,
    march_day,
    season_height;
  // let time_now = hour * 3600 + min * 60 + sec;

  // latitude_last = 0;

  // render
  function render(time) {
    // console.log(time);
    // let time_1 = time;
    time *= 0.001;
    now = new Date();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    now_sec = hour * 3600 + min * 60 + sec;
    now_day = month * 30.42 + day;
    march_day = 3 * 30.42 + 21;
    season_rad = ((now_day - march_day) / 365) * 2 * Math.PI;
    season_height =
      (5 * Math.sin((23.5 / 180) * Math.PI) * Math.sin(season_rad)) / 3;
    // console.log(now_sec);

    const date = new Date(); // 当前时间
    document.querySelector("#time_value").innerHTML = date;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      cameras.forEach((cameraInfo) => {
        const camera = cameraInfo.cam;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      });
    }
    // let latitude_next = document.querySelector("#latitude_value").innerHTML;
    // let longitude_next = document.querySelector("#longitude_value").innerHTML;
    // let altitude_next = document.querySelector("#altitude_value").innerHTML;

    // 星球运转
    // objects.forEach((obj) => {
    //   obj.rotation.y = time * 0.1;
    // });
    // gridOrbit.rotation.x = time * 0.1;
    // solarSystem.rotation.y = time * 1;
    // 地球公转
    n++;
    let omega = n * 7 * 10 ** -4;
    // console.log(omega);
    earthOrbit.position.x = Math.cos(omega) * 50;
    earthOrbit.position.z = Math.sin(omega) * 50;

    // 月球公转
    moonOrbit.rotation.y = time * 0.1;

    // 月球自转
    moonMesh.rotation.y = time * 4.5 * 10 ** -8;

    // 地球自转
    // earthMesh.rotation.x = (time_now / 86400) * 2 * Math.PI;
    // earthMesh.rotation.z = 0.3;
    earthEquator.rotation.y = time * 0.1;

    // noonLight自转
    noon_offset = 43200 * 2.65;
    // now_sec = 43200;
    noonOrbit.rotation.y = ((noon_offset - now_sec) / 86400) * 2 * Math.PI;
    noonOrbit.position.y = season_height;
    // noonOrbit.rotation.y = ((now_sec*1.65) / 86400) * 2 * Math.PI;

    // earthMesh.rotateOnAxis(rotateAxis, earth_velocity); //每1/60s的进动；
    // earthOrbit.rotation.y = time * 0.5;
    // console.log(1.2 * 10 ** -6);
    // earthMesh.rotateOnAxis(rotateAxis, 0.01);
    let longitude = document.querySelector("#longitude_value").innerHTML;
    let lon_offset = -1.5; // offset=-1.5
    earthMesh.rotation.y = (longitude / -180) * Math.PI + lon_offset;
    // earthMesh.rotation.y = (28 / -180) * Math.PI + lon_offset; // -5.6
    // earthMesh.rotation.y = time * 0.5;

    // 卫星轨道

    let latitude = document.querySelector("#latitude_value").innerHTML;
    // let altitude = document.querySelector("#altitude_value").innerHTML;
    // gridAgency.rotation.x = time * 0.1;
    // gridAgency.rotation.x = ((90 - 41) / 180) * Math.PI; // 35.95
    gridAgency.rotation.x = ((90 - latitude) / 180) * Math.PI;
    // grid_lightAgency.rotation.y = time * 0.2;
    // gridAgency.position.y = altitude / 100;

    // gridOrbit.rotation.x = ((90 - latitude) / 180) * Math.PI; // 根据数据估算
    // let grid_ahead = ((latitude_next - latitude_last) / -180) * Math.PI; //正向西;
    // console.log(grid_ahead);
    // gridOrbit.rotateOnAxis(gridAxis, grid_ahead * 1);
    // gridOrbit.rotation.x = 1.8 * 10 ** -5; // 根据数据估算

    // let latitude = document.querySelector("#latitude_value").innerHTML;
    // let longitude = document.querySelector("#longitude_value").innerHTML;
    // let altitude = document.querySelector("#altitude_value").innerHTML;
    // console.log(latitude);

    // longitude_last = longitude_next;
    // latitude_last = latitude_next;
    // altitude_last = altitude_next;

    // 轨迹
    const grid_pos = new THREE.Vector3();
    const earth_pos = new THREE.Vector3();
    let attached_pos = new THREE.Vector3();
    // gridMesh1.getWorldPosition(grid_pos);
    gridMesh1.getWorldPosition(grid_pos);
    gridOrbit.getWorldPosition(earth_pos);
    // gridMesh2.position.copy(gridMesh1.position);
    // gridMesh2.position.copy(pos);
    // gridMesh2.getWorldPosition(pos);
    // gridMesh1.worldToLocal(pos);

    if (count % 100 == 0 && count > 0) {
      if (point_pair.length > 2) {
        point_pair.shift();
      }
      // point_pair.push(gridMesh2.position);
      // console.log(gridMesh2.position);
      // console.log(grid_pos);
      // const quaternion = new THREE.quaternion(grid_pos, 0.001);
      // grid_pos = grid_pos.applyQuaternion(quaternion);
      attached_pos = grid_pos.sub(earth_pos).divideScalar(1);
      // attached_pos = grid_pos.divideScalar(0.01);
      // attached_pos = gridMesh2.position.divideScalar(20);
      // console.log(grid_pos);
      point_pair.push(grid_pos);

      // point_pair.push(pos);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints(point_pair);
      const line = new THREE.Line(lineGeo, lineMat);
      earthOrbit.add(line);
    }

    count += 1;
    // console.log(count);
    // console.log(earthOrbit.children.length);
    // 限制轨迹长度
    let line_num = 3600;
    if (earthOrbit.children.length > line_num) {
      earthOrbit.remove(earthOrbit.children[line_num]);
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
    gridCamera_top.lookAt(targetPosition);

    // // look at GRID from moon 月球视角
    earthMesh.getWorldPosition(targetPosition);
    moonCamera.lookAt(targetPosition);
    noonCamera.lookAt(targetPosition);

    // // look at GRID from earth 地球视角
    gridMesh1.getWorldPosition(targetPosition);
    earthCamera.lookAt(targetPosition);
    gridCamera_front.lookAt(targetPosition);
    gridCamera_back.lookAt(targetPosition);
    gridCamera_bottom.lookAt(targetPosition);

    // const camera = cameras[(time * 0.1) % cameras.length | 0];
    const camera = cameras[Math.floor((time * 0.1) % cameras.length)];
    // console.log(Math.floor((time / 10000) % cameras.length));
    // console.log(cameras.length);
    // console.log(time);
    // infoElem.textContent = camera.desc;

    // labelRenderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera.cam);
    // labelRenderer.render(scene, camera.cam);
    renderer.shadowMap.enabled = true;
    // renderer.render(scene, sunCamera);
    // let time_2 = time_1;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
