<template>
  <div
      class="messageForm"
      :class="formClass"
      v-if="messagePrompt"
  >
    <h1>{{messagePrompt.header}}</h1>
    <p>{{messagePrompt.text}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Invalid.form",
  computed: {
    ...mapGetters(['messagePrompt']),
    formClass() {
      switch (this.messagePrompt.validity) {
        case 'error':
          return 'invalid-form'
        case 'success':
          return 'valid-form'
        case 'info':
          return 'info-form'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.messageForm {
  position: absolute;
  bottom: 2%;
  left: 35%;
  right: 35%;
  width: 30%;
  color: #2c3e50;
  font-weight: bold;
  border-radius: 15px;
  z-index: 1;
  background-color: #ccccb3;
  border-left: 20px solid #999966;
}

.valid-form {
  background-color: #80ff80;
  border-left-color: green;
}

.invalid-form {
  background-color: #ff8080;
  border-left-color: red;
}

.info-form {
  background-color:  #80dfff;
  border-left-color: #33ccff;
}
</style>
