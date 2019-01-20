import axios from 'axios';
import { SET_SEARCH } from '../const';

const state = {
  searchResult: {},
};

const actions = {
  getSearch({ commit }, { slug }) {
    axios.get(`https://api.vk.com/method/newsfeed.search?q="${slug}"&access_token=a74abc42dce52ec3e599c0a713c4cdf670a492f380e3fe04431334dc3eb254c1c4592fbddaaa0ffbbd542&v=5.92`)
      .then((response) => {
        commit('SET_SEARCH', { result: response.data });
      });
  },
};

const mutations = {
  [SET_SEARCH](state, { result }) {
    console.log(result);
    state.searchResult = result;
  },
};

export default {
  state,
  actions,
  mutations,
};
