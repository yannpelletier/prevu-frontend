import {set} from '@/utils/vuex'
import api from '@/api'

import Asset from '@/store/database/Asset'
import Watermark from '@/store/database/Watermark'
import Notification from '@/store/database/Notification'

import User from '@/store/database/User'

export default {
  state: {
    authenticated: false,
  },

  mutations: {
    setAuthenticated: set('authenticated'),
  },

  actions: {
    async login(_, {email, password}) {
      await api.post('/api/auth/login', {email, password});
    },
    async register(_, {email, password}) {
      await api.post('/api/auth/register', {email, password});
    },
    async resetPassword(_, {token, password, passwordConfirmation}) {
      await api.post('/api/auth/reset-password', {token, password, passwordConfirmation});
    },
    async sendPasswordRecoveryEmail(_, {email}) {
      await api.post('/api/auth/send-password-reset', {email: email});
    },

    async googleSignIn(_, queryParams) {
      await api.post('/api/auth/google/sign-in', queryParams);
    },
    async logout({commit, getters}) {
      await api.post('/api/auth/logout');
      commit('setAuthenticated', false);

      let authUser = getters.authenticatedUser();
      User.update({
        where: authUser.id,
        data: {
          authenticated: false
        }
      });
    },


    async loadAuthentication({commit, dispatch}) {
      try {
        let response = await User.api().get('/api/users/me');

        let authUser = response.entities.users[0];
        User.update({
          where: authUser.id,
          data: {
            authenticated: true
          }
        });

        commit('setAuthenticated', true);
        Asset.dispatch('loadAuthenticatedUserAssets');
        Watermark.dispatch('loadAuthenticatedUserWatermarks');
        Notification.dispatch('loadUnreadNotificationsCount');
      } catch (e) {
        commit('setAuthenticated', false);
      }
    },

    async updateAuthenticated(_, data) {
      await User.api().patch(`/api/users/me`, data);
    },
    async createStripeLoginLink(context) {
      let response = await api.get('/api/users/me/stripe-link');
      let link = response.data.link;
      context.commit('setStripeLoginLink', link);
      return link;
    },
    async loadAnalytics({getters}) {
      let authUser = getters.authenticatedUser();
      let analytics = await api.get('/api/users/me/analytics');
      User.update({
        where: authUser.id,
        data: {
          analytics: analytics.data
        }
      });
    },
    async loadSellerProgression({getters}) {
      let authUser = getters.authenticatedUser();
      let sellerProgression = await api.get('/api/users/me/seller-progression');
      User.update({
        where: authUser.id,
        data: {
          sellerProgression: sellerProgression.data
        }
      });
    }
  },

  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },

    authenticatedUser(state) {
      return (withField, chainQuery) => {
        let beginQuery = User.query().where('authenticated', true);
        if (withField) {
          return chainQuery !== undefined ? beginQuery.with(withField, chainQuery).first() : beginQuery.with(withField).first();
        } else {
          return beginQuery.first();
        }
      }
    }
  }
}
