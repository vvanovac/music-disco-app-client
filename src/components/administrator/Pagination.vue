<template>
  <div class="text-center d-flex">
    <h4 class="title font-weight-regular pt-4">Rows per page</h4>
    <v-select
        v-model="perPage"
        class="selector"
        :items="numberOfRows"
        @input="setDataPerPage"
    ></v-select>
    <v-spacer></v-spacer>
    <v-pagination
        :value="pageValue"
        :length="lengthValue"
        :total-visible="7"
        circle
        @input="setSlice"
    ></v-pagination>
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
      perPage: this.dataPerPage,
    }
  },
  computed: {
    ...mapGetters({
      dataLength: getter.TASK_DATA_LENGTH,
      page: getter.PAGINATION_PAGE,
      dataPerPage: getter.DATA_PER_PAGE
    }),
    pageValue() {
      return this.page + 1;
    },
    lengthValue() {
      return this.dataLength > 0 ? Math.ceil(this.dataLength / this.dataPerPage) : 3;
    }
  },
  methods: {
    ...mapActions([action.SET_SLICE, action.SET_DATA_PER_PAGE]),
    setSlice(page) {
      this[action.SET_SLICE](page);
    },
    setDataPerPage (perPage) {
      this[action.SET_DATA_PER_PAGE](perPage);
    }
  }
}
</script>

<style scoped>
.selector {
  width: 5%;
}

</style>
