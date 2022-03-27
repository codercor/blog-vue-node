import service from "../plugins/service";

const authorModule = {
  namespaced: true,
  state: {
    blogs: [],
    isAuthenticated: false,
    user: {},
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload;
    },
    setUserData(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = payload.isAuthenticated
    },
  },
  actions: {
    async getBlogs({ commit }) {
      let blogs = await service.fetchBlogs();
      commit("setBlogs", blogs);
    },
  },
  getters: {
    blogs(state) {
      return state.blogs;
    },
  },
};

export default authorModule;
