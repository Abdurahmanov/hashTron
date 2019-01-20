<template>
  <header class="header">
    <div class="logo">#TRON</div>
    <div class="header__search">
      <input type="text" placeholder="#js" v-model="searchStr" @blur="search()" @keyup.enter="search()">
    </div>
    <button class="header__button"></button>
  </header>
</template>

<script>

  export default {
    data() {
      return {
        searchStr: '',
      };
    },
    methods: {
      search() {
        const self = this;
        if (self.searchStr !== '') {
          this.$store.dispatch('getSearch', {
            slug: self.searchStr,
          });
        }
      },
    },

  };
</script>

<style>
  .header {
    height: 120px;
    display: flex;
    align-items: center;
    padding: 35px 20px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  .logo {
    font-size: 38px;
  }

  .header__search {
    margin: 0 150px;
    width: 100%;
    max-width: 700px;
    height: 100%;
  }

  .header__search input {
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 5px 10px;
    font-size: 25px;
    outline: none
  }

  .header__button {
    outline: none;
    background: none;
    border: none;
    background: url(../assets/reset.svg);
    width: 60px;
    height: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>
