<template>
  <div>
    <nav class="navbar">
      <!-- 导航栏 -->
      <div class="logo">
        <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      </div>
      <ul class="nav-links">
        <li> <router-link to="/location">地址变迁</router-link></li>
        <li> <router-link to="/complex">建制变迁</router-link></li>
        <li> <router-link to="/history">校史文化标注</router-link></li>
        <li> <router-link to="/schoolmate">知名校友</router-link></li>
        <li>
          <div class="feedback-option">
            <router-link to="/feedback">用户反馈</router-link>
          </div>
        </li>
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

    <!-- 用户反馈主体 -->
    <div class="feedback-wrapper">
      <h2 class="feedback-title">用户反馈</h2>
      <form class="feedback-form" @submit.prevent="submitFeedback">
        <div class="form-group">
          <label for="moduleSelect">请选择上传的模块：</label>
          <select id="moduleSelect" v-model="selectedModule">
            <option value="">请选择</option>
            <option value="address">地址标注</option>
            <option value="change">建制变迁标注</option>
            <option value="history">校史图片展示</option>
            <option value="alumni">校友传记上传</option>
            <option value="other">其他内容</option>
          </select>
        </div>
        <div class="form-group" v-if="selectedModule !== ''">
          <label for="feedbackContent">请输入反馈内容：</label>
          <textarea id="feedbackContent" v-model="feedbackContent" rows="5"></textarea>
        </div>
        <div class="form-group" v-if="selectedModule === 'address' || selectedModule === 'change'">
          <label for="feedbackImage">上传图片：</label>
          <input type="file" id="feedbackImage" accept="image/*" @change="handleImageUpload" />
        </div>
        <div class="form-group">
          <button class="upload-button">提交反馈</button>
        </div>
      </form>
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
    name: 'FeedbackPage',
    data() {
      return {
        showOptions: false,
        selectedModule: '',
        feedbackContent: '',
        feedbackImage: null,
      }
    },
    methods: {
      redirectToPage(path) {
        this.showOptions = false // 隐藏下拉框
        this.$router.push(path) // 使用路由跳转到指定路径
      },
      handleImageUpload(event) {
        this.feedbackImage = event.target.files[0]
      },
      submitFeedback() {
        // 提交反馈逻辑，可根据选中的模块和相关内容进行处理
        console.log('提交反馈')
        console.log('模块：', this.selectedModule)
        console.log('内容：', this.feedbackContent)
        console.log('图片：', this.feedbackImage)

        // 清空表单数据
        this.selectedModule = ''
        this.feedbackContent = ''
        this.feedbackImage = null
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

  .feedback-option {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    padding: 6px;
    margin-top: -5px;
  }

  .feedback-option:hover {
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

  .feedback-wrapper {
    margin: 50px auto;
    max-width: 800px;
  }

  .feedback-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .feedback-form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
  }

  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .upload-button {
    padding: 10px 20px;
    background-color: #227700;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  /* 底部样式 */
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: #f2f2f2;
    padding: 10px 20px;
  }
  .footer p {
    padding: 0;
    color: #666666;
  }
</style>
