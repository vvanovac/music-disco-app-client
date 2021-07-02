<template>
  <div class="wrapper">
    <div class="container-top">
      <div class="container-middle">
        <div class="middle-wrapper">
          <div class="middle-left circle outer-circle">
            <v-icon class="settings-icon">settings</v-icon>
          </div>
        </div>
        <div class="middle-wrapper">
          <div class="middle-center circle inner-circle">
            <v-icon class="account-icon">perm_identity</v-icon>
          </div>
        </div>
        <div class="middle-wrapper">
          <div class="middle-right circle outer-circle">
            <v-icon class="notifications-icon">notifications</v-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="container-bottom">
      <div class="user-wrapper">
        <h3 class="pb-2">User's name</h3>
        <h4>@username</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar.account',
}
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.container-top {
  height: 200px;
  background-color: #269beb;
  background-image: url('../assets/music-notes-background.png');
  background-size: 85%;
  background-position-x: center;
  background-position-y: top;
  position: relative;
}

.container-middle {
  height: 100px;
  width: 100%;
  margin-top: 150px;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: row;
}

.middle-wrapper {
  display: inline-block;
  width: 33%;
  margin: 0;
  padding: 0;
}

.middle-wrapper:nth-child(2) {
  margin: 0 0.5%
}

.circle {
  border: 1px solid lightgrey;
  border-radius: 50%;
  background-color: white;
}

.outer-circle {
  width: 50px;
  height: 50px;
}

.inner-circle {
  width: 100px;
  height: 100px;
}

.middle-left {
  margin: 20% 0 0 40%;
}

.middle-center {
  margin: 0 auto;
}

.middle-right {
  margin: 20% 0 0 15%;
}

.settings-icon {
  font-size: 2em;
  padding-top: 18%;
}

.notifications-icon {
  font-size: 2em;
  padding-top: 15%;
}

.account-icon {
  font-size: 6.5em;
}

.container-bottom {
  height: 150px;
  background-color: #f5f5f5;
  position: relative;
}

.user-wrapper {
  padding-top: 60px;
}

</style>
