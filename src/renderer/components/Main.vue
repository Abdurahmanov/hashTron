<template>
  <div class="main">
    <Sidebar></Sidebar>
    kek
  </div>
</template>

<script>
  import Sidebar from './Sidebar';
  export default {
    name: 'landing-page',
    components: {
      Sidebar,
    },
  };
</script>

<style>
  .main {
      height: calc(100vh - 120px);
  }
</style>