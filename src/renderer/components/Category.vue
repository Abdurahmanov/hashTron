<template>
    <div class="sidebar__block" v-show="this.$store.state.vk.category.length > 0">
       <div class="sidebar__title">Category</div>
        <div class="sidebar__list">
            <div class="sidebar__item" v-for="item in this.$store.state.vk.category" :key="item.id">{{item.title}}</div>
        </div>
    </div>
</template>

<script>

  export default {
    mounted() {
      this.$store.dispatch('getCategory');
    },
  };
</script>

<style lang="scss">

</style>
