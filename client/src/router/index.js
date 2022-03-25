import Vue from 'vue'
import VueRouter from 'vue-router'

//User Views
import Home from '../views/User/Home.vue'
import About from '../views/User/About.vue'
import Blog from '../views/User/Blog.vue'

import Login from '../views/Author/Login.vue'
import Register from '../views/Author/Register.vue'

import Panel from '../views/Author/Panel.vue'
import PanelListBlogs from '../views/Author/Panel/ListBlogs.vue'
import PanelNewBlog from '../views/Author/Panel/NewBlog.vue'


//Author Views

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel,
    children: [
      {
        path: '/',
        name: 'PanelListBlogs',
        component: PanelListBlogs
      },
      {
        path: 'new',
        name: 'PanelNewBlog',
        component: PanelNewBlog
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
