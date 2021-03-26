<template>
  <div>
    <h2>To create new task, please fill the fields bellow.</h2>
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
            class="createTaskButtons"
            :round="true"
            @click="create"
        >
          Create Task
        </v-btn>
        <v-btn
            class="createTaskButtons"
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
  name: 'CreateTask',
  data() {
    return {
      title: '',
      subtitle: '',
      description: '',
      imageURL: null,
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
  },
  methods: {
    ...mapActions(['messagePrompt', 'createTask']),
    create () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.messagePrompt({
          header: 'Creating failed.',
          text: 'Invalid form. Please try again.',
          validity: 'error',
        })
        return
      }
      this.createTask({
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        imageURL: this.imageURL
      })
    },
    clear () {
      this.$v.$reset()
      this.title = ''
      this.subtitle = ''
      this.description = ''
      this.imageURL = ''
      this.messagePrompt({
        header: 'All fields cleared.',
        validity: 'info'
      })
    },
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

.createTaskButtons {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: #a2d2ff;
  margin: 10px 40px;
  border: 1px solid #2c3e50;
}
</style>
