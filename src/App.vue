<template>
  <div id="app">
    <v-btn
        id="logoutBtn"
        class="mr-4"
        x-large
        outlined
        rounded
        v-show="showLogoutButton"
        @click="$router.push({ name: 'login' })"
    >
      Log Out
    </v-btn>
    <img alt="Music Disco App logo" src="./assets/music-logo.png">
    <form-message
      :header="promptData.header"
      :text="promptData.text"
      :validity="promptData.validity"
      v-show="showFormPrompt"
    ></form-message>
    <router-view @message-prompt="showPrompt"></router-view>
  </div>
</template>

<script>
import FormMessage from '@/components/Form.message'

export default {
  name: 'App',
  components: {
    FormMessage
  },
  data() {
    return {
      promptData: {
        header: 'Incomplete form.',
        text: 'Please fill out the form above.',
        validity: 'incomplete',
        showMessage: false,
      },
    }
  },
  computed: {
    showLogoutButton () {
      return !['register', 'login'].includes(this.$route.name)
    },
    showFormPrompt () {
      return ['register', 'login'].includes(this.$route.name)
    }
  },
  methods: {
    showPrompt (messageData) {
      this.promptData = { ...messageData, showMessage: true }
      setTimeout(() => {
        this.promptData.showMessage = false
      }, 3000)
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
  background-color: #ff8080;
  margin: 10px 40px;
}
</style>
