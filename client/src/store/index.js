import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userModule from './user.module'
import authorModule from './author.module'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModule,
    author: authorModule
  },
})
