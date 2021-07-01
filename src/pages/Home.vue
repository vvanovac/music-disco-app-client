<template>
  <div class="wrapper">
    <div class="pa-0 ma-0">
      <welcome-message class="welcome-message"/>
      <home-lessons class="lessons"></home-lessons>
      <v-divider class="divider"></v-divider>
      <home-courses class="courses"></home-courses>
      <v-divider class="divider"></v-divider>
      <home-challenges class="challenges"></home-challenges>
    </div>
  </div>
</template>

<script>
import WelcomeMessage from '@/components/home/Home.welcome.message'
import HomeLessons from '@/components/home/Home.lessons'
import HomeCourses from '@/components/home/Home.courses'
import HomeChallenges from '@/components/home/Home.challenges'

export default {
  name: 'Home',
  components: {
    WelcomeMessage,
    HomeLessons,
    HomeCourses,
    HomeChallenges,
  },
}
</script>

<style scoped>
.wrapper {
  height: 90vh;
  width: 100%;
}

.welcome-message {
  margin: 2% auto auto;
}

.lessons, .courses, .challenges {
  margin: 2% 5% auto 5%;
}

.divider {
  width: 90%;
  margin: auto;
}

</style>
