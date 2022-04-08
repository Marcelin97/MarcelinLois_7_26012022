import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'

const routes = [
  {
    path: '/:catchAll(.*)',
    // path: "/page-not-found",
    // alias: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    // component: { render: (h) => h("div", ["404! Page Not Found!"]) },
  },
  {
    path: "/auth-required",
    component: { render: (h) => h("div", ["Auth required!"]) },
  },
  {
    path: '/',
    name: 'home',
    component: WelcomeView
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
    {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// * Check if user is authenticated
const isAuthenticated = () => false;
router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta?.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/auth-required");
    }
  } else {
    next();
  }
});
export default router
