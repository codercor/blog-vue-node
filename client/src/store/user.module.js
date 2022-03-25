import service from '../plugins/service';
const userModule = {
    namespaced: true,
    state: {
        blogs:[],
        currentBlogId:null,
    },
    mutations: {
      setBlogs(state,payload){
        state.blogs = payload;
      },
      setCurrentBlogId(state,payload){
        state.currentBlogId = Number(payload);
      }
    },
    actions: {
        async getBlogs({commit}){
            let blogs = await service.fetchBlogs();
            commit('setBlogs',blogs); 
        },
        async getBlogById({commit,state},id){
            commit('setCurrentBlogId',(id));
            //currentBlogId id'sine sahip değer blogs'un içinde var mı yani o blog bizim state'de varmı
            let isExist = state.blogs.find(blog => blog.id == id);
            if (!isExist) {
                //blog yoksa fetch et
                let blog = await service.fetchBlogById(id);
                commit('setBlogs',[...state.blogs,blog]);
            }
        }
    },
    getters: {
        blogs(state){
            return state.blogs;
        },
        blog(state){
            return state.blogs.find(blog => blog.id === state.currentBlogId);
        }
    }
}

export default userModule;