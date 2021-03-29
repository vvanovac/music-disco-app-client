<template>
  <div class="admin-container">
    <administrator-navbar/>
    <create-task/>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import CreateTask from '@/components/Create.task'

export default {
  name: 'Administrator',
  components: {
    AdministratorNavbar,
    CreateTask,
  },
}
</script>

<style scoped>

</style>
