import Vue from 'vue';
import Vuex from 'vuex';

// import { createPersistedState, createSharedMutations } from 'vuex-electron';

import vk from './modules/vk';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vk,
  },
  strict: process.env.NODE_ENV !== 'production',
});
