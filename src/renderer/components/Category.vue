<template>
    <div class="sidebar__block">
       <div class="sidebar__title">Category</div>
        <div class="sidebar__list">
            <div class="sidebar__item" v-for="item in category" :key="item.id">{{item.name}}</div>
        </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        category: [
          {
            id: 1,
            name: 'JS',
          },
          {
            id: 2,
            name: 'CSS',
          },
        ],
      };
    },
  };
</script>

<style lang="scss">

</style>
