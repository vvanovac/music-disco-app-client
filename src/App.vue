<template>
  <div class="app-container">
    <keep-alive>
      <component :is="navbarToShow"></component>
    </keep-alive>
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
      navbar: ['AdministratorNavbar', 'HomeNavbar'],
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
        const index = this.navbar.indexOf('AdministratorNavbar')
        return this.navbar[index];
      } else if (this.unprotectedRoutes.includes(this.$route.name)) {
        return null;
      } else {
        const index = this.navbar.indexOf('HomeNavbar')
        return this.navbar[index];
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
