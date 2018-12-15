import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import AddArticle from '../components/AddArticle.vue'
import Article from '../components/Article.vue'

export const routes = [{
  path: '/home',
  component: Home
}, {
  path: '/about',
  component: About
}, {
  path: '/',
  component: Home
}, {
  path: '/y122972/addarticle',
  component: AddArticle
}, {
  name: 'article',
  path: '/article/:title',
  component: Article
}]

export default new VueRouter({
  routes
})
