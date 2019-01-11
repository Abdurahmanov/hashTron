<template>
    <div class="main">
        <Sidebar />
        <NewsList />
        <NewsDetail></NewsDetail>
    </div>
</template>

<script>
  import Sidebar from './Sidebar';
  import NewsList from './NewsList';
  import NewsDetail from './NewsDetail';
  export default {
    components: {
      Sidebar,
      NewsList,
      NewsDetail,
    },
  };
</script>

<style lang="scss">
  .main {
    height: calc(100vh - 120px);
    display: flex;
  }
</style>
