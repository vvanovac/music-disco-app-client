<template>
  <div>
    <div
        v-for="(id, index) in taskIDs"
        :key="id"
    >
      <div v-if="showTask((index + 1), taskStep)">
        <view-task :taskID="id"/>
        <piano-keys :taskID="id"/>
      </div>
    </div>
    <v-btn
        :round="true"
        :disabled="disablePreviousButton"
        @click="previousTask"
    >
      Previous
    </v-btn>
    <v-btn
        :round="true"
        :disabled="disableNextButton"
        @click="nextTask"
    >
      Next
    </v-btn>
  </div>
</template>

<script>
import ViewTask from '@/components/administrator/View.task';
import PianoKeys from '@/components/Piano.keys';
import { mapActions } from 'vuex';
import { action } from '@/store/store.constants';

export default {
  name: 'View.lesson',
  components: {
    ViewTask,
    PianoKeys
  },
  data() {
    return {
      taskIDs: [],
      taskStep: 1,
    }
  },
  computed: {
    disablePreviousButton() {
      return this.taskStep === 1;
    },
    disableNextButton() {
      return this.taskStep === this.taskIDs.length;
    }
  },
  methods: {
    ...mapActions([action.GET_LESSON]),
    setTaskIDs(lesson = {}){
      this.taskIDs = lesson.listOfTasks || [];
    },
    showTask(index, step) {
      return index === step;
    },
    previousTask() {
      return this.taskStep > 1 ? this.taskStep-- : this.taskStep = 1;
    },
    nextTask() {
      return this.taskStep < this.taskIDs.length ? this.taskStep++ : this.taskStep = this.taskIDs.length;
    },
  },
  async created() {
    const lesson = await this[action.GET_LESSON](this.$route.params.lessonID);
    this.setTaskIDs(lesson);
  }
}
</script>

<style scoped>

</style>
