import Vue from "vue";
import VueRouter from "vue-router";

//User Views
import Home from "../views/User/Home.vue";
import About from "../views/User/About.vue";
import Blog from "../views/User/Blog.vue";

import AuthWrapper from "../views/Auth/AuthWrapper.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";

//Author Views
import Panel from "../views/Author/Panel.vue";
import PanelListBlogs from "../views/Author/Panel/ListBlogs.vue";
import PanelNewBlog from "../views/Author/Panel/NewBlog.vue";

import store from "./../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/blog/:id",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/panel",
    name: "Panel",
    component: Panel,
    beforeEnter(to,from,next){
      if(localStorage.getItem("accessToken")&&store.state.author){
        next();
      }else{
        next("/auth/login");
      }
    },
    children: [
      {
        path: "/",
        name: "PanelListBlogs",
        component: PanelListBlogs,
      },
      {
        path: "new",
        name: "PanelNewBlog",
        component: PanelNewBlog,
      },
    ]
  },
  {
    path: "/auth",
    name: "Auth",
    protected:true,
    component: AuthWrapper,
    children: [
      {
        path: "register",
        name: "Register",
        component: Register,
      },
      {
        path: "*",
        name: "Login",
        component: Login,
      },
    
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
