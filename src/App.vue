<template>
  <div class="app-container" data-app>
    <div class="d-flex flex-row justify-start align-start ma-0 pa-0 app-wrapper">
      <div
          class="ma-0 pa-0 app-sidebar"
          v-show="showSidebar"
      >
        <sidebar/>
      </div>
      <div class="ma-0 pa-0 app-main">
        <component :is="navbarToShow"></component>
        <router-view></router-view>
      </div>
    </div>
    <form-message/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getter } from '@/store/store.constants';
import AdministratorNavbar from '@/components/administrator/Administrator.navbar'
import HomeNavbar from '@/components/home/Home.navbar'
import Sidebar from '@/components/Sidebar'
import FormMessage from '@/components/Form.message'

export default {
  name: 'App',
  components: {
    AdministratorNavbar,
    HomeNavbar,
    FormMessage,
    Sidebar,
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
      if (this.isRouteAdminProtected(this.$route.name)) {
        return 'AdministratorNavbar';
      }
      if (this.showNoNavbar(this.$route.name)) {
        return null;
      }
      return 'HomeNavbar';
    },
    showSidebar() {
      return !this.isRouteUnprotected(this.$route.name) && !this.isRouteAdminProtected(this.$route.name);
    },
  },
  methods: {
    isRouteAdminProtected(route) {
      return this[getter.ADMIN_PROTECTED_ROUTES].includes(route);
    },
    isRouteUnprotected(route) {
      return this[getter.UNPROTECTED_ROUTES].includes(route);
    },
    showNoNavbar(route) {
      return this.isRouteUnprotected(this.$route.name) || route === 'lessons' || route === 'courses';
    }
  },
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

.app-main {
  width: 80%;
}

.app-sidebar {
  width: 20%;
}

</style>
