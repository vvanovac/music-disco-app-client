<template>
  <div class="wrapper">
    <tasks-tab-item/>
    <v-btn
        :round="true"
        @click="$router.push({name: 'createTasks'})"
    >
      Create
    </v-btn>
    <v-btn
        :round="true"
        @click="$store.dispatch('GET_TASKS', true)"
    >
      Reload
    </v-btn>
    <pagination/>
  </div>
</template>

<script>
import TasksTabItem from '@/components/administrator/Tasks.tab.item'
import Pagination from '@/components/administrator/Pagination';

export default {
  name: 'Tasks.tab',
  components: {
    TasksTabItem,
    Pagination
  },
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 3% auto;
}

</style>
