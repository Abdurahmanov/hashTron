<template>
  <div class="main">
    <Sidebar />
    <NewsList />
  </div>
</template>

<script>
  import Sidebar from './Sidebar';
  import NewsList from './NewsList';
  export default {
    components: {
      Sidebar,
      NewsList,
    },
  };
</script>

<style lang="scss">
  .main {
    height: calc(100vh - 120px);
    display: flex;
  }
</style>
