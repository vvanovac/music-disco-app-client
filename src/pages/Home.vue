<template>
  <div>
    <home-navbar class="home-navigation"/>
    <welcome-message class="welcome-message"/>
  </div>
</template>

<script>
import HomeNavbar from '@/components/Home.navbar'
import WelcomeMessage from '@/components/Home.welcome.message'

export default {
  name: 'Home',
  components: {
    HomeNavbar,
    WelcomeMessage,
  },
}
</script>

<style scoped>
.welcome-message {
  margin: 5% auto auto;
}
</style>
