<template>
  <div class="card-wrapper">
    <div
        class="card-header"
        :style="randomBackgroundColor"
    >
      {{ header }}
      <v-progress-circular
          class="progress"
          :size="17.5"
          :width="5"
          :value="setProgressValue"
          v-show="showProgressCircular"
      ></v-progress-circular>
    </div>
    <div class="card-body-wrapper">
      <div class="card-body-text">
        {{ body }}
      </div>
      <div class="card-body-buttons">
        <v-btn
            class="redirect-button"
            :round="true"
            @click="redirectAndStart"
        >
          {{ action }}
        </v-btn>
        <v-btn
            class="redirect-button"
            :round="true"
            v-show="showUpdateButton"
            @click="updateRedirect"
        >
          Update
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';

export default {
  name: 'Lesson.card',
  data() {
    return {
      colors: ['#40916c', '#e63946', '#fb8500', '#f9c74f', '#219ebc', '#f72585', '#9b5de5', '#80b918'],
      progress: 0,
      action: '',
      isStarted: false,
      taskIDs: [],
    }
  },
  props: {
    header: {
      type: String,
      required: true
    },
    colorIndex: {
      type: Number,
      required: false
    },
    body: {
      type: String,
      required: true
    },
    lessonID: {
      type: Number,
      required: true,
    },
    numberOfTasks: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      userData: getter.USER_DATA,
    }),
    randomBackgroundColor() {
      let number = this.colorIndex % 8;
      return {
        'background-color': this.colors[number]
      }
    },
    setProgressValue() {
      return this.progress / this.numberOfTasks * 100;
    },
    showProgressCircular() {
      return !this.userData.isAdmin;
    },
    showUpdateButton() {
      return this.userData.isAdmin;
    },
  },
  methods: {
    ...mapActions([
      action.COUNT_COMPLETED_TASKS, action.CREATE_USER_PROGRESS, action.GET_USER_PROGRESS_ID, action.GET_LESSON,
      action.IS_LESSON_STARTED,
    ]),
    async getLessonProgress(userID, lessonID) {
      this.progress = await this[action.COUNT_COMPLETED_TASKS]({ userID, lessonID });
      this.determineAction();
    },
    determineAction() {
      const progress = this.setProgressValue;
      if (this.userData.isAdmin) {
        return this.action = 'view';
      }
      if (progress === 0) {
        return this.action = 'start';
      } else if (progress > 0 && progress < 100) {
        return this.action = 'continue';
      } else {
        return this.action = 'repeat';
      }
    },
    async determineIsStarted() {
      this.isStarted = await this[action.IS_LESSON_STARTED]({ userID: this.userData.id, lessonID: this.lessonID});
    },
    redirectAndStart () {
      if (!this.isStarted && !this.userData.isAdmin) {
        this.taskIDs.forEach((id) => {
          this[action.CREATE_USER_PROGRESS]({ userID: this.userData.id, lessonID: this.lessonID, taskID: id })
        })
      }
      this.redirectToLesson();
    },
    redirectToLesson() {
      this.$router.push({ name: 'lesson', params: { lessonID: this.lessonID } });
    },
    updateRedirect() {
      this.$router.push({ name: 'updateLessons', params: { lessonID: this.lessonID }});
    },
    setTaskIDs(lesson = {}){
      this.taskIDs = lesson.listOfTasks || [];
    },
  },
  async mounted() {
    await this.getLessonProgress(this.userData.id, this.lessonID);
    await this.determineIsStarted();

    const lesson = await this[action.GET_LESSON](this.lessonID);
    this.setTaskIDs(lesson);
  },
}
</script>

<style scoped>
.card-wrapper {
  width: 100%;
  font-size: 1.25em;
  font-weight: bold;
  text-align: left;
  border: 1px solid gray;
  border-radius: 5px;
}

.card-header {
  background-color: #2a9d8f;
  color: white;
  border-radius: 4px 4px 0 0;
  padding: 13px 10px;
  height: 50px;
}

.progress {
  float: right;
}

.card-body-wrapper {
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  border-radius: 0 0 5px 5px;
}

.card-body-text {
  height: 75px;
  padding: 25px 10px 10px;
}

.card-body-buttons {
  height: 60px;
  padding: 0 10px;
}

.redirect-button {
  float: right;
  padding: 0;
  margin: 12px 0 12px 10px;
}

</style>
