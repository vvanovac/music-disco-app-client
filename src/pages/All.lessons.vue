<template>
  <div class="container">
    <sidebar class="sidebar"/>
    <div class="main-container">
      <selecting-navbar/>
      <div class="cards-container">
        <div
            v-for="(lesson, index) in lessonData"
            :key="lesson.id"
            class="cards"
            @click="redirectToLesson(lesson)"
        >
          <lesson-card
              :header="`Lesson ${index + 1}`"
              :color-index="index"
              :body="lesson.title"
              :lessonID="lesson.id"
              :number-of-tasks="lesson.listOfTasks.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import SelectingNavbar from '@/components/Selecting.navbar';
import LessonCard from '@/components/Lesson.card';
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';

export default {
  name: 'All.lessons',
  components: {
    Sidebar,
    SelectingNavbar,
    LessonCard
  },
  computed: {
    ...mapGetters({
      lessonData: getter.LESSON_DATA
    })
  },
  methods: {
    ...mapActions([action.GET_LESSONS]),
    redirectToLesson(lesson) {
      this.$router.push({ name: 'lesson', params: { lessonID: lesson.id }});
    },
  },
  created() {
    this[action.GET_LESSONS]();
  }
}
</script>

<style scoped>
.container, .main-container, .cards-container {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
  flex-direction: row;
}

.main-container {
  flex-direction: column;
}

.sidebar {
  width: 20%;
}

.cards-container {
  flex-wrap: wrap;
  flex-direction: row;
}

.cards {
  width: 25%;
  margin: 1% 6.16% 5%;
}

.cards:nth-child(3n+2) {
  margin-left: 0;
  margin-right: 0;
}

</style>
