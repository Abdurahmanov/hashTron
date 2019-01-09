<template>
  <div class="newsList">
    <NewsItem/>
  </div>
</template>

<script>
  import NewsItem from './NewsItem';
  export default {
    name: 'landing-page',
    components: {
      NewsItem,
    },
  };
</script>

<style lang="scss">
  .newsList {
    width: 400px;
    height: 100%;
    padding: 20px;
    border-right: 1px solid #ccc;
    overflow: auto;

  }
</style>
