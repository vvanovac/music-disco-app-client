<template>
  <nav class="navigation">
    <ul>
      <li class="item"><button class="nav-button">Dashboard</button></li>
      <li class="item"><button class="nav-button">Leaderboard</button></li>
      <li class="item"><button class="nav-button">Activity</button></li>
      <li class="item"><button class="nav-button"
                               @click="$router.push({ name: 'login' })"
      >Log Out</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Home.navbar"
}
</script>

<style scoped>
.navigation {
  background-color: #ccd5ae;
}
ul {
  list-style-type: none;
}

a, a:active {
  text-decoration: none;
  color: inherit;
}

.item {
  display: inline-block;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-button {
  display: inline-block;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 15px 10px;
  font-weight: bold;
  font-size: 2em;
}

.nav-button:hover {
  background-color: #b7b7a4;
}

</style>
