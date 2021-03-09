<template>
  <form>
    <v-container>
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
          type="password"
          label="Password"
          required
      ></v-text-field>
      <v-btn
          class="loginButtons"
          x-large
          outlined
          rounded
          @click="login"
      >
        Log in
      </v-btn>
      <v-btn
          class="loginButtons"
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
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

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
        errors.push('Password is required')
      }
      return errors
    },
  },
  methods: {
    login () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        window.alert('Invalid form');
        return;
      }
      this.$http.post('login', {username: this.username, password: this.password})
      .then((token) => this.$http.storeToken(token.accessToken))
      .then(() => this.$router.push({ name: 'home'}))
      .catch(error => window.alert(error.message));
    },
    clear () {
      this.$v.$reset()
      this.username = ''
      this.password = ''
    },
  },
  validations: {
    username: { required, maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
  },
  mounted() {
    this.$http.clearToken();
  },
}
</script>

<style scoped>
.loginButtons {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: aquamarine;
  margin: 10px 40px;
}
</style>
