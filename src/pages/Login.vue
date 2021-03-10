<template>
  <div>
    <invalid-form
        header="Login failed."
        text="Invalid form. Please try again."
        v-show="invalidForm"
    ></invalid-form>
    <valid-form
        header="Successfully logged in."
        text="You will be shortly redirected to home page."
        v-show="validForm"
    ></valid-form>
    <form class="loginForm">
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import InvalidForm from '@/components/Invalid.form';
import ValidForm from '@/components/Valid.form'

export default {
  name: 'Login',
  components: {
    InvalidForm,
    ValidForm
  },
  data() {
    return {
      username: '',
      password: '',
      invalidForm: false,
      validForm: false,
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
    login: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.invalidForm = true
        setTimeout(() => {
          this.invalidForm = false;
        }, 3000)
        return
      }
      this.$http.post('/login', {username: this.username, password: this.password})
        .then((token) => this.$http.storeToken(token.accessToken))
        .then(() => {
          this.invalidForm = false;
          this.validForm = true;
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push({name: 'home'})
          }, 3000)
        })
        .catch(() => {
          this.invalidForm = true
          setTimeout(() => {
            this.invalidForm = false;
          }, 3000)
        });
    },
    clear () {
      this.$v.$reset()
      this.username = ''
      this.password = ''
      this.invalidForm = false
      this.validForm = false

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
.loginForm {
  width: 40%;
  margin: auto;
}
.loginButtons {
  justify-content: center;
  color: #2c3e50;
  font-size: 2em;
  font-weight: bolder;
  background-color: #a2d2ff;
  margin: 10px 40px;
  border: 1px solid #2c3e50;
}
</style>
