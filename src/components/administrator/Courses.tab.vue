<template>
  <div class="wrapper">
    <courses-tab-item/>
    <v-btn
        :round="true"
        @click="$router.push({name: 'createCourses' })"
    >
      Create
    </v-btn>
    <v-btn
        :round="true"
        @click="$store.dispatch('GET_COURSES', true)"
    >
      Reload
    </v-btn>
    <pagination dataset="courses" :sort-by="['id', 'title']"/>
  </div>
</template>

<script>
import CoursesTabItem from '@/components/administrator/Courses.tab.item';
import Pagination from '@/components/administrator/Pagination';

export default {
  name: 'Courses.tab',
  components: {
    CoursesTabItem,
    Pagination,
  }
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 3% auto;
}

</style>
