import axios from 'axios';
// import jsonp from 'axios-jsonp';
import _ from 'lodash';
import moment from 'moment';
import io from 'socket.io-client';

const state = {
  searchResult: [],
  lastResult: {},
};

const actions = {
  getSearch({ dispatch, commit }, { slug }) { // eslint-disable-line
    // const url = `https://api.vk.com/method/newsfeed.search?q='%23${slug}'&access_token=a74abc42dce52ec3e599c0a713c4cdf670a492f380e3fe04431334dc3eb254c1c4592fbddaaa0ffbbd542&v=5.92&extended=1&fields='name'`;
    // axios({
    //   url,
    //   adapter: jsonp,
    // }).then((response) => {
    //   commit('setSearch', { result: response.data.response.items });
    // });

    axios.post('http://localhost:3000/news', {
      tag: slug,
    })
      .then((response) => {
        dispatch('test').then(() => {
          console.log(response);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  test({ commit }) {
    const socket = io.connect('http://localhost:3000');
    socket.on('news', (data) => {
      if (data !== '') {
        commit('setSearch', { result: data.event });
      }
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
};

export default {
  state,
  actions,
  mutations,
};
