<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-form">
        <div class="logo">
          <h1>Save My Words</h1>
        </div>
        <form @submit="login()">
          <label for="email">
            <input id="email" type="text" placeholder="E-Posta" />
          </label>
          <label for="password">
            <input id="password" type="password" placeholder="Şifreniz" />
          </label>
          <button class="login-btn">
            <span>Giriş Yap</span>
          </button>
          <small>
            <a href="/" target="_blank">Kayıt Ol</a>
            veya
            <a href="/" target="_blank">Şifremi Unuttum</a>
          </small>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/translateView");
    },
  },
};
</script>

<style lang="scss">
.login {
  background-color: #2c3e50;
  padding: 50px 50px;
  font-size: 16px;

  .login-wrapper {
    text-align: center;
    margin: 0 auto;
    min-width: 280px;
    padding: 35px;
    border-radius: 5px;
    background-color: #fff;

    form {
      display: block;

      label {
        display: block;
        width: 100%;

        input {
          font-size: 16px;
          width: 90%;
          display: block;
          border-radius: 3px;
          padding: 15px 10px;
          margin-bottom: 15px;
          border: 1px solid rgba(63, 87, 110, 0.1);
        }
      }

      .login-btn {
        width: 100%;
        padding: 10px;
        cursor: pointer;
        color: #fff;
        border: none;
        border-radius: 5px;
        background-color: #3c40c6;
        margin-bottom: 20px;

        span {
          font-size: 16px;
        }
      }

      small {
        display: block;
        width: 100%;
        margin: 0 auto;
        text-align: center;

        a {
          text-decoration: none !important;
        }
      }
    }
  }
}
</style>
