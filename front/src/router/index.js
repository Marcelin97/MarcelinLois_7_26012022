import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../views/NotFound.vue";
import WelcomeView from "../views/WelcomeView.vue";
import AccountView from "../views/AccountView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView";
import UserParameterView from "../views/UserParameterView";
import UsersView from "../views/UsersView";
import ProfileView from "../views/ProfileView";
import CommunitiesView from "../views/CommunitiesView";
import CommunityProfileView from "../views/CommunityProfilView";
import WallView from "../views/WallView.vue";
import CommunitySettings from "../views/CommunitySettingsView";

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
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
    component: ProfileView,
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
    component: CommunitiesView,
  },
  {
    path: "/communities/profil/:id",
    name: "communities-Target",
    component: CommunityProfileView,
    props: true,
  },
  {
    path: "/communities/profil/:id/settings",
    name: "Community-Settings",
    component: CommunitySettings,
    props: true,
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
