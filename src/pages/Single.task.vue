<template>
  <div>
    <view-task/>
    <piano-keys :octave="octave" :task-goal="musicNotes"/>
  </div>
</template>

<script>
import ViewTask from '@/components/administrator/View.task';
import PianoKeys from '@/components/Piano.keys';
import { mapActions } from 'vuex';
import { action } from '@/store/store.constants';

export default {
  name: 'Task',
  components: {
    ViewTask,
    PianoKeys
  },
  data() {
    return {
      octave: '',
      musicNotes: []
    }
  },
  methods: {
    ...mapActions([action.GET_TASK]),
    setData (data = {}) {
      this.octave = data.octave || '';
      this.musicNotes = data.musicNotes || [];
    }
  },
  async mounted() {
    const data = await this[action.GET_TASK](this.$route.params.taskID);
    this.setData(data);
  }
}
</script>

<style scoped>

</style>
