<template>
  <div
      v-if="messagePrompt.length > 0"
      class="message-form-container"
  >
    <div
        class="message-form"
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
import { mapGetters } from 'vuex';
import { getter } from '@/store/store.constants';

export default {
  name: 'Form.message',
  computed: {
    ...mapGetters({ messagePrompt: getter.MESSAGE_PROMPT })
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
.message-form-container {
  position: fixed;
  top: 2%;
  right: 3%;
  width: 20%;
  z-index: 1;
}
.message-form {
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
