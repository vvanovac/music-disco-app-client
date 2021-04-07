<template>
  <div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
    <v-btn
        class="login-button"
        :round="true"
        @click="$router.push({name: 'login'})"
    >
      Log In
    </v-btn>
    <form class="registration-form">
      <v-container>
        <v-text-field
            v-model="$v.username.$model"
            :error-messages="usernameErrors"
            :counter="16"
            label="Username"
            required
            @keyup.enter="register"
        />
        <v-text-field
            v-model="$v.password.$model"
            :error-messages="passwordErrors"
            :counter="8"
            type="password"
            label="Password"
            required
            @keyup.enter="register"
        />
        <v-text-field
            v-model="$v.email.$model"
            :error-messages="emailErrors"
            label="Email"
            required
            @keyup.enter="register"
        />
        <v-btn
            class="register-buttons"
            :round="true"
            :disabled="disableLoginButton"
            @click="register"
        >
          Register
        </v-btn>
        <v-btn
            class="register-buttons"
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
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
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
    },
    disableLoginButton () {
      return this.username === '' || this.password === '' || this.email === '';
    },
    disableClearButton () {
      return this.username === '' && this.password === '' && this.email === '';
    }
  },
  methods: {
    ...mapActions(['messagePrompt', 'registerUser']),
    async register() {
      if (!this.loading) {
        this.loading = true;
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.messagePrompt({
            header: 'Registration failed.',
            text: 'Invalid form. Please try again.',
            validity: 'error',
          })
        } else {
          const shouldRedirect = await this.registerUser({
            username: this.username,
            password: this.password,
            email: this.email
          })
          if (shouldRedirect) {
            await this.$router.push({name: 'login'});
          }
        }
        this.loading = false;
      }
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
      this.email = ''
      this.messagePrompt( {
        header: 'All fields cleared.',
        validity: 'info'
      })
    }
  },
  validations: {
    username: { required, minLength: minLength(3), maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
    email: { required, email }
  }
}
</script>

<style scoped>
.registration-form {
  width: 40%;
  margin: 2% auto auto;
}
.register-buttons, .login-button {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: #a2d2ff;
  margin: 10px 40px;
  border: 1px solid #2c3e50;
}

.login-button {
  float: right;
}
</style>
