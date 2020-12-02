import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import SubmitRequest from '@/components/code-submit/SubmitRequest'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/submit-request',
      name: 'SubmitRequest',
      component: SubmitRequest
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})
