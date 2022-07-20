import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../views/NotFound.vue";
import WelcomeView from "../views/WelcomeView.vue";
import AccountView from "../views/AccountView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import WallView from "../views/WallView.vue";
import UserView from "../views/UserView";
import UserParameterView from "../views/UserParameterView";
import CommunityView from "../views/CommunityView";
import CommunityProfileView from "../views/CommunityProfilView";
import UsersView from "../views/UsersView";
// import TargetUser from "../components/Profil/TargetUser";

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  // {
  //   path: "/auth-required",
  //   component: { render: (h) => h("div", ["Auth required!"]) },
  // },
  {
    path: "/",
    name: "home",
    component: WelcomeView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/wall",
    name: "wall",
    component: WallView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/user/parameter",
    name: "user/parameter",
    component: UserParameterView,
  },
  {
    path: "/explore/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/explore/users/:id",
    name: "userTarget",
    component: UserView,
    props: true,
  },
  {
    path: "/communities",
    name: "communities",
    component: CommunityView,
  },
  {
    path: "/communities/profil/:id",
    name: "communities/profil",
    component: CommunityProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // * Scroll Behavior savedPosition
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

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
export default router;
