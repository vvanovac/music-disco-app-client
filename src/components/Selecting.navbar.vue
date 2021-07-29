<template>
  <div>
    <div class="container">
      <div>
        <v-icon>{{ icon }}</v-icon>
        <span class="page-header display-1"> {{ header }}</span>
      </div>
      <div class="select-wrapper">
        <v-select
            v-if="showSortBy"
            :value="criteriaValue"
            :items="sortBy"
            label="Sort by"
            solo
            @input="setSortCriteria"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { action, getter } from '@/store/store.constants';

export default {
  name: 'Selecting.navbar',
  props: {
    pageLessons: {
      type: Boolean,
      required: true,
    },
    pageCourses: {
      type: Boolean,
      required: true,
    },
    sortBy: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      header: '',
      icon: '',
    }
  },
  computed: {
    ...mapGetters({
      criteria: getter.SORT_CRITERIA,
    }),
    showSortBy() {
      return this.sortBy.length > 0;
    },
    criteriaValue() {
      return this.criteria;
    }
  },
  methods: {
    ...mapActions([action.SET_SORT_CRITERIA]),
    setHeader() {
      if (this.pageLessons) {
        this.header = 'Lessons';
        this.icon = 'music_note';
      }
      if (this.pageCourses) {
        this.header = 'Courses';
        this.icon = 'school';
      }
    },
    setSortCriteria(criteria) {
      this[action.SET_SORT_CRITERIA](criteria);
    },
  },
  created() {
    this.setHeader();
  },
  destroyed() {
    this[action.SET_SORT_CRITERIA]('id');
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  padding: 30px 0 5px 0;
  margin: 0 0 0 6.16%;
}

.page-header {
  text-transform: capitalize;
}

.select-wrapper {
  width: 25%;
  margin-right: 10%;
}

</style>
