import Vue from 'vue';
import VueAnalytics from "vue-analytics";
import router from "../router/router";

Vue.use(VueAnalytics, {
  id: 'UA-142091494-1',
  router,
  debug: {
    sendHitTask: window.location.hostname.includes('prev-u.com')
  }
});
