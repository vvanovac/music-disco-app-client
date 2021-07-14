<template>
  <v-layout row justify-center data-app>
    <v-dialog v-model="showDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text class="text-xs-left">
          <span v-show="attentionDelete">
            <strong>Attention!</strong> All the lessons inside this course will be deleted.<br><br>
          </span>
          Are you sure you want to delete <strong>{{ title }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-3"
              :round="true"
              flat
              @click="$emit('cancel')"
          >
            Cancel
          </v-btn>
          <v-btn
              color="red darken-3"
              :round="true"
              flat
              @click="$emit('confirm')"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Delete.dialog',
  props: {
    title: {
      type: String,
      required: false
    },
    showDialog: {
      type: Boolean,
      required: true
    },
    attentionDelete: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
