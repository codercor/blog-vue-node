import service from '../plugins/service';
const userModule = {
    namespaced: true,
    state: {
        blogs:[],
        blogsMeta:{},
        currentBlogId:null,
    },
    mutations: {
      setBlogs(state,payload){
        state.blogs = payload;
      },
      setCurrentBlogId(state,payload){
        state.currentBlogId = Number(payload);
      },
      setBlogsMeta(state,payload){
        state.blogsMeta = payload;
      }
    },
    actions: {
        async getBlogs({commit},{page,limit}){
            const data = (await service.fetchBlogs({page,limit}));
            let blogs =  data.blogs;
            let blogsMeta = data.meta;
            commit('setBlogs',blogs); 
            commit('setBlogsMeta',blogsMeta);
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