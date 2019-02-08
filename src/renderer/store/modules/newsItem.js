const state = {
  activeItem: '',
  activeItemId: '',
};

const actions = {
  getItem({ commit }, { item }) {
    commit('setItem', { item });
  },
};

const mutations = {
  setItem(state, { item }) {
    state.activeItemId = item.id;
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
