<template>
  <div class="container">
    <sidebar class="sidebar"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'Lesson',
  components: {
    Sidebar,
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.sidebar {
  width: 20%;
}
</style>
