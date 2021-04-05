<template>
  <div>
    <v-toolbar
        v-for="task in taskData.slice(this.taskPagination.start, this.taskPagination.end)"
        :key="task.id"
    >
      <v-toolbar-title>{{ task.id }}</v-toolbar-title>
      <v-toolbar-title>{{ task.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :round="true"
          @click="updateRedirect(task)"
      >
        Update
      </v-btn>
      <v-btn
          :round="true"
          @click="setDeletingTask(task)"
      >
        Delete
      </v-btn>
    </v-toolbar>
    <v-layout row justify-center data-app>
      <v-dialog v-model="showDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Confirm Deletion</v-card-title>
          <v-card-text class="text-xs-left">Are you sure you want to delete <strong>{{ deletingTask.title }}</strong>?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-3"
                :round="true"
                flat
                @click="hideDeleteDialog">Cancel</v-btn>
            <v-btn
                color="red darken-3"
                :round="true"
                flat
                @click="taskDelete(deletingTask.taskID)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Item",
  data() {
    return {
      showDialog: false,
      deletingTask: {},
    }
  },
  computed: {
    ...mapGetters(['taskData', 'taskPagination'])
  },
  methods: {
    ...mapActions(['getTasks', 'deleteTask']),
    updateRedirect(task) {
      this.$router.push({name: 'updateTasks', params: { taskID: task.id}})
    },
    showDeleteDialog() {
      return this.showDialog = true;
    },
    hideDeleteDialog() {
      return this.showDialog = false;
    },
    setDeletingTask(task) {
      this.deletingTask = {
        taskID: task.id,
        title: task.title,
      }
      this.showDeleteDialog();
    },
    async taskDelete(taskID) {
      await this.deleteTask(taskID);
      this.hideDeleteDialog();
    }
  },
  created() {
    this.getTasks();
  }
}
</script>

<style scoped>

</style>
