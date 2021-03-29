<template>
  <div class="d-flex flex-row justify-start align-start home-container">
    <sidebar class="home-sidebar"/>
    <div class="justify-end home-main">
      <home-navbar/>
      <welcome-message class="welcome-message"/>
      <home-lessons class="lessons"></home-lessons>
      <v-divider class="divider"></v-divider>
      <home-courses></home-courses>
      <v-divider class="divider"></v-divider>
      <home-challenges></home-challenges>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import HomeNavbar from '@/components/Home.navbar'
import WelcomeMessage from '@/components/Home.welcome.message'
import HomeLessons from '@/components/Home.lessons'
import HomeCourses from '@/components/Home.courses'
import HomeChallenges from '@/components/Home.challenges'

export default {
  name: 'Home',
  components: {
    Sidebar,
    HomeNavbar,
    WelcomeMessage,
    HomeLessons,
    HomeCourses,
    HomeChallenges
  },
}
</script>

<style scoped>
.home-container {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.home-sidebar {
  width: 20%;
}

.home-main {
  width: 100%;
}

.welcome-message, .lessons {
  margin: 2% auto auto;
}

.divider {
  width: 75%;
  margin: auto;
}
</style>
