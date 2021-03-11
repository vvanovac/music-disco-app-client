<template>
  <div
      class="messageForm"
      :class="{
        validForm: validity === 'success',
        invalidForm: validity === 'error',
        incompleteForm: validity === 'incomplete' }"
  >
    <h1>{{header}}</h1>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "Invalid.form",
  props: {
    header: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    validity: {
      type: String,
      required: true
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
}

.validForm {
  background-color: #80ff80;
  border-left: 20px solid green;
}

.invalidForm {
  background-color: #ff8080;
  border-left: 20px solid red;
}

.incompleteForm {
  background-color: #ffd280;
  border-left: 20px solid orange;
}
</style>
