<template>
  <div class="app-container">
    <administrator-navbar v-if="navbarToShow === 'admin'"/>
    <home-navbar v-if="navbarToShow === 'home'"/>
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
    ...mapGetters(['adminProtectedRoutes', 'unprotectedRoutes']),
    navbarToShow() {
      if (this.adminProtectedRoutes.includes(this.$route.name)) {
        return 'admin';
      } else if (this.unprotectedRoutes.includes(this.$route.name)) {
        return null;
      } else {
        return 'home';
      }
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
