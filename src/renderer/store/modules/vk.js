import axios from 'axios';
import jsonp from 'axios-jsonp';
// import { SET_SEARCH } from '../const';

const state = {
  searchResult: {},
};

const actions = {
  getSearch({ commit }, { slug }) {
    const url = `https://api.vk.com/method/newsfeed.search?q='%23${slug}'&access_token=a74abc42dce52ec3e599c0a713c4cdf670a492f380e3fe04431334dc3eb254c1c4592fbddaaa0ffbbd542&v=5.92`;
    console.log(slug, url);
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
    console.log(result);
    state.searchResult = result;
  },
};

export default {
  state,
  actions,
  mutations,
};
