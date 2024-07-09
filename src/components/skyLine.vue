<template>
  <div id="cesiumContainer">
    <div
      id="loadingbar"
      class="spinner"
    >
      <div class="spinner-container container1">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container2">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container3">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
    </div>
    <div
      id="toolbar"
      style="position : absolute;left : 10px;; top : 10px;"
    >
      <button
        type="button"
        id="chooseView"
        class="button black"
      >
        提取天际线
      </button>
      <button
        type="button"
        id="getSkyline2D"
        class="button black"
      >
        二维天际线
      </button>
      <button
        type="button"
        id="setLimitBody"
        class="button black"
      >
        绘制限高体
      </button>
      <button
        type="button"
        id="getSkylineArea"
        class="button black"
      >
        拉伸闭合体
      </button>
      <button
        type="button"
        id="clear"
        class="button black"
      >
        清除
      </button>
      <button
        type="button"
        id="show"
        class="button black"
      >
        显示闭合体
      </button>
    </div>
    <div
      id="map"
      style="position : absolute;right : 5%; bottom : 5%;width:450px;height:400px;"
    ></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue';
import Cesium3d from '../utils/Cesium3d';
import * as Cesium from 'cesium';
import skyline from '../utils/skyline';

export default defineComponent({
  name: 'SkyPage',
  setup() {
    const data = reactive({
      cesium3d: {}
    });

    onMounted(() => {
      data.cesium3d = new Cesium3d('#cesiumContainer');
      skyline.onload(Cesium);
    });

    return { data };
  }
});

export default skyline;
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
}
.cesium-viewer-bottom {
  display: none;
}
</style>
