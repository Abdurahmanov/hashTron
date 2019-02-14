<template>
  <div class="news-list">
    <NewsItem v-for="(item) in this.$store.state.vk.searchResult" :news="item" :key="item.ownerId" />
  </div>
</template>

<script>
  import NewsItem from './NewsItem';
  export default {
    components: {
      NewsItem,
    },
  };
</script>

<style lang="scss">
  .news-list {
    width: 400px;
    height: 100%;
    border-right: 1px solid #ccc;
    overflow: auto;

  }
</style>
