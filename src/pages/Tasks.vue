<template>
  <div>
    <administrator-navbar/>
    <edit-task/>
  </div>
</template>

<script>
import AdministratorNavbar from '@/components/Administrator.navbar'
import EditTask from '@/components/Edit.task'

export default {
  name: 'Tasks',
  components: {
    AdministratorNavbar,
    EditTask,
  },
}
</script>

<style scoped>

</style>
