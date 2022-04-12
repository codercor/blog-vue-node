import service from "../plugins/service";
const userModule = {
  namespaced: true,
  state: {
    blogs: [],
    blogsMeta: {},
    currentBlogId: null,
    perPage: [1, 3, 5, 10, 15, 20, 50],
    selectedPerPage: 10,
    page: 1,
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload;
    },
    setCurrentBlogId(state, payload) {
      state.currentBlogId = Number(payload);
    },
    setBlogsMeta(state, payload) {
      state.blogsMeta = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setSelectedPerPage(state, payload) {
      state.selectedPerPage = payload;
    },
  },
  actions: {
    async getBlogs({ commit }, { page, limit }) {
      const data = await service.fetchBlogs({ page, limit });
      let blogs = data.blogs;
      let blogsMeta = data.meta;
      commit("setBlogs", blogs);
      commit("setBlogsMeta", blogsMeta);
    },
    async getBlogById({ commit, state }, id) {
      commit("setCurrentBlogId", id);
      //currentBlogId id'sine sahip değer blogs'un içinde var mı yani o blog bizim state'de varmı
      let isExist = state.blogs.find((blog) => blog.id == id);
      if (!isExist) {
        //blog yoksa fetch et
        let blog = await service.fetchBlogById(id);
        commit("setBlogs", [...state.blogs, blog]);
      }
    },
  },
  getters: {
    blogs(state) {
      return state.blogs;
    },
    blog(state) {
      return state.blogs.find((blog) => blog.id === state.currentBlogId);
    },
    perPage(state) {
      return state.perPage;
    },
    selectedPerPage(state) {
      return state.selectedPerPage;
    },
    page(state) {
      return state.page;
    },
    blogsMeta(state) {
      return state.blogsMeta;
    },
  },
};

export default userModule;
