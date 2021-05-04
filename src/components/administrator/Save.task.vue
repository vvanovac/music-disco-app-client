<template>
  <div class="container">
    <h2>To {{ determineAction }} a task, please fill the fields bellow.</h2>
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
            v-model="$v.subtitle.$model"
            :error-messages="subtitleErrors"
            :counter="8"
            label="Subtitle"
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
            :value="octaveValue"
            :error-messages="octaveErrors"
            :items="octaves"
            label="Octave"
            required
            @input="setOctaveValue"
        ></v-select>
        <v-select
            :value="musicNoteValue"
            :error-messages="musicNotesErrors"
            :items="notes"
            label="Music notes"
            required
            @input="setMusicNotesArray"
        ></v-select>
        <div class="notes-wrapper mb-4">
          <div
              v-for="(note, index) in musicNotes"
              :key="index"
              class="single-note"
          >
            {{ note }}
            <button
                class="remove-note-button"
                @click="removeNote(index)"
            >
              X
            </button>
          </div>
        </div>
        <v-btn
            class="save-buttons"
            :round="true"
            :disabled="disableSaveButton"
            @click="save"
        >
          {{ determineAction }} Task
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
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { action, getter } from '@/store/store.constants';
import { taskMessages, messageHeader, messageText, messageValidity } from '@/constants/message.constants'

export default {
  name: 'Save.task',
  data() {
    const taskID = this.$route.params.taskID;
    return {
      taskID,
      title: '',
      subtitle: '',
      description: '',
      musicNotes: [],
      lastChosenNote: '',
      octave: '',
      isEdit: Number.isFinite(+taskID),
    }
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      notes: getter.GET_NOTES,
      octaves: getter.GET_OCTAVES
    }),
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) {
        return errors
      }
      if (!this.$v.title.minLength) {
        errors.push(taskMessages.SHORT_TITLE);
      }
      if (!this.$v.title.required) {
        errors.push(taskMessages.TITLE_REQUIRED);
      }
      return errors
    },
    subtitleErrors () {
      const errors = []
      if (!this.$v.subtitle.$dirty) {
        return errors
      }
      if (!this.$v.subtitle.minLength) {
        errors.push(taskMessages.SHORT_SUBTITLE)
      }
      if (!this.$v.subtitle.required) {
        errors.push(taskMessages.SUBTITLE_REQUIRED)
      }
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) {
        return errors
      }
      if (!this.$v.description.minLength) {
        errors.push(taskMessages.SHORT_DESCRIPTION);
      }
      if (!this.$v.description.required) {
        errors.push(taskMessages.DESCRIPTION_REQUIRED);
      }
      return errors
    },
    musicNotesErrors () {
      const errors = []
      if (!this.$v.musicNotes.$dirty) {
        return errors
      }
      if (!this.$v.musicNotes.required) {
        errors.push(taskMessages.MUSIC_NOTES_REQUIRED);
      }
      return errors
    },
    octaveErrors () {
      const errors = []
      if (!this.$v.octave.$dirty) {
        return errors
      }
      if (!this.$v.octave.required) {
        errors.push(taskMessages.OCTAVE_REQUIRED);
      }
      return errors
    },
    determineAction () {
      if (!this.isEdit) {
        return 'create'
      } else {
        return 'update'
      }
    },
    disableSaveButton () {
      if (!this.isEdit) {
        return this.title === '' || this.subtitle === '' || this.description === '' ||
            this.musicNotes.length === 0 || this.octave === '';
      }
      return this.disableClearButton;
    },
    disableClearButton () {
      return this.title === '' && this.subtitle === '' && this.description === '' &&
          this.musicNotes.length === 0 && this.octave === '';
    },
    octaveValue() {
      return +this.octave;
    },
    musicNoteValue() {
      return this.lastChosenNote;
    }
  },
  methods: {
    ...mapActions([action.MESSAGE_PROMPT, action.CREATE_TASK, action.UPDATE_TASK, action.GET_TASKS, action.GET_TASK]),
    async save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this[action.MESSAGE_PROMPT]({
          header: messageHeader.SAVING_FAILED,
          text: messageText.INVALID_FORM,
          validity: messageValidity.ERROR,
        })
        return;
      }
      const payload = {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        musicNotes: this.musicNotes,
        octave: this.octave
      };
      if (!this.isEdit) {
        const success = await this[action.CREATE_TASK](payload)
        if (success) {
          this.clearFields();
          await this[action.GET_TASKS](true);
          await this.$router.push({name: 'administrator'});
        }
      } else {
        const success = await this[action.UPDATE_TASK]({ ...payload, taskID: this.taskID });
        if (success) {
          this.clearFields();
          await this[action.GET_TASKS](true);
          await this.$router.push({name: 'administrator'});
        }
      }
    },
    clearFields () {
      this.$v.$reset();
      this.setData();
    },
    clear () {
      this.clearFields();
      this[action.MESSAGE_PROMPT]({
        header: messageHeader.FIELDS_CLEARED,
        validity: messageValidity.INFO
      })
    },
    setData (data = {}) {
      this.title = data.title || '';
      this.subtitle = data.subtitle || '';
      this.description = data.description || '';
      this.musicNotes = data.musicNotes || [];
      this.octave = data.octave || '';
    },
    setOctaveValue(octaveValue) {
      this.octave = octaveValue.toString();
    },
    setMusicNotesArray(musicNoteValue) {
      this.musicNotes.push(musicNoteValue);
    },
    removeNote(index) {
      this.musicNotes = this.musicNotes.filter((target, indx) => indx !== index);
    }
  },
  async mounted() {
    if (this.isEdit) {
      const data = await this[action.GET_TASK](this.$route.params.taskID);
      this.setData(data);
    }
  },
  validations: {
    title: { required, minLength: minLength(8) },
    subtitle: { required, minLength: minLength(8) },
    description: { required, minLength: minLength(8) },
    musicNotes: { required },
    octave: { required }
  }
}
</script>

<style scoped>
h2 {
  margin: 5%;
  text-align: left;
}

.notes-wrapper, .single-note, .remove-note-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.single-note {
  justify-content: space-between;
  color: #2c3e50;
  width: 60px;
  height: 24px;
  padding-left: 7px;
  margin: 25px 25px 0 0;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}

.remove-note-button {
  justify-content: center;
  background-color: lightgrey;
  border-radius: 0 4px 4px 0;
  width: 20px;
  height: 22px;
  font-weight: bolder;
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
