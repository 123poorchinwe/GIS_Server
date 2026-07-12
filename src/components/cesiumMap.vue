<template>
  <div>
    <nav class="navbar">
      <!-- 导航栏 -->
      <div class="logo">
        <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/location">地址变迁</router-link></li>
        <li>
          <div class="complex-option">
            <router-link to="/complex">建制变迁</router-link>
          </div>
        </li>
        <li><router-link to="/history">校史文化标注</router-link></li>
        <li><router-link to="/schoolmate">知名校友</router-link></li>
        <li> <router-link to="/feedback">用户反馈</router-link></li>
      </ul>
      <div class="login-wrapper">
        <button class="login-button" @mouseenter="showOptions = true" @mouseleave="hideOptions">
          <span>登录</span>
          <span class="circle"></span>
          <span class="arrow-icon" :class="{ up: showOptions }"></span>
        </button>

        <ul
          class="user-options"
          :style="{ display: showOptions ? 'block' : 'none' }"
          @mouseenter="showOptions = true"
          @mouseleave="showOptions = false"
        >
          <li @click="redirectToPage('/normaluser')">普通用户</li>
          <li @click="redirectToPage('/superuser')" @mouseleave="showOptions = false">管理员</li>
        </ul>
      </div>
    </nav>
  <div id="cesiumContainer" >
   
</div>
<div id="toolbar" style="position : absolute;left : 10px;; top : 10px;">
    <button type="button" id="chooseView" class="button black">提取天际线</button>
    <button type="button" id="getSkyline2D" class="button black">二维天际线</button>
    <button type="button" id="setLimitBody" class="button black">绘制限高体</button>
    <button type="button" id="getSkylineArea" class="button black">拉伸闭合体</button>
    <button type="button" id="clear" class="button black">清除</button>
    <button type="button" id="show" class="button black">显示闭合体</button>
</div>

     <!-- 底部版权信息 -->
     <footer class="footer">
      <p
        >copyright@2024
        <a href="https://www.nnu.edu.cn/">南京师范大学</a>
        版权所有</p>
      <h> 地址：江苏省南京市栖霞区文苑路一号 邮箱chinwezhu@outlook.com</h>
    </footer>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive } from 'vue';
import Cesium3d from '../utils/Cesium3d';
import * as Cesium from 'cesium';

export default defineComponent({
  name: 'CesiumPage',
  setup() {
    const data = reactive({
      cesium3d: {},
      bufferDistance: 1000, // 缓冲区距离
    });

    onMounted(() => {
      data.cesium3d = new Cesium3d('#cesiumContainer');
    });
    

    return { data };
  }
});
</script>

<style>
  #cesiumContainer {
    position:relative;
    }
     /* 全局样式 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .webgis-title {
    font-family: 'LiSu', 'SimSun', serif;
    font-size: 50px;
  }

  /* 导航栏样式 */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    background-color: #227700;
    color: #ffffff;
    margin-top: -60px;
  }
  .navbar ul {
    display: flex;
    list-style: none;
  }
  .navbar li {
    margin-right: 20px;
  }
  .navbar li a {
    color: #ffffff;
    text-decoration: none;
  }

  .complex-option {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    padding: 6px;
    margin-top: -5px;
  }

  .complex-option:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .login-wrapper {
    position: relative;
  }

  .login-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 24px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  .login-button span:first-child {
    margin-right: 8px;
  }

  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
  }

  .arrow-icon {
    position: absolute;
    top: calc(50% - 3px);
    right: 16px;
    width: 0;
    height: 0;
    border: solid #999;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition: transform 0.3s ease-in-out;
  }

  .arrow-icon.up {
    transform: rotate(180deg);
  }

  .user-options {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 120px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: none;
    list-style: none;
    padding: 8px;
  }

  .user-options li {
    cursor: pointer;
    text-align: center;
    margin: 8px 0;
    color: #000000;
  }

  .user-options li:hover {
    background-color: #f5f5f5;
  }

  /* 底部样式 */
  .footer {
    background-color: #f2f2f2;
    padding: 1rem;
    text-align: center;
  }

  .footer a {
    color: #000000;
    text-decoration: none;
  }

  .footer p {
    margin: 0;
    padding: 0;
    color: #666666;
  }
  .cesium-viewer-bottom {
            display: none;
        }
</style>