import axios from 'axios';
import jsonp from 'axios-jsonp';
import _ from 'lodash';
import moment from 'moment';
// import { SET_SEARCH } from '../const';

const state = {
  searchResult: [],
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
};

const mutations = {
  setSearch(state, { result }) {
    const formatObj = result.map(item => ({
      id: _.get(item, 'id', '0'),
      text: _.get(item, 'text', ''),
      date: moment.unix(_.get(item, 'date', '0')).format('MMM Do YY'),
      ownerId: _.get(item, 'owner_id', ''),
      photo: _.get(item, 'attachments[0].photo.sizes[3].url', ''),
      preview: _.get(item, 'attachments[0].photo.sizes[0].url', ''),
    }));
    state.searchResult = state.searchResult.concat(formatObj).reverse();
  },
};

export default {
  state,
  actions,
  mutations,
};
