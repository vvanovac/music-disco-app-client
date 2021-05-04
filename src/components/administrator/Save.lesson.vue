<template>
  <div class="container">
    <h2>To save a lesson, please fill the fields bellow.</h2>
    <form>
      <v-container>
        <v-text-field
            v-model="$v.title.$model"
            :error-messages="titleErrors"
            :counter="8"
            label="Title"
            required
        ></v-text-field>
        <v-text-field
            v-model="$v.description.$model"
            :error-messages="descriptionErrors"
            :counter="16"
            label="Description"
            required
        ></v-text-field>
        <v-text-field
            v-model="$v.listOfTasks.$model"
            :error-messages="listOfTasksErrors"
            label="List of Tasks"
            required
        ></v-text-field>
        <v-select
            :value="difficultyValue"
            :error-messages="difficultyErrors"
            :items="difficulties"
            label="Difficulty"
            required
        ></v-select>
        <v-text-field
            v-model="$v.courseID.$model"
            :error-messages="courseIDErrors"
            label="Course ID"
            required
        ></v-text-field>
      </v-container>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { minLength, required } from 'vuelidate/lib/validators';
import { lessonMessages } from '@/constants/message.constants';
import { mapGetters } from 'vuex';
import { getter } from '@/store/store.constants';

export default {
  name: 'Save.lesson',
  data() {
    return {
      title: '',
      description: '',
      listOfTasks: '',
      difficulty: '',
      courseID: ''
    }
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      difficulties: getter.GET_DIFFICULTIES
    }),
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) {
        return errors;
      }
      if (!this.$v.title.minLength) {
        errors.push(lessonMessages.SHORT_TITLE);
      }
      if (!this.$v.title.required) {
        errors.push(lessonMessages.TITLE_REQUIRED);
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      if (!this.$v.description.minLength) {
        errors.push(lessonMessages.SHORT_DESCRIPTION);
      }
      if (!this.$v.description.required) {
        errors.push(lessonMessages.DESCRIPTION_REQUIRED);
      }
      return errors;
    },
    listOfTasksErrors() {
      const errors = [];
      if (!this.$v.listOfTasks.$dirty) {
        return errors;
      }
      if (!this.$v.listOfTasks.required) {
        errors.push(lessonMessages.LIST_OF_TASKS_REQUIRED);
      }
      return errors;
    },
    difficultyErrors() {
      const errors = [];
      if (!this.$v.difficulty.$dirty) {
        return errors;
      }
      if (!this.$v.difficulty.required) {
        errors.push(lessonMessages.DIFFICULTY_REQUIRED);
      }
      return errors;
    },
    courseIDErrors() {
      const errors = [];
      if (!this.$v.courseID.$dirty) {
        return errors;
      }
      if (!this.$v.courseID.required) {
        errors.push(lessonMessages.COURSE_ID_REQUIRED);
      }
      return errors;
    },
    difficultyValue() {
      return this.difficulty;
    }
  },
  validations: {
    title: { required, minLength: minLength(8) },
    description: { required, minLength: minLength(16) },
    listOfTasks: { required },
    difficulty: { required },
    courseID: { required },
  }
}
</script>

<style scoped>
h2 {
  margin: 5%;
  text-align: left;
}

</style>
