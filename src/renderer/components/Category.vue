<template>
    <div class="sidebar__block" v-show="this.$store.state.category.category.length > 0">
       <div class="sidebar__title">Category</div>
        <div class="sidebar__list">
            <div class="sidebar__item" v-for="item in this.$store.state.category.category" :key="item.id" @click="deleteCategory(item.id)">{{item.title}}</div>
        </div>
    </div>
</template>

<script>

  export default {
    mounted() {
      this.$store.dispatch('getCategory');
    },
    methods: {
      deleteCategory(id) {
        this.$store.dispatch('deleteCategory', {
          id,
        });
      },
    },
  };
</script>

<style lang="scss">

</style>
