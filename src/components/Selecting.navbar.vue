<template>
  <div>
    <div class="container">
      <div>
        <v-icon>{{ icon }}</v-icon>
        <span class="page-header display-1"> {{ page }}</span>
      </div>
      <div class="select-wrapper">
        <v-select
            :items="dataset"
            :label="`Group by ${groupBy}`"
            solo
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Selecting.navbar',
  props: {
    page: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      groupBy: '',
      dataset: [],
      icon: '',
    }
  },
  methods: {
    determineIcon() {
      if (this.page === 'lessons') {
        this.icon = 'music_note';
      }
      if (this.page === 'courses') {
        this.icon = 'school';
      }
    },
  },
  created() {
    this.determineIcon();
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
  margin-right: 15%;
}
</style>
