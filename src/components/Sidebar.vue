<template>
  <v-navigation-drawer permanent>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile
          class="list"
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
import {mapGetters} from 'vuex';

export default {
  name: 'Sidebar',
  data () {
    return {
      right: null
    }
  },
  computed: {
    ...mapGetters(['userData']),
    adminProtected() {
      return this.userData && this.userData.isAdmin;
    },
    items() {
      return [
          { title: 'Home', icon: 'home', route: 'home', show: true },
          { title: 'Lessons', icon: 'home', route: '', show: true }, //icon should be something like book-music
          { title: 'Courses', icon: 'home', route: '', show: true }, //icon should be something like box-music
          { title: 'Challenges', icon: 'home', route: '', show: true }, //icon should be something like award
          { title: 'Admin Panel', icon: 'home', route: 'administrator', show: this.adminProtected } //icon should be something like dashboard/panel
        ]
    }
  }
}
</script>

<style scoped>
.list:hover {
  background-color: #f5f5f5;
}
</style>
