<template>
  <div class="container">
    <h2>To {{ determineAction }} a lesson, please fill the fields bellow.</h2>
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
            @input="setDifficultyValue"
        ></v-select>
        <v-text-field
            v-model="$v.courseID.$model"
            :error-messages="courseIDErrors"
            label="Course ID"
            required
        ></v-text-field>
        <v-btn
            class="save-buttons"
            :round="true"
            :disabled="disableSaveButton"
            @click="save"
        >
          {{ determineAction }} Lesson
        </v-btn>
        <v-btn
            class="save-buttons"
            :round="true"
            :disabled="disableClearButton"
            @click="clear"
        >
          Clear
        </v-btn>
      </v-container>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import { action, getter } from '@/store/store.constants';
import { lessonMessages, messageHeader, messageText, messageValidity } from '@/constants/message.constants';

export default {
  name: 'Save.lesson',
  data() {
    const lessonID = this.$route.params.lessonID;
    return {
      lessonID,
      title: '',
      description: '',
      listOfTasks: '',
      difficulty: '',
      courseID: '',
      isEdit: Number.isFinite(+lessonID)
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
    determineAction() {
      if (!this.isEdit) {
        return 'create';
      }
      return 'update';
    },
    disableSaveButton() {
      if (!this.isEdit) {
        return this.title === '' || this.description === '' || this.listOfTasks.length === 0 ||
            this.difficulty === '' || this.courseID === '';
      }
      return this.disableClearButton;
    },
    disableClearButton() {
      return this.title === '' && this.description === '' && this.listOfTasks.length === 0 &&
          this.difficulty === '' && this.courseID === '';
    },
    difficultyValue() {
      return this.difficulty;
    }
  },
  methods: {
    ...mapActions([
        action.MESSAGE_PROMPT, action.CREATE_LESSON, action.UPDATE_LESSON, action.GET_LESSON, action.GET_LESSONS
    ]),
    async save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this[action.MESSAGE_PROMPT]({
          header: messageHeader.SAVING_FAILED,
          text: messageText.INVALID_FORM,
          validity: messageValidity.ERROR,
        });
        return;
      }
      const payload = {
        title: this.title,
        description: this.description,
        listOfTasks: this.listOfTasks.split(','),
        difficulty: this.difficulty,
        courseID: +this.courseID
      };
      if (!this.isEdit) {
        const success = await this[action.CREATE_LESSON](payload);
        if (success) {
          this.clearFields();
          await this[action.GET_LESSONS](true);
          await this.$router.push({ name: 'administrator' });
        }
      } else {
        const success = await this[action.UPDATE_LESSON]({ ...payload, lessonID: this.lessonID });
        if (success) {
          this.clearFields();
          await this[action.GET_LESSONS](true);
          await this.$router.push({ name: 'administrator' });
        }
      }
    },
    clearFields() {
      this.$v.$reset();
      this.setData();
    },
    clear() {
      this.clearFields();
      this[action.MESSAGE_PROMPT]({
        header: messageHeader.FIELDS_CLEARED,
        validity: messageValidity.INFO
      });
    },
    setData(data = {}) {
      this.title = data.title || '';
      this.description = data.description || '';
      if (data.listOfTasks) {
        this.listOfTasks = data.listOfTasks.toString();
      } else {
        this.listOfTasks = '';
      }
      this.difficulty = data.difficulty || '';
      this.courseID = data.courseID || '';
    },
    setDifficultyValue(difficulty) {
      this.difficulty = difficulty;
    }
  },
  async mounted() {
    if (this.isEdit) {
      const data = await this[action.GET_LESSON](this.$route.params.lessonID);
      this.setData(data);
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

.save-buttons {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: #a2d2ff;
  margin: 10px 40px;
  border: 1px solid #2c3e50;
}
</style>
