import Vue from 'vue';
import Pusher from "pusher-js";
import VueEcho from 'vue-echo';
import { apiUrl } from '../api.js';

Vue.use(VueEcho, {
  authEndpoint: `${apiUrl}/broadcasting/auth`,
  broadcaster: 'pusher',
  key: 'dba835e00b8a422e6c3a',
  cluster: 'us2',
  forceTLS: true,
  encrypted: true,
  authTransport: 'jsonp',
});
