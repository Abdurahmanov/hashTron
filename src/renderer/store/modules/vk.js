import axios from 'axios';
import jsonp from 'axios-jsonp';
import _ from 'lodash';
import moment from 'moment';
import vkflow from 'vkflow';
import io from 'socket.io-client';

const state = {
  searchResult: [],
  VK_SERVICE_KEY: 'd6b72f18d6b72f18d6b72f1862d6df0310dd6b7d6b72f188ae535400a0ddc1f3581ad6a',
};

const actions = {
  getSearch({ commit }, { slug }) {
    const url = `https://api.vk.com/method/newsfeed.search?q='%23${slug}'&access_token=a74abc42dce52ec3e599c0a713c4cdf670a492f380e3fe04431334dc3eb254c1c4592fbddaaa0ffbbd542&v=5.92&extended=1&fields='name'`;
    axios({
      url,
      adapter: jsonp,
    }).then((response) => {
      commit('setSearch', { result: response.data.response.items });
    });
  },
  wsVk({ state }, { slug }) {
    const animalsFlow = vkflow(
      state.VK_SERVICE_KEY,
      [{ value: slug, tag: slug }],
    );

    animalsFlow.on('data', data => console.log(data.event));
  },

  test({ commit }) {
    const socket = io.connect('http://localhost:3000');
    socket.on('news', (data) => {
      if (data !== '') {
        const jsonData = JSON.parse(data);
        commit('setSearch', { result: jsonData.event });
      }
    });
    // axios.get('http://localhost:3000').then((res) => {
    //   console.log(res, 'res');
    //   if (res.data !== '') {
    //     const data = JSON.parse(res.data);
    //     commit('setSearch', { result: data.event });
    //   }
    // });
  },
};

const mutations = {
  setSearch(state, { result }) {
    console.log(result, 'result');
    const formatObj = {
      id: _.get(result, 'signer_id') || _.get(result, 'event_id.post_owner_id', '0'),
      text: _.get(result, 'text', ''),
      date: moment.unix(_.get(result, 'creation_time', '0')).format('MMM Do YY'),
      ownerId: _.get(result, 'signer_id') || _.get(result, 'event_id.post_owner_id', '0'),
      photo: _.get(result, 'attachments[0].photo.photo_604', ''),
      preview: _.get(result, 'attachments[0].photo.photo_130', ''),
      author: _.get(result, 'author.author_url', ''),
      tags: _.get(result, 'tags'),
    };

    console.log(formatObj, 'formatObj');
    state.searchResult = state.searchResult.concat(formatObj).reverse();
  },
};

export default {
  state,
  actions,
  mutations,
};
