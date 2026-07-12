import * as Cesium from 'cesium';

function load3DTiles(selector) {
  // Initialize scene
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNWE4ZDgwMS0zOGZkLTRkNWItODhkMi03YmNhOGI2ZWY2YjciLCJpZCI6MTM4NDM0LCJpYXQiOjE2ODM5NzU2NDJ9.8ysFWBn0BW0hZqgusDdP4imFG6WXEV4RdBStAu4D-fA";
  const container = document.querySelector(selector);
  const viewer = new Cesium.Viewer(container, {
    animation: false,
    shouldAnimate: true,
    homeButton: false,
    vrButton: false,
    fullscreenButton: false,
    baseLayerPicker: false,
    geocoder: false,
    timeline: false,
    navigationHelpButton: false,
    infoBox: false,
    requestRenderMode: true,
    scene3DOnly: false,
    sceneModePicker: false,
    sceneMode: 3,
    fullscreenElement: document.body,
    terrainProvider: Cesium.createWorldTerrain({
      requestVertexNormals: true,
      requestWaterMask: true,
    }),
  });

  // Load glb model
  const modelEntity = viewer.entities.add({
    name: 'glb模型',
    position: Cesium.Cartesian3.fromDegrees(118.019, 30.6912),
    model: {
      url: '../../public/model/chinese_ancient.glb',
      minimumPixelSize: 256,
      maximumScale: 20000,
    },
  });

  //加载3Dtiles
  const tileset = new Cesium.Cesium3DTileset({ url:'../../public/tileset.json' });
  viewer.scene.primitives.add(tileset);

  return {
    viewer,
    modelEntity,
    tileset,
  };
}

export default load3DTiles;
