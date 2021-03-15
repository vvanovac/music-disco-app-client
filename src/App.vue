<template>
  <div class="app-container">
    <sidebar
        class="app-sidebar"
        v-show="notRegisterOrLogin"
    />
    <div class="app-main" >
      <router-view @message-prompt="showPrompt"></router-view>
    </div>
    <form-message
        :header="promptData.header"
        :text="promptData.text"
        :validity="promptData.validity"
        v-show="promptData.showPrompt"
    ></form-message>
  </div>
</template>

<script>
import FormMessage from '@/components/Form.message'
import Sidebar from "@/components/Sidebar";

export default {
  name: 'App',
  components: {
    FormMessage,
    Sidebar
  },
  data() {
    return {
      promptData: {
        header: '',
        text: '',
        validity: '',
        showPrompt: false,
      },
    }
  },
  computed: {
    notRegisterOrLogin () {
      return !['register', 'login'].includes(this.$route.name)
    },
  },
  methods: {
    showPrompt (messageData) {
      this.promptData = { ...messageData, showPrompt: true }
      setTimeout(() => {
        this.promptData.showPrompt = false
      }, 3000)
    }
  }
}
</script>

<style>
body {
  background-color: #e9edc9;
}
.app-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.app-sidebar {
  width: 20%;
}

.app-main {
  width: 100%;
  background-color: white;
  justify-content: flex-end;
}
</style>
