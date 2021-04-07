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
        <v-text-field
            v-model="$v.imageURL.$model"
            :error-messages="imageURLErrors"
            :required="false"
            label="Image URL"
        ></v-text-field>
        <v-btn
            class="save-buttons"
            :round="true"
            @click="save"
        >
          {{ determineAction }} Task
        </v-btn>
        <v-btn
            class="save-buttons"
            :round="true"
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
import { required, minLength, url } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Save.task',
  data() {
    const taskID = this.$route.params.taskID;
    return {
      taskID,
      title: '',
      subtitle: '',
      description: '',
      imageURL: null,
      isEdit: Number.isFinite(+taskID),
    }
  },
  mixins: [validationMixin],
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) {
        return errors
      }
      if (!this.$v.title.minLength) {
        errors.push('Title must be at least 8 characters long.')
      }
      if (!this.$v.title.required) {
        errors.push('Title is required.')
      }
      return errors
    },
    subtitleErrors () {
      const errors = []
      if (!this.$v.subtitle.$dirty) {
        return errors
      }
      if (!this.$v.subtitle.minLength) {
        errors.push('Subtitle must be at least 8 characters long.')
      }
      if (!this.$v.subtitle.required) {
        errors.push('Subtitle is required.')
      }
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) {
        return errors
      }
      if (!this.$v.description.minLength) {
        errors.push('Description must be at least 16 characters long.')
      }
      if (!this.$v.description.required) {
        errors.push('Subtitle is required.')
      }
      return errors
    },
    imageURLErrors () {
      const errors = []
      if (!this.$v.imageURL.$dirty) {
        return errors
      }
      if (!this.$v.imageURL.url) {
        errors.push('Image URL must be a valid URL.')
      }
      return errors
    },
    determineAction () {
      if (!this.isEdit) {
        return 'create'
      } else {
        return 'update'
      }
    }
  },
  methods: {
    ...mapActions(['messagePrompt', 'createTask', 'updateTask', 'getTasks', 'getTask']),
    async save () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.messagePrompt({
          header: 'Failed to save.',
          text: 'Invalid form. Please try again.',
          validity: 'error',
        })
        return
      }
      const payload = {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        imageURL: this.imageURL
      };
      if (!this.isEdit) {
        await this.createTask(payload);
      } else {
        await this.updateTask({ ...payload, taskID: this.taskID });
      }
      this.clearFields();
      await this.getTasks(true);
      await this.$router.push({name: 'administrator'});
    },
    clearFields () {
      this.$v.$reset()
      this.setData();
    },
    clear () {
      this.clearFields();
      this.messagePrompt({
        header: 'All fields cleared.',
        validity: 'info'
      })
    },
    setData (data = {}) {
      this.title = data.title || '';
      this.subtitle = data.subtitle || '';
      this.description = data.description || '';
      this.imageURL = data.imageURL || null;
    }
  },
  async mounted() {
    if (this.isEdit) {
      const data = await this.getTask(this.$route.params.taskID);
      this.setData(data);
    }
  },
  validations: {
    title: { required, minLength: minLength(8) },
    subtitle: { required, minLength: minLength(8) },
    description: { required, minLength: minLength(8) },
    imageURL: { url },
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
