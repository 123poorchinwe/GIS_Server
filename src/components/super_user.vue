<template>
  <div class="login-page">
    <div class="top-bar">
      <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      <router-link to="/" class="back-to-home">返回主界面</router-link>
    </div>
    <div class="login-container">
      <div class="left-section">
        <img
          src="https://s1.imagehub.cc/images/2023/10/08/100w0t000000ivz6p83BE.jpeg"
          alt="100w0t000000ivz6p83BE.jpeg"
        />
        <h2>Welcome to JinLing College Webgis!</h2>
        <div class="welcome-text"> </div>
      </div>
      <div class="right-section">
        <h2>账号密码登录</h2>
        <form>
          <div class="form-row">
            <label for="username">用户:</label>
            <input type="text" id="username" v-model="username" />
          </div>
          <div class="form-row">
            <label for="password"> 密码: </label>
            <input type="password" id="password" v-model="password" />
          </div>
          <button @click="login">登录</button>
          <div class="bottom-links">
            <p><router-link to="/forget">忘记密码？</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SuperUser',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      login() {
        // 处理登录逻辑
      },
    },
  }
</script>

<style scoped>
  .login-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -70px;
    background-image: url('https://s1.imagehub.cc/images/2023/10/08/R-C.jpeg');
  }

  .top-bar {
    background-color: green;
    width: 100%;
    padding: 20px;
  }
  .back-to-home {
    position: absolute;
    top: 35px;
    right: 20px;
    color: white;
    font-size: 14px;
    text-decoration: none;
  }
  .webgis-title {
    color: white;
    font-family: 'LiSu', 'SimSun', serif;
    font-size: 50px;
  }

  .login-container {
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
  }

  .bottom-links {
    display: flex;
    justify-content: space-between;
    width: 60px;
  }

  .bottom-links a {
    font-size: 12px;
  }
</style>
