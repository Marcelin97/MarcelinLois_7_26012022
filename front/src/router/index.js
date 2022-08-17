import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

import NotFound from "../views/NotFound.vue";
import HomeView from "../views/HomeView.vue";
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
    component: HomeView,
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

// ? Navigation Guards
// TODO Check if user is authenticated
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/NotFound",
    "/",
    "/account",
    "/home",
    "/login",
    "/signup",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.isAuthenticated;
  // console.log(loggedIn); // Il will show the user loggedIn
  // console.log(` navigation to ${to.name} from ${from.name} `); // I will log a message mentioning to which route we are navigating.

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
