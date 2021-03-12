<template>
  <div class="sidebar">
    <div class="sidebar-top">
      <img src="../assets/sidebar-top-image.png" alt="">
    </div>
    <div class="sidebar-main">
      <div class="sidebar-user">
        <div class="settings"></div>
        <div class="user"></div>
        <div class="notifications"></div>
      </div>
      <div class="sidebar-navbar">
        <nav class="navigation">
          <ul>
            <li class="item"><a href="#">Home</a></li>
            <li class="item"><a href="#">Lessons</a></li>
            <li class="item"><a href="#">Courses</a></li>
            <li class="item"><a href="#">Challenges</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Sidebar"
}
</script>

<style scoped>
.sidebar-top {
  background-color: #80ccff;
}

.sidebar-top > img {
  width: 100%;
}

.sidebar-main {
  margin: 10px 0;
  background-color: #e9edc9;
}

.sidebar-user {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.settings {
  background-color: greenyellow;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user {
  background-color: yellow;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.notifications {
  background-color: greenyellow;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.sidebar-navbar {
  margin-top: 10px;
}

.navigation > ul {
  list-style-type: none;
}

a, a:active {
  text-decoration: none;
  color: inherit;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ccd5ae;
  border-radius: 5px;
  margin: 10px 5px;
  padding: 15px 10px;
  font-weight: bold;
  font-size: 2em;
}

.item:hover {
  background-color: #b7b7a4;
}

</style>
