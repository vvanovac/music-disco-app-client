<template>
  <div
      v-if="messagePrompt.length > 0"
      class="messageFormContainer"
  >
    <div
        class="messageForm"
        :class="formClass(message)"
        v-for="message of messagePrompt"
        :key="message.index"
    >
      <h1>{{message.header}}</h1>
      <p>{{message.text}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Form.message',
  computed: {
    ...mapGetters(['messagePrompt']),
  },
  methods: {
    formClass(messagePrompt) {
      switch (messagePrompt.validity) {
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
.messageFormContainer {
  position: fixed;
  top: 2%;
  right: 3%;
  width: 20%;
  z-index: 1;
}
.messageForm {
  color: #2c3e50;
  font-weight: bold;
  font-size: 10px;
  border-radius: 15px;
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
