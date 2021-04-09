<template>
  <div class="text-center">
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
    ...mapActions([action.SET_SLICE]),
    setSlice(page) {
      this[action.SET_SLICE](page);
    }
  }
}
</script>

<style scoped>

</style>
