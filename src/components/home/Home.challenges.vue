<template>
  <v-container fill-height class="pa-0">
    <v-layout align-left>
      <v-flex>
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                <v-icon>emoji_events</v-icon>
                Challenges
              </h3>
              <p>No challenges yet.</p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home.challenges',
}
</script>

<style scoped>
.headline {
  padding: 0 15px 25px;
  text-align: left;
}

</style>
