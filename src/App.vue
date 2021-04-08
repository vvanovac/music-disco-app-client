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
import AdministratorNavbar from '@/components/administrator/Administrator.navbar'
import HomeNavbar from '@/components/home/Home.navbar'
import FormMessage from '@/components/Form.message'
import {mapGetters} from 'vuex';
import { getter } from '@/store/store.constants';

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
    ...mapGetters([getter.ADMIN_PROTECTED_ROUTES, getter.UNPROTECTED_ROUTES]),
    navbarToShow() {
      if (this[getter.ADMIN_PROTECTED_ROUTES].includes(this.$route.name)) {
        const index = this.navbar.indexOf('AdministratorNavbar')
        return this.navbar[index];
      } else if (this[getter.UNPROTECTED_ROUTES].includes(this.$route.name)) {
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
