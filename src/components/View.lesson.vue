<template>
  <div>
    <div class="container">
      <h3
          class="title-wrapper display-2 mb-5"
          @click="redirectToLessons"
      >
        {{ lessonTitle }}
      </h3>
      <div
          v-for="(id, index) in taskIDs"
          :key="id"
      >
        <div v-if="showTask(index, taskStep)">
          <view-task :taskID="id"/>
          <piano-keys :taskID="id" :completed="completionStatus(id)"/>
        </div>
      </div>
      <v-btn
          :round="true"
          v-show="true"
          :disabled="disablePreviousButton"
          @click="previousTask"
      >
        Previous
      </v-btn>
      <v-btn
          :round="true"
          v-show="true"
          :disabled="disableNextButton"
          @click="nextTask"
      >
        Next
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';
import ViewTask from '@/components/administrator/View.task';
import PianoKeys from '@/components/Piano.keys';

export default {
  name: 'View.lesson',
  components: {
    ViewTask,
    PianoKeys
  },
  data() {
    return {
      lessonTitle: '',
      taskIDs: [],
      taskStep: 0,
    }
  },
  computed: {
    ...mapGetters({
      taskProgressData: getter.GET_TASK_PROGRESS_DATA,
      userData: getter.USER_DATA,
    }),
    disablePreviousButton() {
      return this.taskStep === 0;
    },
    disableNextButton() {
      return this.taskStep === this.taskIDs.length - 1;
    },
  },
  methods: {
    ...mapActions([action.GET_LESSON, action.GET_TASK_PROGRESS]),
    setLessonTitle(lesson = {}) {
      this.lessonTitle = lesson.title;
    },
    redirectToLessons() {
      this.$router.push({ name: 'lessons' });
    },
    setTaskIDs(lesson = {}){
      this.taskIDs = lesson.listOfTasks || [];
    },
    showTask(index, step) {
      return index === step;
    },
    previousTask() {
      if (this.taskStep > 0) {
        this.taskStep -= 1;
      }
    },
    nextTask() {
      if (this.taskStep < this.taskIDs.length - 1) {
        this.taskStep += 1;
      }
    },
    completionStatus(taskID) {
      const status = this.taskProgressData.filter((progress) => progress.taskID === taskID);
      return status.length > 0 ? status[0].completed : false;
    }
  },
  async created() {
    const lessonID = this.$route.params.lessonID;
    const userID = this.userData.id;
    const lesson = await this[action.GET_LESSON](lessonID);

    await this[action.GET_TASK_PROGRESS]({ userID, lessonID });
    this.setLessonTitle(lesson);
    this.setTaskIDs(lesson);
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.title-wrapper {
  text-align: left;
  font-weight: bolder;
}

</style>
