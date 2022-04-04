import service from "../plugins/service";
import store from './index';

const authorModule = {
  namespaced: true,
  state: {
    blogs: [],
    isAuthenticated: false,
    user: {},
    newBlog:{
      content: "",
      title: "",
    }
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    logout(state){
      state.isAuthenticated = false;
      state.user = {};
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setUserData(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = payload.isAuthenticated
    },
    setNewBlog(state, payload){
      state.newBlog.title = payload.title || state.newBlog.title;
      state.newBlog.content = payload.content || state.newBlog.content;
    }
  },
  actions: {
    async getBlogs({ commit }) {
      commit("setBlogs", []);
      let blogs = await service.panel.fetchMyBlogs();
      commit("setBlogs", blogs);
    },
    async createBlog({commit,state}){
      let blog = await service.panel.createBlog(state.newBlog);
      commit("setNewBlog", {title:' ',content:' '});
      store.commit("setNotification",{
        text: blog.title+" başarıyla oluşturuldu",
        type: "success",
        timeout: 6000,
        link: `/blog/${blog.id}`
      })
    }
  },
  getters: {
    blogs(state) {
      return state.blogs;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    newBlog(state){
      return state.newBlog;
    }
  },
};

export default authorModule;
