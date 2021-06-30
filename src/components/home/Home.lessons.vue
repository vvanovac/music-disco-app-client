<template>
  <v-container fill-height class="pa-0">
    <v-layout align-left>
      <v-flex>
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                <v-icon>music_note</v-icon>
                Lessons
              </h3>
              <v-list class="pt-0">
                <v-list-tile
                    class="list"
                    v-for="item in items"
                    :key="item.title"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ item.courseTitle }} | {{ item.lessonNumber }} - {{ item.lessonTitle }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn
                flat
                color="gray"
                class="show-more-button"
                @click="$router.push({name: 'lessons'})"
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
export default {
  name: 'Home.lessons',
  data () {
    return {
      items: [
        { courseTitle: 'Course title', lessonNumber: 'Lesson 1', lessonTitle: 'Lesson title' },
        { courseTitle: 'Course title', lessonNumber: 'Lesson 2', lessonTitle: 'Lesson title' },
        { courseTitle: 'Course title', lessonNumber: 'Lesson 3', lessonTitle: 'Lesson title' }
      ],
    }
  },
}
</script>

<style scoped>
.headline {
  padding: 0 15px 25px;
  text-align: left;
}

.show-more-button {
  padding-left: 24px;
}

</style>
