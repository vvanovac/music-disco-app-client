<template>
  <div class="container">
    <sidebar class="sidebar"/>
    <view-lesson class="lesson"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import ViewLesson from '@/components/View.lesson';

export default {
  name: 'Lesson',
  components: {
    Sidebar,
    ViewLesson,
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

.lesson {
  width: 100%;
  margin: 25px;
  padding: 25px
}

</style>
