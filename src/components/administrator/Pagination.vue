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
    <p class="subheading font-weight-regular pt-4">Sort by</p>
    <v-select
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
  data() {
    return {
      numberOfRows: [5, 10, 25, 100],
      sortBy: ['id', 'title']
    }
  },
  computed: {
    ...mapGetters({
      dataLength: getter.TASK_DATA_LENGTH,
      page: getter.PAGINATION_PAGE,
      dataPerPage: getter.DATA_PER_PAGE,
      criteria: getter.SORT_CRITERIA
    }),
    pageValue() {
      return this.page + 1;
    },
    lengthValue() {
      return this.dataLength > 0 ? Math.ceil(this.dataLength / this.dataPerPage) : 3;
    },
    criteriaValue() {
      return this.criteria;
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
  }
}
</script>

<style scoped>
.selector {
  width: 5%;
}

</style>
