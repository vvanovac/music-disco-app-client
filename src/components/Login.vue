<template>
  <div id="login">
    <form class="loginForm">
      <h1>Login</h1>
      <div class="wrapper">
        <label for="username">Username </label>
        <input id="username" type="text">
      </div>
      <div class="wrapper">
        <label for="password">Password </label>
        <input id="password" type="password">
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    this.$http.post('login', {})
  }
}
</script>

<style scoped>
.loginForm {
  font-size: 2.5em;
  color: #2c3e50;
}
.wrapper {
  margin: 20px 5px;
}

input {
  font-size: 2rem;
  color: #2c3e50;
  background-color: aliceblue;
}

</style>
