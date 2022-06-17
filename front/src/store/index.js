import { createStore } from "vuex";
import axiosInstance from "../services/api";

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    accessToken: "",
    refreshToken: "",
  };
} else {
  try {
    user = JSON.parse(user);
  } catch (e) {
    user = {
      userId: -1,
      accessToken: "",
      refreshToken: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: "",
    user: user,
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    // sets state with user information and toggles
    // isAuthenticated from false to true
    logUser: function (state, user) {
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        })
      );
    },
    // delete all auth and user information from the state
    logout: function (state) {
      state.user = {
        userId: -1,
        accessToken: "",
        refreshToken: "",
      };
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      state.refreshToken = "";
      state.accessToken = "";
      state.isAuthenticated = false;
    },
    refreshToken: function (state, refreshToken) {
      state.refreshToken = refreshToken;
      state.user = { ...state.user, refreshToken: refreshToken };
    },
    accessToken: function (state, accessToken) {
      state.accessToken = accessToken;
      state.user = { ...state.user, accessToken: accessToken };
    },
  },
  actions: {
    getUserInfos: ({ commit }) => {
      axiosInstance
        .get("/auth/read")
        .then((response) => {
          commit("setStatus", "");
          commit("logUser", response.data);
          // commit("refreshToken", response.data.accessToken);
          console.log(",", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export default store;
