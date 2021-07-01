<template>
  <v-toolbar flat class="navbar pa-0 ma-0">
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat class="nav-button">Dashboard</v-btn>
      <v-btn flat class="nav-button">Leaderboard</v-btn>
      <v-btn flat class="nav-button">Activity</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
          flat
          class="nav-button"
          @click="$router.push({name: 'login'})"
      >
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Home.navbar',
}
</script>

<style scoped>
.navbar {
  width: 100%;
  background: none;
  border: none;
}

.nav-button {
  text-transform: none;
  font-size: 1.25em;
}

</style>
