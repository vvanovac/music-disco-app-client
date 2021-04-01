<template>
  <div class="wrapper">
    <div>
      <item/>
    </div>
    <div class="button">
      <v-btn
          :round="true"
          @click="$router.push({name: 'createTasks'})"
      >
        Create
      </v-btn>
      <v-btn
          :round="true"
          @click="$store.dispatch('getTasks', true)"
      >
        Reload Tasks
      </v-btn>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item'

export default {
  name: "Tasks.tab",
  components: {
    Item
  },
}
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 3% auto;
}

.button {
  padding-right: 18px;
  float: right;
}


</style>
