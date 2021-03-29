<template>
  <div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
    <v-btn
        class="registerButton"
        :round="true"
        @click="$router.push({name: 'register'})"
    >
      Register
    </v-btn>
    <form class="loginForm">
      <v-container
          @keyup.enter="login"
      >
        <v-text-field
            v-model="$v.username.$model"
            :error-messages="usernameErrors"
            :counter="16"
            label="Username"
            required
        ></v-text-field>
        <v-text-field
            v-model="$v.password.$model"
            :error-messages="passwordErrors"
            :counter="8"
            type="password"
            label="Password"
            required
        ></v-text-field>
        <v-btn
            class="loginButtons"
            :round="true"
            @click="login"
        >
          Log in
        </v-btn>
        <v-btn
            class="loginButtons"
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
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  mixins: [validationMixin],
  computed: {
    usernameErrors () {
      const errors = []
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
  },
  methods: {
    ...mapActions(['storeToken', 'clearToken', 'messagePrompt', 'loginUser']),
    login () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.messagePrompt({
          header: 'Login failed.',
          text: 'Invalid form. Please try again.',
          validity: 'error',
        })
        return
      }
      this.loginUser({username: this.username, password: this.password})
        .then((shouldRedirect) => shouldRedirect && this.$router.push({name: 'home'}));
    },
    clear () {
      this.$v.$reset()
      this.username = ''
      this.password = ''
      this.messagePrompt({
        header: 'All fields cleared.',
        validity: 'info'
      })
    },
  },
  validations: {
    username: { required, maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
  },
  mounted() {
    this.clearToken();
  },
}
</script>

<style scoped>
.loginForm {
  width: 40%;
  margin: 2% auto auto;
}
.loginButtons, .registerButton {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: #a2d2ff;
  margin: 10px 40px;
  border: 1px solid #2c3e50;
}

.registerButton {
  float: right;
}
</style>
