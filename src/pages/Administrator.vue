<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab
          class="title font-weight-regular"
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
import Tasks from '@/components/administrator/Tasks.tab'

export default {
  name: 'Administrator',
  components: {
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
