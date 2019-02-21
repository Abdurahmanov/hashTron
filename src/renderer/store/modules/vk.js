import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import io from 'socket.io-client';

const state = {
  searchResult: [],
  lastResult: {},
  favorites: [],
};

const actions = {
  getSearch({ commit }, { slug }) { // eslint-disable-line
    axios.post('http://localhost:3000/news', {
      tag: slug,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getWs({ commit }) {
    const socket = io.connect('http://localhost:3000');
    socket.on('news', (data) => {
      if (data !== '') {
        commit('setSearch', { result: data.event });
      }
    });
  },

  getFavorites({ commit }) { // eslint-disable-line
    axios.get('http://localhost:3000/getFavorites').then((res) => {
      console.log(res);
      commit('setFavorites', { result: res.data });
    });
  },
};

const mutations = {
  setSearch(state, { result }) {
    const formatObj = {
      id: _.get(result, 'signer_id') || _.get(result, 'event_id.post_owner_id', '0'),
      text: _.get(result, 'text', ''),
      date: moment.unix(_.get(result, 'creation_time', '0')).format('MMM Do YY'),
      ownerId: `${_.get(result, 'signer_id') || _.get(result, 'event_id.post_owner_id', '0')}${state.searchResult.length}`,
      photo: _.get(result, 'attachments[0].photo.photo_604', ''),
      preview: _.get(result, 'attachments[0].photo.photo_130', ''),
      author: _.get(result, 'author.author_url', ''),
      tags: _.get(result, 'tags'),
      socialNetwork: 'vk',
    };
    const newsLength = state.searchResult.length;
    if (newsLength === 0) {
      state.searchResult = state.searchResult.concat(formatObj);
    } else if (state.lastResult.id !== formatObj.id) {
      const newResult = state.searchResult;
      newResult.unshift(formatObj);
      state.searchResult = newResult;
    }
    state.lastResult = formatObj;
  },

  setFavorites(state, { result }) {
    console.log(result);
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
    }));
    state.favorites = formatObj.reverse();
  },
};

export default {
  state,
  actions,
  mutations,
};
