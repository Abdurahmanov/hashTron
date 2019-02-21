import axios from 'axios';
import _ from 'lodash';

const state = {
  activeItem: '',
  activeItemId: '',
  favorites: [],
};

const actions = {
  getItem({ commit }, { item }) {
    commit('setItem', { item });
  },
  addFavorites({ state, commit }) {
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

  deleteFavorites({ commit, dispatch }, { id }) { // eslint-disable-line
    axios.post('http://localhost:3000/deleteFavorites', {
      id,
    })
      .then(() => {
        dispatch('getFavorites');
        commit('destroyItem');
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getFavorites({ commit }) { // eslint-disable-line
    axios.get('http://localhost:3000/getFavorites').then((res) => {
      commit('setFavorites', { result: res.data });
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
  destroyItem(state) {
    state.activeItemId = '';
    state.activeItem = '';
  },
  setActiveFavorites(state) {
    state.activeItem = {
      ...state.activeItem,
      like: !state.activeItem.like,
    };
  },
  setFavorites(state, { result }) {
    const formatObj = result.map(item => ({
      id: _.get(item, 'id'),
      text: _.get(item, 'text', ''),
      date: _.get(item, 'date', ''),
      ownerId: _.get(item, 'ownerId'),
      photo: _.get(item, 'imagePath', ''),
      preview: _.get(item, 'preview', ''),
      author: _.get(item, 'source', ''),
      tags: _.get(item, 'IdTag'),
      socialNetwork: _.get(item, 'socialNetwork'),
      like: true,
      favorites: true,
    }));
    state.favorites = formatObj.reverse();
  },
};

export default {
  state,
  actions,
  mutations,
};
