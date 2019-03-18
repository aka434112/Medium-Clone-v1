import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Post from '@/components/Post'
import highlighted from '@/components/highlighted'
import filterPosts from '@/components/filterPosts'

Vue.use(Router)

export default new Router({
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
