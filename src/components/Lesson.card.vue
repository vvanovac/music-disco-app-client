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
      ></v-progress-circular>
    </div>
    <div class="card-body">
      <div>
        {{ body }}
      </div>
      <v-btn
          class="redirect-button ml-0 mt-3"
          :round="true"
          @click="redirectToLesson"
      >
        {{action}}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { action, getter } from '@/store/store.constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Lesson.card',
  data() {
    return {
      colors: ['#40916c', '#e63946', '#fb8500', '#f9c74f', '#219ebc', '#f72585', '#9b5de5', '#80b918'],
      progress: 0,
      action: '',
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
    }
  },
  methods: {
    ...mapActions([action.COUNT_COMPLETED_TASKS]),
    async getLessonProgress(userID, lessonID) {
      this.progress = await this[action.COUNT_COMPLETED_TASKS]({ userID, lessonID });
      this.determineAction();
    },
    determineAction() {
      if (this.setProgressValue === 0) {
        return this.action = 'start';
      } else if (this.setProgressValue > 0 && this.setProgressValue < 100) {
        return this.action = 'continue';
      } else {
        return this.action = 'repeat';
      }
    },
    redirectToLesson() {
      this.$router.push({ name: 'lesson', params: { lessonID: this.lessonID } });
    },
  },
  mounted() {
    this.getLessonProgress(this.userData.id, this.lessonID);
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

.card-body {
  background-color: whitesmoke;
  border-radius: 0 0 5px 5px;
  padding: 25px 10px;
  height: 130px;
}

.redirect-button {
  float: right;
}

</style>
