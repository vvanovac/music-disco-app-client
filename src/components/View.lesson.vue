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
        <div v-if="showTask((index + 1), taskStep)">
          <view-task :taskID="id"/>
          <piano-keys :taskID="id"/>
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
      lessonTitle: '',
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
      return this.taskStep > 1 ? this.taskStep-- : this.taskStep = 1;
    },
    nextTask() {
      return this.taskStep < this.taskIDs.length ? this.taskStep++ : this.taskStep = this.taskIDs.length;
    },
  },
  async created() {
    const lesson = await this[action.GET_LESSON](this.$route.params.lessonID);
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
