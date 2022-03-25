import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userModule from './user.module'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModule
  },
})
