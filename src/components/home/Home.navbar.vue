<template>
  <v-toolbar>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Dashboard</v-btn>
      <v-btn flat>Leaderboard</v-btn>
      <v-btn flat>Activity</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
          flat
          @click="$router.push({name: 'login'})"
      >
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Home.navbar"
}
</script>

<style scoped>
</style>
