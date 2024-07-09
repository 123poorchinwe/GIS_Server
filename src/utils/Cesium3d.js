import * as Cesium from 'cesium';
class Cesium3d {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.viewer = null;
    this.init(); // Initialize
  }
  async init() {
    // Initialize scene
    this.initScene();
   
    // Other initialization tasks
  }
  initScene() {
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNWE4ZDgwMS0zOGZkLTRkNWItODhkMi03YmNhOGI2ZWY2YjciLCJpZCI6MTM4NDM0LCJpYXQiOjE2ODM5NzU2NDJ9.8ysFWBn0BW0hZqgusDdP4imFG6WXEV4RdBStAu4D-fA";
    // Create the viewer
    this.viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,                   // [ Bool, 是否显示动画控件 ]
      shouldAnimate: true,                // [ Bool, 是否开启动画 ]
      homeButton: false,                  // [ Bool, 是否显示Home按钮 ]
      vrButton: false,                    // [ Bool, 是否显示vr按钮 ]
      fullscreenButton: false,            // [ Bool, 是否显示全屏按钮 ]
      baseLayerPicker: false,             // [ Bool, 是否显示图层选择控件 ]
      geocoder: false,                    // [ Bool, 是否显示地名查找控件 ]
      timeline: false,                    // [ Bool, 是否显示时间线控件 ]
      navigationHelpButton: false,        // [ Bool, 是否显示帮助信息控件 ]
      infoBox: false,                     // [ Bool, 是否显示点击要素之后显示的信息 ]
      requestRenderMode: true,            // [ Bool, 启用请求渲染模式 ]
      scene3DOnly: false,                 // [ Bool, 每个几何实例将只能以3D渲染以节省GPU内存 ]
      sceneModePicker: false,             // [ Bool, 是否显示场景切换控件 ]
      sceneMode: 3,                       // [ Number,初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode ]
      fullscreenElement: document.body, 
      terrainProvider: Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true,
      }),
    });

    this.access();
    this.onClick();
    this.loadGeoJsonDataSource_restaurant();
    //this.loadGeoJsonDataSource_xianjie()
    // Load glb model
    const modelEntity = this.viewer.entities.add({
      name: 'glb模型',
      position: Cesium.Cartesian3.fromDegrees(118.019, 30.6912),
      model: {
        url: '../../public/model/chinese_ancient.glb',
        minimumPixelSize: 256,
        maximumScale: 20000,
      },
    });
  }
  add3DTiles(url) {
    const tileset = new Cesium.Cesium3DTileset({ url });
    this.viewer.scene.primitives.add(tileset);
  }
  access() {
    this.viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(118.771473, 32.054034, 250),
      orientation: {
        heading: Cesium.Math.toRadians(20),
        pitch: Cesium.Math.toRadians(-20),
        roll: 0,
      },
    });
  }
  async loadGeoJsonDataSource_xianjie() {
    try {
      const resource = await Cesium.IonResource.fromAssetId(2414414);
      const dataSource = await Cesium.GeoJsonDataSource.load(resource);
  
      // Get the collection of entities in the data source
      const entities = dataSource.entities.values;
  
      // Iterate over each entity and set its color with transparency or random colors
      entities.forEach(entity => {
        // Set a random color for each entity
        const color = Cesium.Color.fromRandom({
          alpha: 0.5 // Set transparency to 0.5 (adjust as needed)
        });
  
        // Set the entity's material with the selected color
        entity.polygon.material = color;
      });
  
      // Add the data source to the viewer
      await this.viewer.dataSources.add(dataSource);
    } catch (error) {
      console.error('Error loading GeoJSON data source:', error);
    }
  }
  
  async loadGeoJsonDataSource_restaurant() {
    try {
      const resource = await Cesium.IonResource.fromAssetId(2414403);
      const dataSource = await Cesium.GeoJsonDataSource.load(resource);
      await viewer.dataSources.add(dataSource);
      await viewer.zoomTo(dataSource);
    } catch (error) {
      console.log(error);
    }
    
  }
    onClick() {
    const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    // Mouse left-click event
    handler.setInputAction((click) => {
      const cartesian = this.viewer.camera.pickEllipsoid(
        click.position,
        this.viewer.scene.globe.ellipsoid
      );
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        const height = cartographic.height;
        console.log('经度:', longitude.toFixed(6));
        console.log('纬度:', latitude.toFixed(6));
        console.log('高程:', height.toFixed(2));
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  performFloodAnalysis(waterLevel) {
    const tileset = this.viewer.scene.primitives.get(0);
    // Iterate over tileset features for flood analysis
    tileset.content._features.forEach((feature) => {
      const minHeight = feature.getProperty('minimumHeight');
      const maxHeight = feature.getProperty('maximumHeight');
     if (minHeight <= waterLevel && maxHeight >= waterLevel) {
        // Visualize or mark affected features
        feature.color = Cesium.Color.RED;
      }
    });
  }
}
export default Cesium3d;
