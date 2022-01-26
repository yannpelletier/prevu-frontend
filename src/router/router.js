import Vue from 'vue'
import Router from 'vue-router'
import paths from './paths'

import store from '@/store'
import User from '@/store/database/User'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths.routes,
  scrollRestoration: false,
});

router.beforeEach(async (to, from, next) => {
  store.commit('app/setLoading', true);
  if (!store.state.app.initiated) {
    await User.dispatch('loadAuthentication');
    store.commit('app/setInitiated', true);
  }
  next();
});

router.beforeResolve(async (to, from, next) => {
  let authenticated = User.getters('isAuthenticated');
  if (authenticated && !to.meta.availableLoggedIn) {
    store.commit('app/setLoading', false);
    next(paths.loggedInRedirect);
  } else if (!authenticated && !to.meta.availableLoggedOut) {
    store.commit('app/setLoading', false);
    next(paths.loggedOutRedirect);
  } else {
    store.commit('app/setLoading', false);
    next();
  }
});

export default router;
