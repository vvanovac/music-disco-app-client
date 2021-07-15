<template>
  <div class="pa-0 ma-0 main-container">
    <selecting-navbar
        page="courses"
    />
    <div class="pa-0 ma-0 cards-container">
      <div
          v-for="course in courseData"
          :key="course.id"
          class="cards"
      >
        <course-card
            :courseID="course.id"
            :title="course.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';
import SelectingNavbar from '@/components/Selecting.navbar';
import CourseCard from '@/components/Course.card';

export default {
  name: 'All.courses',
  components: {
    SelectingNavbar,
    CourseCard,
  },
  computed: {
    ...mapGetters({
      courseData: getter.COURSE_DATA,
    }),
  },
  methods: {
    ...mapActions([action.GET_COURSES]),
  },
  created() {
    this[action.GET_COURSES]();
  }
}
</script>

<style scoped>
.main-container, .cards-container {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  max-width: 100%;
}

.main-container {
  flex-direction: column;
}

.cards-container {
  flex-direction: row;
  flex-wrap: wrap;
}

.cards {
  width: 35%;
  margin: 5% 10%;
}

.cards:nth-child(2n) {
  margin-left: 0;
}

</style>
