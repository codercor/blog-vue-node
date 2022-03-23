import service from '../plugins/service';
const userModule = {
    namespaced: true,
    state: {
        blogs:[],
    },
    mutations: {
      setBlogs(state,payload){
        state.blogs = payload;
      }
    },
    actions: {
        async getBlogs({commit}){
            let blogs = await service.fetchBlogs();
            commit('setBlogs',blogs); 
        }
    },
    getters: {
        blogs(state){
            return state.blogs;
        }
    }
}

export default userModule;