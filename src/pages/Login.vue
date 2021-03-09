<template>
  <form>
    <v-container>
      <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :counter="16"
          label="Username"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
      ></v-text-field>
      <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
      ></v-text-field>
      <v-btn
          class="loginButtons"
          color="accent"
          x-large
          outlined
          rounded
          @click="submit"
      >
        Submit
      </v-btn>
      <v-btn
          class="loginButtons"
          color="accent"
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
  mounted() {
    this.$http.clearToken();
  },
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(16) },
    password: { required, minLength: minLength(8) },
  },

  data: () => ({
    username: '',
    password: '',
    showPassword: false,
  }),

  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Username must be at most 16 characters long.')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long.')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  },

  methods: {
    submit () {
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
