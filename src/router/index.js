import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import (/* webpackChunkName: "home" */ '@/components/HelloWorld')
const Post = () => import (/* webpackChunkName: "post" */ '@/components/Post')
const highlighted = () => import (/* webpackChunkName: "highlightedWords" */ '@/components/highlighted')
const filterPosts = () => import (/* webpackChunkName: "filterPosts" */ '@/components/filterPosts')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/highlighted',
      component: highlighted
    },
    {
      path: '/filteredPosts',
      component: filterPosts
    }
  ]
})
