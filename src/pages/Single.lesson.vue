<template>
  <view-lesson class="lesson"/>
</template>

<script>
import ViewLesson from '@/components/View.lesson';

export default {
  name: 'Lesson',
  components: {
    ViewLesson,
  },
}
</script>

<style scoped>
.lesson {
  width: 100%;
  margin: 25px;
  padding: 25px
}

</style>
