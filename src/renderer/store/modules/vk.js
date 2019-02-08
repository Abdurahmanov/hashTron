import axios from 'axios';
import jsonp from 'axios-jsonp';
import _ from 'lodash';
import moment from 'moment';
import vkflow from 'vkflow';

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
};

const mutations = {
  setSearch(state, { result }) {
    const formatObj = result.map((item, index) => ({
      id: `${_.get(item, 'id', '0')}${index}`,
      text: _.get(item, 'text', ''),
      date: moment.unix(_.get(item, 'date', '0')).format('MMM Do YY'),
      ownerId: _.get(item, 'owner_id', ''),
      photo: _.get(item, 'attachments[0].photo.sizes[3].url', ''),
      preview: _.get(item, 'attachments[0].photo.sizes[0].url', ''),
    }));
    state.searchResult = state.searchResult.concat(formatObj).reverse();
  },

  wsVk(state) {
    const animalsFlow = vkflow(
      state.VK_SERVICE_KEY,
      [{ value: 'кот', tag: 'cats' },
        { value: 'собака', tag: 'dogs' },
        { value: 'попугай', tag: 'parrots' },
      ],
    );

    animalsFlow.on('data', data => console.log(data));
  },
};

export default {
  state,
  actions,
  mutations,
};
