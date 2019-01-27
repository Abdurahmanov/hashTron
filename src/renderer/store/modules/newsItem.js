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
    state.activeItem = result;
  },
};

export default {
  state,
  actions,
  mutations,
};
