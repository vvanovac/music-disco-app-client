<template>
  <div class="wrapper">
    <tasks-tab-item/>
    <div>
      <v-btn
          :round="true"
          @click="$router.push({name: 'createTasks'})"
      >
        Create
      </v-btn>
      <v-btn
          :round="true"
          @click="$store.dispatch('getTasks', true)"
      >
        Reload
      </v-btn>
      <v-btn
          :round="true"
          @click="$store.dispatch('previousPage')"
      >
        Previous Page
      </v-btn>
      <v-btn
          :round="true"
          @click="$store.dispatch('nextPage')"
      >
        Next Page
      </v-btn>
    </div>
  </div>
</template>

<script>
import TasksTabItem from '@/components/Tasks.tab.item'

export default {
  name: 'Tasks.tab',
  components: {
    TasksTabItem
  },
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 3% auto;
}

</style>
