import { createStore } from "vuex";
// import axiosInstance from "../services/api";

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
    getUserInfos: function (state, user) {
      state.user = user;
      localStorage.getItem(
        "authToken",
        JSON.stringify({
          accessToken: user.accessToken,
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
    refreshToken: function (state, accessToken) {
      state.isAuthenticated = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
    // accessToken: function (state, accessToken) {
    //   state.accessToken = accessToken;
    //   state.user = { ...state.user, accessToken: accessToken };
    // },
  },
  actions: {
    refreshToken({ commit }, accessToken) {
      commit("refreshToken", accessToken);
    },
  },
});

export default store;
