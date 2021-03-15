<template>
  <div>
    <home-navbar/>
    <welcome-message class="welcome-message"/>
    <home-lessons class="lessons"></home-lessons>
  </div>
</template>

<script>
import HomeNavbar from '@/components/Home.navbar'
import WelcomeMessage from '@/components/Home.welcome.message'
import HomeLessons from '@/components/Home.lessons'

export default {
  name: 'Home',
  components: {
    HomeNavbar,
    WelcomeMessage,
    HomeLessons,
  },
}
</script>

<style scoped>
.welcome-message {
  margin: 2% auto auto;
}

.lessons {
  margin: 2% auto auto;
}
</style>
