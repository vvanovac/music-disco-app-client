<template>
  <div>
    <administrator-navbar/>
    <v-tabs fixed-tabs>
      <v-tab
          v-for="tab in tabs"
          :key="tab"
          @click="current(tab)"
      >
        {{ tab }}
      </v-tab>
    </v-tabs>
    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import Tasks from '@/components/Tasks.tab'

export default {
  name: 'Administrator',
  components: {
    AdministratorNavbar,
    Tasks
  },
  data() {
    const tabs = ['Tasks'];
    return {
      currentTab: tabs[0],
      tabs
    }
  },
  methods: {
    current(tab) {
      this.currentTab = tab;
    }
  }
}
</script>

<style scoped>

</style>
