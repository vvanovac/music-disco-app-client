<template>
  <div class="app-container">
    <router-view></router-view>
    <form-message/>
  </div>
</template>

<script>
import FormMessage from '@/components/Form.message'

export default {
  name: 'App',
  components: {
    FormMessage,
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
  }
}
</script>

<style>
body {
  background-color: white;
}

.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
