<template>
  <div>
    <div class="container">
      <h4 class="display-1">Lessons</h4>
      <div class="select-wrapper">
        <v-select
            :items="dataset"
            :label="`Group by ${groupBy}`"
            solo
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Selecting.navbar',
  data() {
    return {
      groupBy: '',
      dataset: [],
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  padding: 30px 0 5px 0;
  margin: 0 0 0 6.16%;
}

.select-wrapper {
  width: 25%;
  margin-right: 15%;
}
</style>
