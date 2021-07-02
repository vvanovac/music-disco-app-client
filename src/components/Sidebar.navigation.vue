<template>
  <v-navigation-drawer permanent class="container" width="1500">
    <v-list class="pt-0">
      <v-list-tile
          class="list pl-3"
          v-for="item in items"
          :key="item.title"
          @click="$router.push({name: item.route})"
          v-show="item.show"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import { getter } from '@/store/store.constants';

export default {
  name: 'Sidebar.navigation',
  data () {
    return {
      right: null
    }
  },
  computed: {
    ...mapGetters([getter.USER_DATA]),
    adminProtected() {
      return this[getter.USER_DATA] && this[getter.USER_DATA].isAdmin;
    },
    items() {
      return [
        { title: 'Home', icon: 'home', route: 'home', show: true },
        { title: 'Lessons', icon: 'music_note', route: 'lessons', show: true },
        { title: 'Courses', icon: 'school', route: '', show: true },
        { title: 'Challenges', icon: 'emoji_events', route: '', show: true },
        { title: 'Admin Panel', icon: 'manage_accounts', route: 'administrator', show: this.adminProtected },
      ]
    },
  }
}
</script>

<style scoped>
.container {
  padding: 0;
  background-color: #f5f5f5;
}

.list:hover {
  background-color: lightgrey;
}

</style>
