import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// 引用全局样式
//import './assets/css/global.css'
import Cesium3d from './utils/Cesium3d'
// import echarts from 'echarts'
import * as echarts from 'echarts'
let app = createApp(App)

app.config.globalProperties.$echarts = echarts
// 使用路由
app.use(router)
app.mount('#app')
const cesium3dd = new Cesium3d()
app.config.globalProperties.$Cesium3d = cesium3dd
console.log(cesium3dd)