<template>
  <form>
    <v-container>
      <v-text-field
        v-model="$v.username.$model"
        :error-messages="usernameErrors"
        :counter="16"
        label="Username"
        required
      />
      <v-text-field
        v-model="$v.password.$model"
        :error-messages="passwordErrors"
        :counter="8"
        label="Password"
        required
      />
      <v-text-field
        v-model="$v.email.$model"
        :error-messages="emailErrors"
        label="Email"
      />
      <v-btn
        class="registerButtons"
        x-large
        outlined
        rounded
        @click="register"
      >
        Register
      </v-btn>
      <v-btn
        class="registerButtons"
        x-large
        outlined
        rounded
        @click="clear"
      >
        Clear
      </v-btn>
    </v-container>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  mixins: [validationMixin],
  computed: {
    usernameErrors () {
      const errors =[]
      if (!this.$v.username.$dirty) {
        return errors
      }
      if (!this.$v.username.maxLength) {
        errors.push('Username must be at most 16 characters long.')
      }
      if (!this.$v.username.required) {
        errors.push('Username is required.')
      }
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      if (!this.$v.password.minLength) {
        errors.push('Password must be at least 8 characters long.')
      }
      if (!this.$v.password.required) {
        errors.push('Password is required.')
      }
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      if (!this.$v.email.email) {
        errors.push('Email must be in a valid format.')
      }
      return errors
    }
  },
  validations: {
    username: { required, maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
    email: { email }
  },
  methods: {
    register() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        window.alert('Invalid form')
      }
      this.$http.post('register', {username: this.username, password: this.password, email: this.email})
      .then(() => this.$router.push({ name: 'login' }))
      .catch(error => window.alert(error.message));
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
      this.email = ''
    }
  }
}
</script>

<style scoped>
.registerButtons {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: aquamarine;
  margin: 10px 40px;
}
</style>
