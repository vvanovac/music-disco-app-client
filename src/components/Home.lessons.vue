<template>
  <div class="container">
    <div class="header">
      <h2>Lessons</h2>
    </div>
    <div class="list">
      <ul>
        <li>Course Title: Lesson number - lesson title</li>
        <li>Course Title: Lesson number - lesson title</li>
        <li>Course Title: Lesson number - lesson title</li>
        <a href="#">show more...</a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
name: "Home.lessons"
}
</script>

<style scoped>
.container {
  font-size: 1.5em;
}
.header, .list, a {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 2%;
}

li {
  padding: 2% 0;
}

a, a:active {
  font-style: italic;
  font-size: 0.75em;
  text-decoration: none;
  color: inherit;
}

</style>
