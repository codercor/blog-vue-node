import Vue from 'vue'
import VueRouter from 'vue-router'

//User Views
import Home from '../views/User/Home.vue'
import About from '../views/User/About.vue'
import Blog from '../views/User/Blog.vue'

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
    path: '/blog',
    name: 'Blog',
    component: Blog
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
