<template>
  <form class="registrationForm">
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
          type="password"
          label="Password"
          required
      />
      <v-text-field
          v-model="$v.email.$model"
          :error-messages="emailErrors"
          label="Email"
          required
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
      email: '',
    }
  },
  mixins: [validationMixin],
  computed: {
    usernameErrors () {
      const errors =[]
      if (!this.$v.username.$dirty) {
        return errors
      }
      if (!this.$v.username.minLength) {
        errors.push('Username must be at least 3 characters long.')
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
      if(!this.$v.email.required) {
        errors.push('Email is required.')
      }
      return errors
    }
  },
  validations: {
    username: { required, minLength: minLength(3), maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
    email: { required, email }
  },
  methods: {
    register() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$emit('message-prompt', {
          header: 'Registration failed.',
          text: 'Invalid form. Please try again.',
          validity: 'error',
        })
        return
      }
      this.$http.post('/register', {username: this.username, password: this.password, email: this.email})
        .then(() => {
          this.$emit('message-prompt', {
            header: 'Successfully registered.',
            validity: 'success',
          })
        })
        .then(() => {
          this.$router.push({name: 'login'})
        })
        .catch((error) => {
          this.$emit('message-prompt', {
            header: 'Registration failed.',
            text: error.message,
            validity: 'error',
          })
        });
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
      this.email = ''
      this.$emit('message-prompt', {
        header: 'All fields cleared.',
        validity: 'info'
      })
    }
  }
}
</script>

<style scoped>
.registrationForm {
  width: 40%;
  margin: auto;
}
.registerButtons {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: #a2d2ff;
  margin: 10px 40px;
  border: 1px solid #2c3e50;
}
</style>
