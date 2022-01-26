import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import database from '@/store/database'
import modules from '@/store/modules'
import api from '@/api'

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, { axios: api });

// Create a new store
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
  modules,
});

export default store
