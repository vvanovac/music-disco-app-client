<template>
  <v-toolbar>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
             @click="$router.push({name: 'home'})"
      >Home</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Tasks</v-btn>
      <v-btn flat>Lessons</v-btn>
      <v-btn flat>Courses</v-btn>
      <v-btn flat>Users</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
             @click="$router.push({name: 'login'})"
      >Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Administrator.navbar"
}
</script>

<style scoped>
</style>
