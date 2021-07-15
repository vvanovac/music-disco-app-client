<template>
  <div>
    <v-toolbar
        v-for="course in courseData.slice(page * dataPerPage, (page + 1) * dataPerPage)"
        :key="course.id"
    >
      <v-toolbar-title>{{ course.id }}</v-toolbar-title>
      <v-toolbar-title>{{ course.title }}</v-toolbar-title>
      <v-spacer/>
      <v-btn
          :round="true"
          @click="updateRedirect(course)"
      >
        Update
      </v-btn>
      <v-btn
          :round="true"
          @click="setDeletingDialog(course)"
      >
        Delete
      </v-btn>
    </v-toolbar>
    <delete-dialog
        :title="deletingCourse.title"
        :show-dialog="showDialog"
        :attention-delete="true"
        @cancel="toggleDeleteDialog(false)"
        @confirm="confirmDeleting(deletingCourse.courseID)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';
import DeleteDialog from '@/components/administrator/Delete.dialog';

export default {
  name: 'Courses.tab.item',
  data() {
    return {
      showDialog: false,
      deletingCourse: {},
    }
  },
  computed: {
    ...mapGetters({
      courseData: getter.COURSE_DATA,
      page: getter.PAGINATION_PAGE,
      dataPerPage: getter.DATA_PER_PAGE,
    }),
  },
  methods: {
    ...mapActions([action.GET_COURSES, action.DELETE_COURSE]),
    updateRedirect(course) {
      this.$router.push({ name: 'updateCourses', params: { courseID: course.id }});
    },
    toggleDeleteDialog(show) {
      return this.showDialog = show;
    },
    setDeletingDialog(course) {
      this.deletingCourse = {
        courseID: course.id,
        title: course.title,
      }
      this.toggleDeleteDialog(true);
    },
    async confirmDeleting(courseID)  {
      await this[action.DELETE_COURSE](courseID);
      this.toggleDeleteDialog(false);
    },
  },
  created() {
    this[action.GET_COURSES]();
  },
  components: {
    DeleteDialog,
  }
}
</script>

<style scoped>

</style>
