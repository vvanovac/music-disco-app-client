<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex>
        <h1 class="display-1">Welcome back {{userData && userData.username}}! We are glad to have you here.</h1>
        <h3 class="display-0">Check below where were you leave off...</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home.welcome.message",
  computed: {
    ...mapGetters(['userData'])
  }
}
</script>

<style scoped>
.display-1 {
  padding-bottom: 1%;
}

.display-0 {
  padding-top: 1%;
}

</style>
