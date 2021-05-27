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
      {{ body }}
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
      lessonProgress: getter.GET_LESSON_PROGRESS,
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
    ...mapActions([action.GET_LESSON_PROGRESS]),
    async getLessonProgress(userID, lessonID) {
      this.progress = await this[action.GET_LESSON_PROGRESS]({ userID, lessonID });
    }
  },
  mounted() {
    const userID = this.userData.id;
    const lessonID = this.lessonID;
    this.getLessonProgress(userID, lessonID);
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
  height: 100px;
}

</style>
