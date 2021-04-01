<template>
  <div>
    <administrator-navbar/>
    <create-task/>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import CreateTask from '@/components/Create.task'

export default {
  name: 'Tasks',
  components: {
    AdministratorNavbar,
    CreateTask,
  },
}
</script>

<style scoped>

</style>
