<template>
  <div class="wrapper">
    <div>
      <item/>
    </div>
    <div>
      <v-btn
          :round="true"
          @click="$router.push({name: 'createTasks'})"
      >
        Create Task
      </v-btn>
      <v-btn
          :round="true"
          @click="$store.dispatch('getTasks', true)"
      >
        Reload Tasks
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
import Item from '@/components/Item'

export default {
  name: "Tasks.tab",
  components: {
    Item
  },
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 3% auto;
}

</style>
