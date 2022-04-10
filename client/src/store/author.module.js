import service from "../plugins/service";
import store from "./index";

const authorModule = {
  namespaced: true,
  state: {
    blogs: [],
    isAuthenticated: false,
    user: {},
    newBlog: {
      content: "",
      title: "",
      coverImage: null
    },
    editedBlog: {
      id: null,
      title: "",
      content: "",
    },
    isEditMode: false,
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload;
    },
    setIsEditMode(state, payload) {
      state.isEditMode = payload;
    },
    setEditedBlog(state, payload) {
      console.log("setEditBlog", payload);
      state.editedBlog.title = payload.title;
      state.editedBlog.content = payload.content;
      state.editedBlog.id = payload.id;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {};
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setUserData(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = payload.isAuthenticated;
    },
    setNewBlog(state, payload) {
      state.newBlog = payload;
    },
  },
  actions: {
    async getBlogs({ commit }) {
      commit("setBlogs", []);
      let blogs = await service.panel.fetchMyBlogs();
      commit("setBlogs", blogs);
    },
    async createBlog({ commit, state }) {
      let blog = await service.panel.createBlog(state.newBlog);
      commit("setNewBlog", { title: "", content: "" , coverImage: null});
      store.commit("setNotification", {
        text: blog.title + " başarıyla oluşturuldu",
        type: "success",
        timeout: 6000,
        link: `/blog/${blog.id}`,
      });
    },
    async updateBlog({ commit, state,dispatch }) {
      await service.panel.updateBlog(state.editedBlog);
      store.commit("setNotification", {
        text: state.editedBlog.title + " başarıyla güncellendi",
        type: "success",
        timeout: 6000,
        link: `/blog/${state.editedBlog.id}`,
      });
      commit("setEditedBlog", { title: " ", content: " ", id: null });
      commit("setIsEditMode", false);
      dispatch("getBlogs");
    },
    async deleteBlog({ commit, state,dispatch }, payload) {
      await service.panel.deleteBlog(payload);
      store.commit("setNotification", {
        text: "başarıyla silindi",
        type: "danger",
        timeout: 6000,
      });
      dispatch("getBlogs");
    },
  },
  getters: {
    blogs(state) {
      return state.blogs;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    newBlog(state) {
      return state.newBlog;
    },
    editedBlog(state) {
      return state.editedBlog;
    },
    isEditMode(state) {
      return state.isEditMode;
    },
  },
};

export default authorModule;
