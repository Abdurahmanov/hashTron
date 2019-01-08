<template>
  <div class="page" id="app">
    <header-block></header-block>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import headerBlock from './components/Header.vue';
  export default {
    name: 'hashtron',
    components: {
      headerBlock,
    },
  };
</script>

<style>
  /* CSS */
</style>
