<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">
        <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/location">地址变迁</router-link></li>
        <li><router-link to="/complex">建制变迁</router-link></li>
        <li><router-link to="/history">校史文化标注</router-link></li>
        <li><router-link to="/schoolmate">知名校友</router-link></li>
        <li><router-link to="/feedback">用户反馈</router-link></li>
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

    <!-- 轮播图 -->

    <div class="slider">
      <div class="slides" :style="{ transform: 'translateX(' + -currentSlide * 100 + '%)' }">
        <div v-for="(slide, index) in slides" :key="index" class="slide-container">
          <img :src="slide.image" :key="index" class="slide" />
          <div class="text-overlay">
            <p class="slide-text">{{ slide.text }}</p>
          </div>
        </div>
      </div>
      <div class="slider-dots">
        <span
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></span>
      </div>
      <div class="slider-arrows">
        <span class="arrow left-arrow" @click="prevSlide">&#10094;</span>
        <span class="arrow right-arrow" @click="nextSlide">&#10095;</span>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <footer class="footer">
      <p
        >copyright@2024
        <a href="https://www.nnu.edu.cn/">南京师范大学</a>
        版权所有</p
      >
      <h> 地址：江苏省南京市栖霞区文苑路一号 邮箱：chinwezhu@outlook.com</h>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'WelcomePage',
    data() {
      return {
        showOptions: false,
        currentSlide: 0,
        slides: [
          {
            image: 'https://picst.sunbangyan.cn/2023/10/28/346224ce88b4170aba2b497b589b420a.jpg',
            text: '二十年代初，金陵女大新校区在随园建成，七栋宫殿式的建筑对称而立，巍然雅致，气度非凡，师生在这里度过了金陵女大最安逸的灿烂时期。',
          },
          {
            image: 'https://picss.sunbangyan.cn/2023/10/28/be8d3b1eb470d38a0b9c1456b7059531.jpg',
            text: '1921年，金陵女子大学教职工合影。',
          },
          {
            image: 'https://picdm.sunbangyan.cn/2023/10/28/74ea1a7ca487f20bc73c68aa7e696ab7.jpg',
            text: '百年后的今天，当南京师范大学的书声依旧琅琅，大草坪上阳光普照，学子游人行走于长廊，一场场学术交流会、学生话剧表演也如火如荼的开展，在这静谧与热闹中，我们仿佛也能看见往昔岁月里的模样。',
          },
        ],
      }
    },
    mounted() {
      setInterval(() => {
        this.nextSlide()
      }, 5000) // 每隔3秒切换一次
    },
    methods: {
      redirectToPage(path) {
        this.showOptions = false // 隐藏下拉框
        this.$router.push(path) // 使用路由跳转到指定路径
      },
      nextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
          this.currentSlide = 0
        } else {
          this.currentSlide++
        }
      },

      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
      },
      goToSlide(index) {
        if (index === this.slides.length - 1) {
          this.currentSlide = 0
        } else {
          this.currentSlide = index
        }
      },
    },
  }
</script>

<style>
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

  .login-wrapper {
    position: relative;
    z-index: 1;
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
    transition: transform 70s ease-in-out;
  }

  .arrow-icon.up {
    transform: rotate(-135deg);
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

  .slider {
    position: relative;
    height: calc(100vh - 140px); /* 调整高度，使其填满顶部栏和底部栏之间的空隙 */
    overflow: hidden; /* 隐藏超出部分 */
  }

  .slides {
    display: flex;
    width: 300%; /* 每张图片占据三分之一的宽度 */
    animation: slide 80s infinite; /* 使用动画实现循环播放 */
  }
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-200%); /* 平移两个图片的宽度 */
    }
  }
  .slide-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .slide {
    width: 33.33%; /* 每张图片占据三分之一的宽度 */
    height: 100%;
    object-fit: cover;
  }
  .slide {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-overlay {
    position: absolute;
    bottom: 450px;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
  }

  .slide-text {
    color: #fff;
    font-size: 24px;
    margin: 0;
  }
  .slider-dots {
    position: relative;
    bottom: 450px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: fit-content; /* 或者设置一个固定的宽度 */
  }

  .slider-dots span {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 8px;
    cursor: pointer;
  }

  .slider-dots span.active {
    background-color: #227700;
  }

  .slider-arrows {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

  .left-arrow {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .right-arrow {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  /* 底部版权信息样式 */
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
</style>
