<template>
  <div>
    <div class="validForm">
      <h1>{{header}}</h1>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Valid.form",
  props: {
    header: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.validForm {
  width: 40%;
  margin: auto;
  background: #80ff80;
  border-left: 10px solid green;
  color: #2c3e50;
  font-weight: bold;
  padding: 10px;
}

.validForm > h1, p {
  padding-bottom: 15px;
}

</style>
