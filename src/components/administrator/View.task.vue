<template>
  <div class="container">
    <div class="title-wrapper display-1 pl-3">
      <h4 class="pb-2">{{ title }}</h4>
      <h6>{{ subtitle }}</h6>
    </div>
    <p class="title pt-5">{{ description }}</p>
    <piano-keys :octave="octave"/>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { action } from '@/store/store.constants';
import PianoKeys from '@/components/Piano.keys'

export default {
  name: 'View.task',
  components: {
    PianoKeys
  },
  data() {
    return {
      title: '',
      subtitle: '',
      description: '',
      octave: ''
    }
  },
  methods: {
    ...mapActions([action.GET_TASK]),
    setData (data = {}) {
      this.title = data.title || '';
      this.subtitle = data.subtitle || '';
      this.description = data.description || '';
      this.octave = data.octave || '';
    }
  },
  async mounted() {
    const data = await this[action.GET_TASK](this.$route.params.taskID)
    this.setData(data);
  }
}
</script>

<style scoped>
.title-wrapper {
  text-align: left;
  border-left: 5px solid #2c3e50;
}

img {
  width: 45%;
}

</style>
