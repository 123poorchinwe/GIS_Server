<template>
  <div class="forgot-password-page">
    <div class="top-bar">
      <h1 class="webgis-title">金陵女子大学WebGIS</h1>
      <router-link to="/" class="back-to-home">返回主界面</router-link>
    </div>
    <div class="forgot-password-container">
      <div class="left-section">
        <img src="https://s1.imagehub.cc/images/2023/10/08/100w0t000000ivz6p83BE.jpeg" alt="底图" />
        <div class="welcome-text">
          <h2>忘记密码</h2>
        </div>
      </div>
      <div class="right-section">
        <h2>找回密码</h2>
        <form>
          <div class="form-row">
            <label for="username">用&nbsp;户&nbsp;名:&nbsp;</label>
            <input type="text" id="username" v-model="username" />
          </div>
          <div class="form-row">
            <label for="email"> 邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:&nbsp;</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="form-row">
            <label for="newpassword">新&nbsp;密&nbsp;码:&nbsp;</label>
            <input type="password" id="newpassword" v-model="newPassword" />
          </div>
          <div class="form-row">
            <label for="confirmpassword">确认密码:</label>
            <input type="password" id="confirmpassword" v-model="confirmPassword" />
          </div>
          <button @click="resetPassword">重置密码</button>
          <div class="bottom-links">
            <p><router-link to="/normaluser">返回登录</router-link></p>
            <p><router-link to="/register">新用户注册</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        username: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
      }
    },
    methods: {
      resetPassword() {
        if (!this.newPassword || !this.confirmPassword) {
          alert('请输入新密码和确认密码')
          return
        }
        if (this.newPassword !== this.confirmPassword) {
          alert('新密码和确认密码不一致，请重新输入')
          return
        }
        // 模拟重置密码成功
        const isSuccess = true
        if (isSuccess) {
          if (confirm('密码已重置成功，请重新登录')) {
            this.$router.push('/normaluser')
          }
        } else {
          alert('重置密码失败，请稍后再试')
        }
      },
    },
  }
</script>

<style scoped>
  .forgot-password-page {
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

  .webgis-title {
    color: white;
    font-family: 'LiSu', 'SimSun', serif;
    font-size: 50px;
  }
  .back-to-home {
    position: absolute;
    top: 35px;
    right: 20px;
    color: white;
    font-size: 14px;
    text-decoration: none;
  }
  .forgot-password-container {
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
    width: 200px;
  }

  .bottom-links a {
    font-size: 12px;
  }
</style>
