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
    components: {
      headerBlock,
    },
    mounted() {
      // this.$store.commit('wsVk');
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=cyrillic');
  .page {
    height: 100vh;
    font-family: 'Roboto', sans-serif;
  }

  * {
    box-sizing: border-box
  }


html {
  height: 100%
}

body {
  margin: 0;
  height: 100%;
  min-width: 1260px;
}

h1 {
 margin: 0
}


header,
nav,
section,
article,
aside,
footer {
  display: block
}


a {
  text-decoration: none
}

.dn {
  display: none !important
}

</style>
