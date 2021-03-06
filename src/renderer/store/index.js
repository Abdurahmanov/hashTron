import Vue from 'vue';
import Vuex from 'vuex';

import vk from './modules/vk';
import newsItem from './modules/newsItem';
import category from './modules/category';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vk,
    newsItem,
    category,
  },
  strict: process.env.NODE_ENV !== 'production',
});
