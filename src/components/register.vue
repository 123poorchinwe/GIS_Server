<template>
  <div class="register-page">
    <div class="top-bar">
      <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      <router-link to="/" class="back-to-home">返回主界面</router-link>
    </div>
    <div class="register-container">
      <div class="left-section">
        <img src="https://s1.imagehub.cc/images/2023/10/08/100w0t000000ivz6p83BE.jpeg" alt="底图" />
        <div class="welcome-text">
          <h2>Welcome to Jinling College Webgis</h2>
        </div>
      </div>
      <div class="right-section">
        <h2>新用户注册</h2>
        <form>
          <div class="form-row">
            <label for="nickname">昵&nbsp;&nbsp;&nbsp;称:</label>
            <input type="text" id="nickname" v-model="nickname" />
          </div>
          <div class="form-row">
            <label for="phone">手机号:</label>
            <input type="text" id="phone" v-model="phone" />
          </div>
          <div class="form-row">
            <label for="email">邮箱号:</label>
            <input type="text" id="email" v-model="email" />
          </div>
          <div class="form-row">
            <label for="captcha">验证码:</label>
            <input type="text" id="captcha" v-model="captcha" />
          </div>
          <div class="form-row">
            <div class="captcha-container">
              <img :src="captchaImage" alt="验证码" @click="refreshCaptcha" />
            </div>
          </div>
          <button class="register" @click="register">注册</button>
          <div class="bottom-links">
            <p><router-link to="/normaluser">已有账号？立即登录</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        nickname: '',
        phone: '',
        email: '',
        code: '',
        captcha: '',
        captchaImage: '',
      }
    },
    mounted() {
      this.generateCaptcha()
    },
    methods: {
      register() {
        // 处理注册逻辑
      },
      generateCaptcha() {
        // 生成新的验证码图片和对应的文字
        this.captchaImage = 'https://dummyimage.com/120x40/000/fff&text=' + Math.random().toString(36).slice(2, 8)
        this.captcha = ''
      },
      refreshCaptcha() {
        this.generateCaptcha() // 刷新验证码
      },
    },
  }
</script>

<style scoped>
  .register-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -70px;
    background-image: url('https://s1.imagehub.cc/images/2023/10/08/R-C.jpeg');
  }
  .back-to-home {
    position: absolute;
    top: 35px;
    right: 20px;
    color: white;
    font-size: 14px;
    text-decoration: none;
  }
  .top-bar {
    background-color: green;
    width: 100%;
    padding: 20px;
  }

  .webgis-title {
    color: white;
    font-family: 'LiSu', 'SimSun', serif;
    font-size: 50px;
  }

  .register-container {
    display: flex;
    justify-content: space-between;
    margin: 150px;
    background-color: #f5f5f5;
  }

  .left-section img {
    width: 300px;
  }

  .welcome-text {
    margin-top: 20px;
  }

  .right-section {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
  }

  .right-section h2 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  label {
    margin-right: 10px;
  }

  input {
    padding: 5px;
    width: 200px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
    margin-left: 50px;
  }

  .bottom-links {
    display: flex;
    justify-content: center;
    width: 200px;
  }

  .bottom-links a {
    font-size: 12px;
    margin-left: 60px;
  }
  .right-section img {
    width: 80px;
    height: 50px;
    margin-left: 4px;
    cursor: pointer;
  }
  .captcha-container {
    display: flex;
    align-items: center;
    margin-top: 0px;
    width: 40px;
    height: 40px;
  }
</style>
