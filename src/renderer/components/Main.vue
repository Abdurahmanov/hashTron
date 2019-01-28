<template>
    <div class="main">
        <Sidebar />
        <div class="main__block" v-if="this.$store.state.vk.searchResult.length > 0">
            <NewsList />
            <NewsDetail></NewsDetail>
        </div>
        <div class="main__empty" v-else>Введите в поисковую строку интересующий Вас hashtag</div>
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
      &__block {
          display: flex;
          width: calc(100% - 200px);
      }
      &__empty {
          font-size: 35px;
          color: #bbb;
          text-align: center;
          width: calc(100% - 200px);
          align-self: center;
      }
  }
</style>
