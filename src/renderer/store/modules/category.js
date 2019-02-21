import axios from 'axios';

const state = {
  category: [],
};

const actions = {
  addCategory({ commit, dispatch }, { slug }) { // eslint-disable-line
    axios.post('http://localhost:3000/category', {
      tag: slug,
    })
      .then((res) => {
        console.log(res);
        dispatch('getCategory');
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getCategory({ commit }) { // eslint-disable-line
    axios.get('http://localhost:3000/getCategory').then((res) => {
      console.log(res);
      commit('setCategory', { result: res.data });
    });
  },

  deleteCategory({ commit, dispatch }, { id }) { // eslint-disable-line
    axios.post('http://localhost:3000/deleteCategory', {
      id,
    })
      .then((res) => {
        console.log(res);
        dispatch('getCategory');
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {
  setCategory(state, { result }) {
    state.category = result;
  },
};

export default {
  state,
  actions,
  mutations,
};
