<template>
  <div class="container pa-0 ma-0">
    <sidebar-account/>
    <sidebar-navigation/>
  </div>
</template>

<script>
import SidebarAccount from '@/components/Sidebar.account';
import SidebarNavigation from '@/components/Sidebar.navigation';

export default {
  name: 'Sidebar',
  components: {
    SidebarAccount,
    SidebarNavigation,
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 77vh;
}

</style>
