<template>
  <div class="sidebar">
      <div class="sidebar__favorites">
          Favorites
      </div>
      <Category />
      <Filters />
  </div>
</template>

<script>
    import Category from './Category';
    import Filters from './Filters';
    export default {
      name: 'hashtron',
      components: {
        Category,
        Filters,
      },
    };
</script>

<style lang="scss">
  .sidebar {
      width: 200px;
      height: 100%;
      padding: 20px;
      border-right: 1px solid #ccc;

      &__favorites {
          font-size: 25px;
          opacity: 0.8;
          transition: 0.3s;
          cursor: pointer;

          &:hover {
              opacity: 1;
              transition: 0.3s;
          }
      }

      &__block {
          margin-top: 90px;
      }

      &__title {
          font-size: 30px;
          font-weight: 500;
      }

      &__list {
          margin-top: 20px;
          max-height: 25vh;
          overflow: auto;
      }

      &__item {
          margin-bottom: 15px;
          font-size: 20px;
          opacity: 0.8;
          transition: 0.3s;
          cursor: pointer;

          &:hover {
              opacity: 1;
              transition: 0.3s;
          }
          &:last-child {
              margin-bottom: 0;
          }
      }
  }
</style>
