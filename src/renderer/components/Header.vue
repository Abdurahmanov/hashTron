<template>
  <header class="header">
    <router-link to="/"  class="logo">
      #TRON
    </router-link>
    <div class="header__search">
      <input type="text" placeholder="#js" v-model="searchStr" @keyup.enter="search()">
    </div>
    <button class="header__button" @click="addCategory" >+</button>
  </header>
</template>

<script>

  export default {
    data() {
      return {
        searchStr: '',
      };
    },
    mounted() {
      this.$store.dispatch('getWs');
    },
    methods: {
      search() {
        const self = this;
        if (self.searchStr !== '') {
          this.$store.dispatch('getSearch', {
            slug: self.searchStr,
          });
          // self.searchStr = '';
        }
      },
      addCategory() {
        const self = this;
        if (self.searchStr !== '') {
          this.$store.dispatch('addCategory', {
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
    color: inherit;
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
    background: url(../assets/plus.svg);
    width: 60px;
    height: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>
