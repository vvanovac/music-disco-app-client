<template>
  <div class="wrapper">
    <lessons-tab-item/>
    <v-btn
        :round="true"
        @click="$router.push({ name: 'createLessons' })"
    >
      Create
    </v-btn>
    <v-btn
        :round="true"
        @click="$store.dispatch('GET_LESSONS', true)"
    >
      Reload
    </v-btn>
  </div>
</template>

<script>
import LessonsTabItem from '@/components/administrator/Lessons.tab.item';

export default {
  name: 'Lessons.tab',
  components: {
    LessonsTabItem,
  }
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 3% auto;
}

</style>
