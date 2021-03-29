<template>
  <div class="admin-container">
    <administrator-navbar/>
    <create-task/>
    <update-task/>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import CreateTask from '@/components/Create.task'
import UpdateTask from '@/components/Update.task'

export default {
  name: 'Administrator',
  components: {
    AdministratorNavbar,
    CreateTask,
    UpdateTask
  },
}
</script>

<style scoped>

</style>
