<template>
  <div class="app-container">
    <administrator-navbar v-show="showAdminNavbar"/>
    <home-navbar v-show="showHomeNavbar"/>
    <router-view></router-view>
    <form-message/>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import HomeNavbar from '@/components/Home.navbar'
import FormMessage from '@/components/Form.message'
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    AdministratorNavbar,
    HomeNavbar,
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
  },
  computed: {
    ...mapGetters(['userProtectedRoutes', 'adminProtectedRoutes']),
    showAdminNavbar() {
      return this.adminProtectedRoutes.includes(this.$route.name);
    },
    showHomeNavbar() {
      return this.userProtectedRoutes.includes(this.$route.name);
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
