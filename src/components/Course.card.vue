<template>
  <div class="card-wrapper">
    <img class="pa-2 ma-0 img-container" src="../assets/keyboard-img.png" alt="">
    <div class="pa-0 ma-0 main-container">
      <p class="heading">Keyboard instruments</p>
      <p class="heading course-heading">{{ title }}</p>
      <p class="lessons-number">{{ numberOfLessons }}
        <span v-if="showLessonsLabel">lessons</span>
        <span v-if="!showLessonsLabel">lesson</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { action } from '@/store/store.constants';

export default {
  name: 'Course.card',
  props: {
    courseID: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      numberOfLessons: 0,
    }
  },
  computed: {
    showLessonsLabel() {
      return this.numberOfLessons > 1;
    }
  },
  methods: {
    ...mapActions([action.COUNT_LESSONS]),
  },
  async created() {
    this.numberOfLessons = await this[action.COUNT_LESSONS](this.courseID);
  }
}
</script>

<style scoped>
.card-wrapper {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 150px;
  border: 1px solid gray;
  border-radius: 5px;
}

.img-container {
  background-color: #E0E0E0;
  width: 30%;
  height: 100%;
  border-radius: 5px 0 0 5px;
}

.main-container {
  background-color: whitesmoke;
  width: 70%;
  height: 100%;
  border-left: 1px solid gray;
  border-radius: 0 5px 5px 0;
}

.heading {
  text-align: left;
  margin: 35px 20px 0;
  color: #2c3e50;
  font-weight: lighter;
  font-size: 1.15em;
}

.course-heading {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.25em;
}

.lessons-number {
  float: right;
  margin: 25px 20px 0 0;
  font-size: 1.1em;
}

</style>
