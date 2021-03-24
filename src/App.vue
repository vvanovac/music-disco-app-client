<template>
  <div class="app-container">
    <sidebar
        class="app-sidebar"
        v-show="notRegisterOrLogin"
    />
    <div class="app-main" >
      <router-view></router-view>
    </div>
    <form-message
        :header="messagePrompt.header"
        :text="messagePrompt.text"
        :validity="messagePrompt.validity"
        v-show="messagePrompt.showPrompt"
    ></form-message>
  </div>
</template>

<script>
import FormMessage from '@/components/Form.message'
import Sidebar from "@/components/Sidebar";
import { mapGetters } from 'vuex';

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
    ...mapGetters(['messagePrompt']),
    notRegisterOrLogin () {
      return !['register', 'login'].includes(this.$route.name)
    },
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
