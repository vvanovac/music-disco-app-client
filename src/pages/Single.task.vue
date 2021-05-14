<template>
  <div>
    <view-task :taskID="taskID"/>
    <piano-keys :taskID="taskID"/>
  </div>
</template>

<script>
import ViewTask from '@/components/administrator/View.task';
import PianoKeys from '@/components/Piano.keys';

export default {
  name: 'Task',
  components: {
    ViewTask,
    PianoKeys
  },
  data() {
    const taskID = +this.$route.params.taskID;
    return {
      taskID,
    }
  },
}
</script>

<style scoped>

</style>
