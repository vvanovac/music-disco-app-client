<template>
  <v-container fill-height class="pa-0">
    <v-layout align-left>
      <v-flex>
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                <v-icon>school</v-icon>
                Courses
              </h3>
              <p>No courses yet.</p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home.courses',
}
</script>

<style scoped>
.headline {
  padding: 0 15px 25px;
  text-align: left;
}

</style>
