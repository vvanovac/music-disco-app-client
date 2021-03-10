<template>
  <div id="app">
    <v-btn
        id="logoutBtn"
        class="mr-4"
        x-large
        outlined
        rounded
        v-show="show"
        @click="$router.push({ name: 'login' })"
    >
      Log Out
    </v-btn>
    <img alt="Music Disco App logo" src="./assets/music-logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    show () {
      return !['register', 'login'].includes(this.$route.name)
    }
  }
}
</script>

<style>
body {
  background-color: #e9edc9;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logoutBtn {
  float: right;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bold;
  background-color: red;
  margin: 10px 40px;
}
</style>
