import axios from 'axios';

const state = {
  activeItem: '',
  activeItemId: '',
};

const actions = {
  getItem({ commit }, { item }) {
    commit('setItem', { item });
  },
  getActiveItem({ state, commit }) {
    axios.post('http://localhost:3000/favorites', {
      item: state.activeItem,
    })
      .then(() => {
        commit('setActiveFavorites');
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {
  setItem(state, { item }) {
    state.activeItemId = item.ownerId;
    state.activeItem = {
      like: false,
      ...item,
    };
  },
  setActiveFavorites(state) {
    state.activeItem = {
      ...state.activeItem,
      like: !state.activeItem.like,
    };
  },
};

export default {
  state,
  actions,
  mutations,
};
