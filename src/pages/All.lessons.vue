<template>
  <div class="pa-0 ma-0 main-container">
    <selecting-navbar/>
    <div class="pa-0 ma-0 cards-container">
      <div
          v-for="(lesson, index) in lessonData"
          :key="lesson.id"
          class="cards"
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';
import SelectingNavbar from '@/components/Selecting.navbar';
import LessonCard from '@/components/Lesson.card';

export default {
  name: 'All.lessons',
  components: {
    SelectingNavbar,
    LessonCard,
  },
  computed: {
    ...mapGetters({
      lessonData: getter.LESSON_DATA,
    }),
  },
  methods: {
    ...mapActions([action.GET_LESSONS]),
  },
  created() {
    this[action.GET_LESSONS]();
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
  flex-wrap: wrap;
  flex-direction: row;
}

.cards {
  width: clamp(219px, 25%, 400px);
  margin: 1% 6.16% 5%;
}

.cards:nth-child(3n+2) {
  margin-left: 0;
  margin-right: 0;
}

</style>
