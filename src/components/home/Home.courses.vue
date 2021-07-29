<template>
  <v-container fill-height class="pa-0">
    <v-layout align-left>
      <v-flex>
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                <v-icon>school</v-icon>
                Courses
              </h3>
            </div>
          </v-card-title>

          <v-card-media>
            <div class="cards-wrapper">
              <div
                  v-for="course in courseData.slice(0,2)"
                  :key="course.id"
                  class="cards"
              >
                <course-card
                    :courseID="course.id"
                    :title="course.title"
                />
              </div>
            </div>
          </v-card-media>

          <v-card-actions>
            <v-btn
                flat
                color="gray"
                :round="true"
                class="show-more-button"
                @click="$router.push({name: 'courses'})"
            >
              show more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';
import CourseCard from '@/components/Course.card';

export default {
  name: 'Home.courses',
  components: {
    CourseCard
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
.headline {
  padding: 0 15px 25px;
  text-align: left;
}

.cards-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  padding: 10px 32px 25px;
}

.cards {
  width: 45%;
}

.show-more-button {
  margin-left: 10px;
}

</style>
