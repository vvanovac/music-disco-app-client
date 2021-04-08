<template>
  <div>
    <v-toolbar
        v-for="task in taskData"
        :key="task.id"
    >
      <v-toolbar-title>{{ task.id }}</v-toolbar-title>
      <v-toolbar-title>{{ task.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :round="true"
          @click="viewTask(task)"
      >
        View
      </v-btn>
      <v-btn
          :round="true"
          @click="updateRedirect(task)"
      >
        Update
      </v-btn>
      <v-btn
          :round="true"
          @click="setDeletingDialog(task)"
      >
        Delete
      </v-btn>
    </v-toolbar>
    <delete-dialog
        :title="deletingTask.title"
        :show-dialog="showDialog"
        @cancel="toggleDeleteDialog(false)"
        @confirm="confirmDeleting(deletingTask.taskID)"
    />
  </div>
</template>

<script>
import DeleteDialog from '@/components/administrator/Delete.dialog'
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';

export default {
  name: 'Tasks.tab.item',
  components: {
    DeleteDialog
  },
  data() {
    return {
      showDialog: false,
      deletingTask: {},
    }
  },
  computed: {
    ...mapGetters([getter.TASK_DATA])
  },
  methods: {
    ...mapActions([action.GET_TASKS, action.DELETE_TASK]),
    updateRedirect(task) {
      this.$router.push({name: 'updateTasks', params: { taskID: task.id}})
    },
    toggleDeleteDialog(show) {
      return this.showDialog = show;
    },
    setDeletingDialog(task) {
      this.deletingTask = {
        taskID: task.id,
        title: task.title,
      }
      this.toggleDeleteDialog(true);
    },
    async confirmDeleting(taskID) {
      await this[action.DELETE_TASK](taskID);
      this.toggleDeleteDialog(false);
    },
    viewTask(task) {
      this.$router.push({name: 'task', params: { taskID: task.id }})
    }
  },
  created() {
    this[action.GET_TASKS]();
  }
}
</script>

<style scoped>

</style>
