const state = {
  activeItem: '',
  activeItemId: '',
};

const actions = {
  getItem({ commit }, { item }) {
    commit('setItem', { result: item });
  },
};

const mutations = {
  setItem(state, { result }) {
    state.activeItemId = result.id;
    state.activeItem = {
      like: false,
      ...result,
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
