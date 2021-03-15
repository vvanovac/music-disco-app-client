<template>
  <v-navigation-drawer permanent>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Music Disco App
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
          class="list"
          v-for="item in items"
          :key="item.title"
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
export default {
  name: 'Sidebar',
  data () {
    return {
      items: [
        { title: 'Home', icon: 'home' },
        { title: 'Lessons', icon: 'home' }, //book-music
        { title: 'Courses', icon: 'home' }, //box-music
        { title: 'Challenges', icon: 'home' } //award
      ],
      right: null
    }
  }
}
</script>

<style scoped>
.list:hover {
  background-color: #f5f5f5;
}
</style>
