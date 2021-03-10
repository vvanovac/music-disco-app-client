<template>
  <div class="invalidForm">
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
    }
  }
}
</script>

<style scoped>
.invalidForm {
  width: 40%;
  margin: auto;
  background: #ff8080;
  border-left: 10px solid red;
  color: #2c3e50;
  font-weight: bold;
  padding: 10px;
}

.invalidForm > h1, p {
  padding-bottom: 15px;
}

</style>
