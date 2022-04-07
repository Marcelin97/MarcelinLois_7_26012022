import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WelcomeView
  },
  {
    path: '/account',
    name: 'account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
