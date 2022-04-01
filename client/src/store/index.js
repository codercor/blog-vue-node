import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key:"blog-app",
  modules:['author']
})


import userModule from './user.module'
import authorModule from './author.module'

export default new Vuex.Store({
  state: {
    notification:{
      type: '',
      text: '',
      seen: false,
    }
  },
  mutations: {
    setNotification(state, payload){
      state.notification.text = payload.text;
      state.notification.type = payload.type;
      state.notification.seen = true;
      setTimeout(() => {
        state.notification.seen = false;
      }, payload.timeout || 2000);
     
    },
    closeNotification(state, payload){
      state.notification.seen = false;
    },
  },
  actions: {
  },
  getters:{
    notification(state){
      return state.notification;
    }
  },
  modules: {
    user: userModule,
    author: authorModule
  },
  plugins:[vuexLocal.plugin]
})
