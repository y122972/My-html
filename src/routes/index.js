import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import AddArticle from '../components/AddArticle.vue'
import Article from '../components/Article.vue'
import Login from '../components/Login.vue'
import Layout from '../components/Layout.vue'

// const Home = ()=>{import('../components/Home.vue')}
// const About = ()=>{import('../components/About.vue')}
// const AddArticle = ()=>{import('../components/AddArticle.vue')}
// const Article = ()=>{import('../components/Article.vue')}
// const Login = ()=>{import('../components/Login.vue')}
// const Layout = ()=>{import('../components/Layout.vue')}

export const routes = [ {
    path: '/',
    component: Layout,
    children: [{
        name: 'article',
        path: '/article/:title',
        component: Article
    },{
        path: '/about',
        component: About
    },{
        path: '/home',
        component: Home
    },{
        path: '/',
        component: Home
    }, {
        path: '/addarticle',
        component: AddArticle
    }, ]
    }, {
    path: '/login',
    component: Login
}]

export default new VueRouter({
  routes
})
