<template>
  <div class="container">
    <h2>To {{ determineAction }} a course, please fill the fields bellow.</h2>
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
        <v-select
            :value="instrumentValue"
            :error-messages="instrumentErrors"
            :items="instruments"
            label="Instrument"
            required
            @input="setInstrumentValue"
        ></v-select>
        <v-btn
            class="save-buttons"
            :round="true"
            :disabled="disableSaveButton"
            @click="save"
        >
          {{ determineAction }} Course
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
import { validationMixin } from 'vuelidate/src';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';
import { courseMessages, messageHeader, messageText, messageValidity } from '@/constants/message.constants';

export default {
  name: 'Save.course',
  data() {
    const courseID = this.$route.params.courseID;
    return {
      courseID,
      title: '',
      description: '',
      instrument: '',
      isEdit: Number.isFinite(+courseID)
    }
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      instruments: getter.GET_INSTRUMENTS,
    }),
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) {
        return errors;
      }
      if (!this.$v.title.minLength) {
        errors.push(courseMessages.SHORT_TITLE);
      }
      if (!this.$v.title.required) {
        errors.push(courseMessages.TITLE_REQUIRED);
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      if (!this.$v.description.minLength) {
        errors.push(courseMessages.SHORT_DESCRIPTION);
      }
      if (!this.$v.description.required) {
        errors.push(courseMessages.DESCRIPTION_REQUIRED);
      }
      return errors;
    },
    instrumentErrors() {
      const errors = [];
      if (!this.$v.instrument.$dirty) {
        return errors;
      }
      if (!this.$v.description.required) {
        errors.push(courseMessages.INSTRUMENT_REQUIRED);
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
        return this.title === '' || this.description === '' || this.instrument === '';
      }
      return this.disableClearButton;
    },
    disableClearButton() {
      return this.title === '' && this.description === '' && this.instrument === '';
    },
    instrumentValue() {
      return this.instrument;
    }
  },
  methods: {
    ...mapActions([action.MESSAGE_PROMPT, action.CREATE_COURSE, action.UPDATE_COURSE, action.GET_COURSES,
      action.GET_COURSE]),
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
        instrument: this.instrument,
      };
      if (!this.isEdit) {
        const success = await this[action.CREATE_COURSE](payload);
        if (success) {
          this.clearFields();
          await this[action.GET_COURSES](true);
          await this.$router.push({name: 'administrator'});
        }
      } else {
        const success = await this[action.UPDATE_COURSE]({ ...payload, courseID: this.courseID});
        if (success) {
          this.clearFields();
          await this[action.GET_COURSES](true);
          await this.$router.push({name: 'administrator'});
        }
      }
    },
    clearFields() {
      this.$v.$reset();
      this.setCourseData();
    },
    clear() {
      this.clearFields();
      this[action.MESSAGE_PROMPT]({
        header: messageHeader.FIELDS_CLEARED,
        validity: messageValidity.INFO
      });
    },
    setCourseData(data = {}) {
      this.title = data.title || '';
      this.description = data.description || '';
      this.instrument = data.instrument || '';
    },
    setInstrumentValue(instrumentValue) {
      this.instrument = instrumentValue;
    },
  },
  async mounted() {
    if (this.isEdit) {
      const course = await this[action.GET_COURSE](this.$route.params.courseID);
      this.setCourseData(course);
    }
  },
  validations: {
    title: { required, minLength: minLength(8) },
    description: { required, minLength: minLength(16) },
    instrument: { required },
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
