import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/router'
import vuetify from './plugins/vuetify'
import echo from './plugins/echo'
import analytics from './plugins/analytics'
/**
 * DO NOT DELETE DEPENDENCIES
 */

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
