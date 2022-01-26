import {set} from '@/utils/vuex'
import api from '@/api'

import User from '@/store/database/User';
import Notification from '@/store/database/Notification';

export default {
  state: {
    unreadNotifications: 0,
  },

  mutations: {
    setUnreadNotifications: set('unreadNotifications'),
    increaseUnreadNotifications(state) {
      state.unreadNotifications += 1;
    },
    resetUnreadNotifications(state) {
      state.unreadNotifications = 0;
    }
  },

  actions: {
    notifyNewNotification({commit}) {
      commit('increaseUnreadNotifications');
    },
    async loadNotifications({commit}) {
      await Notification.deleteAll();
      await Notification.api().get('/api/notifications?read=1');
      commit('resetUnreadNotifications');
    },
    async loadUnreadNotificationsCount({commit}) {
      let response = await api.get('/api/notifications?read=0');

      let unreadNotificationsCount = response.data.unreadCount;
      commit('setUnreadNotifications', unreadNotificationsCount);
    },
    async clearNotifications({commit}) {
      await Notification.deleteAll();
      await Notification.api().delete('/api/notifications');
    }
  },

  getters: {
    authenticatedUserUnreadNotificationsCount(state) {
      return state.unreadNotifications;
    },

    authenticatedUserNotifications() {
      let authUser = User.getters('authenticatedUser')('notifications');
      return authUser ? authUser.notifications : [];
    },
  },
};
