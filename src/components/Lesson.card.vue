<template>
  <div class="card-wrapper">
    <div
        class="card-header"
        :style="randomBackgroundColor"
    >
      {{ header }}
    </div>
    <div class="card-body">
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lesson.card',
  data() {
    return {
      colors: ['#40916c', '#e63946', '#fb8500', '#f9c74f', '#219ebc', '#f72585', '#9b5de5', '#80b918']
    }
  },
  props: {
    header: {
      type: String,
      required: true
    },
    colorIndex: {
      type: Number,
      required: false
    },
    body: {
      type: String,
      required: true
    }
  },
  computed: {
    randomBackgroundColor() {
      let number = this.colorIndex % 8;
      return {
        'background-color': this.colors[number]
      }
    }
  }
}
</script>

<style scoped>
.card-wrapper {
  width: 100%;
  font-size: 1.25em;
  font-weight: bold;
  text-align: left;
  border: 1px solid gray;
  border-radius: 5px;
}

.card-header {
  background-color: #2a9d8f;
  color: white;
  border-radius: 4px 4px 0 0;
  padding: 13px 10px;
  height: 50px;
}

.card-body {
  background-color: whitesmoke;
  border-radius: 0 0 5px 5px;
  padding: 20px 10px;
  height: 80px;
}

</style>
