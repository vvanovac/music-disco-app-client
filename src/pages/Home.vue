<template>
  <div>
    <home-navbar/>
    <welcome-message class="welcome-message"/>
    <home-lessons class="lessons"></home-lessons>
    <v-divider class="divider"></v-divider>
    <home-courses></home-courses>
    <v-divider class="divider"></v-divider>
    <home-challenges></home-challenges>
  </div>
</template>

<script>
import HomeNavbar from '@/components/Home.navbar'
import WelcomeMessage from '@/components/Home.welcome.message'
import HomeLessons from '@/components/Home.lessons'
import HomeCourses from '@/components/Home.courses'
import HomeChallenges from '@/components/Home.challenges'

export default {
  name: 'Home',
  components: {
    HomeNavbar,
    WelcomeMessage,
    HomeLessons,
    HomeCourses,
    HomeChallenges
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

.divider {
  width: 75%;
  margin: auto;
}
</style>
