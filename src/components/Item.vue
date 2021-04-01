<template>
  <div>
    <v-toolbar
        v-for="task in taskData"
        :key="task.taskID"
    >
      <v-toolbar-title>{{ task.taskID }}</v-toolbar-title>
      <v-toolbar-title>{{ task.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :round="true"
          @click="updateRedirect(task)"
      >
        Update
      </v-btn>
      <v-btn :round="true">
        Delete
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Item",
  computed: {
    ...mapGetters(['taskData'])
  },
  methods: {
    updateRedirect(task) {
      this.$router.push({name: 'updateTasks', params: { taskID: task.taskID}})
    }
  }
}
</script>

<style scoped>

</style>
