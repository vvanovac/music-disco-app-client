<template>
  <div>
    <v-toolbar
        v-for="lesson in lessonData.slice(page * dataPerPage, (page + 1) * dataPerPage)"
        :key="lesson.id"
    >
      <v-toolbar-title>{{ lesson.id }}</v-toolbar-title>
      <v-toolbar-title>{{ lesson.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :round="true"
          @click="viewLesson(lesson)"
      >
        View
      </v-btn>
      <v-btn
          :round="true"
          @click="updateRedirect(lesson)"
      >
        Update
      </v-btn>
      <v-btn
          :round="true"
          @click="setDeletingDialog(lesson)"
      >
        Delete
      </v-btn>
    </v-toolbar>
    <delete-dialog
      :title="deletingLesson.title"
      :show-dialog="showDialog"
      @cancel="toggleDeleteDialog(false)"
      @confirm="confirmDeleting(deletingLesson.lessonID)"
    />
  </div>
</template>

<script>
import DeleteDialog from '@/components/administrator/Delete.dialog';
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';

export default {
  name: 'Lessons.tab.item',
  components: {
    DeleteDialog
  },
  data() {
    return {
      showDialog: false,
      deletingLesson: {}
    }
  },
  computed: {
    ...mapGetters({
      lessonData: getter.LESSON_DATA,
      page: getter.PAGINATION_PAGE,
      dataPerPage: getter.DATA_PER_PAGE,
    })
  },
  methods: {
    ...mapActions([action.GET_LESSONS, action.DELETE_LESSON]),
    updateRedirect(lesson) {
      this.$router.push({ name: 'updateLessons', params: { lessonID: lesson.id }});
    },
    toggleDeleteDialog(show) {
      return this.showDialog = show;
    },
    setDeletingDialog(lesson) {
      this.deletingLesson = {
        lessonID: lesson.id,
        title: lesson.title,
      }
      this.toggleDeleteDialog(true);
    },
    async confirmDeleting(lessonID) {
      await this[action.DELETE_LESSON](lessonID);
      this.toggleDeleteDialog(false);
    },
    viewLesson(lesson) {
      this.$router.push({ name: 'lesson', params: { lessonID: lesson.id }});
    }
  },
  created() {
    this[action.GET_LESSONS]();
  }
}
</script>

<style scoped>

</style>
