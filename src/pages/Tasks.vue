<template>
  <div>
    <administrator-navbar/>
    <create-task v-show="showCreate"/>
    <update-task v-show="showUpdate"/>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import CreateTask from '@/components/Create.task'
import UpdateTask from '@/components/Update.task'

export default {
  name: 'Tasks',
  components: {
    AdministratorNavbar,
    CreateTask,
    UpdateTask,
  },
  computed: {
    showCreate() {
      return this.$route.name === 'createTasks'
    },
    showUpdate() {
      return this.$route.name === 'updateTasks'
    }
  }
}
</script>

<style scoped>

</style>
