import User from '@/store/database/User';
import Store from '@/store/database/Store';

import {set} from "@/utils/vuex";

export default {
  state: {
    currentStoreId: null,
  },

  mutations: {
    setCurrentStoreId: set('currentStoreId'),
  },

  actions: {
    async loadBySlug({commit}, slug) {
      let response = await Store.api().get(`/api/stores/${slug}`);

      let newStore = response.entities.stores[0];
      commit('setCurrentStoreId', newStore.id);
    },

    async updateById(_, {id, data}) {
      await Store.api().patch(`/api/stores/${id}`, data);
    },

    async createBySlug(_, {slug}) {
      await Store.api().post('/api/stores', {slug: slug});
    },

    async loadAuthenticatedUserStore() {
      await Store.api().get(`/api/users/me/store`);
    },
  },

  getters: {
    authenticatedUserStore() {
      let authUser = User.getters('authenticatedUser')('store');
      return authUser ? authUser.store : {};
    },

    currentStore(state) {
      return (withField, chainQuery) => {
        let beginQuery = Store.query().where('id', state.currentStoreId);
        if(withField){
          return chainQuery !== undefined ? beginQuery.with(withField, chainQuery).first() : beginQuery.with(withField).first();
        } else{
          return beginQuery.first();
        }
      }
    },
  },
};
