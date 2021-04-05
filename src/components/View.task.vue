<template>
  <div class="container">
    <div class="title-wrapper display-1 pl-3">
      <h4 class="pb-2">{{ title }}</h4>
      <h6>{{ subtitle }}</h6>
    </div>
    <p class="title pt-5">{{ description }}</p>
    <img src="../assets/task_image.png" alt="task">
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "View.task",
  data() {
    return {
      title: '',
      subtitle: '',
      description: ''
    }
  },
  methods: {
    ...mapActions(['getTask']),
    setData (data = {}) {
      this.title = data.title || '';
      this.subtitle = data.subtitle || '';
      this.description = data.description || '';
    }
  },
  async mounted() {
    const data = await this.getTask(this.$route.params.taskID)
    this.setData(data);
  }
}
</script>

<style scoped>
.title-wrapper {
  text-align: left;
  border-left: 5px solid #2c3e50;
}

img {
  width: 45%;
}

</style>
