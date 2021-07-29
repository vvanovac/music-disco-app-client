<template>
  <div class="text-center d-flex">
    <v-pagination
        :value="pageValue"
        :length="lengthValue"
        :total-visible="7"
        circle
        @input="setSlice"
    ></v-pagination>
    <v-spacer></v-spacer>
    <p class="subheading font-weight-regular pt-4">Rows per page</p>
    <v-select
        :value="dataPerPage"
        class="selector"
        :items="numberOfRows"
        @input="setDataPerPage"
    ></v-select>
    <p
        v-if="showSortBy"
        class="subheading font-weight-regular pt-4"
    >
      Sort by
    </p>
    <v-select
        v-if="showSortBy"
        :value="criteriaValue"
        class="selector"
        :items="sortBy"
        @input="setSortCriteria"
    ></v-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';

export default {
  name: 'Pagination',
  props: {
    dataset: {
      type: String,
      required: true
    },
    sortBy: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      taskDataLength: getter.TASK_DATA_LENGTH,
      lessonDataLength: getter.LESSON_DATA_LENGTH,
      courseDataLength: getter.COURSE_DATA_LENGTH,
      page: getter.PAGINATION_PAGE,
      dataPerPage: getter.DATA_PER_PAGE,
      numberOfRows: getter.NUMBER_OF_ROWS,
      criteria: getter.SORT_CRITERIA
    }),
    pageValue() {
      return this.page + 1;
    },
    determineDataset() {
      if (this.dataset === 'tasks') {
        return this.taskDataLength;
      } else if (this.dataset === 'lessons') {
        return this.lessonDataLength;
      } else if (this.dataset === 'courses') {
        return this.courseDataLength;
      } else {
        return null;
      }
    },
    lengthValue() {
      return this.determineDataset > 0 ? Math.ceil(this.determineDataset / this.dataPerPage) : 3;
    },
    criteriaValue() {
      return this.criteria;
    },
    showSortBy() {
      return this.sortBy.length > 0;
    }
  },
  methods: {
    ...mapActions([action.SET_SLICE, action.SET_DATA_PER_PAGE, action.SET_SORT_CRITERIA]),
    setSlice(page) {
      this[action.SET_SLICE](page);
    },
    setDataPerPage(dataPerPage) {
      this[action.SET_DATA_PER_PAGE](dataPerPage);
    },
    setSortCriteria(criteria) {
      this[action.SET_SORT_CRITERIA](criteria)
    }
  },
  destroyed() {
    this[action.SET_SORT_CRITERIA]('id');
  }
}
</script>

<style scoped>
.selector {
  width: 5%;
}

</style>
