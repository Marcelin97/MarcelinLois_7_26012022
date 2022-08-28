import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({
  plugins: [
    createPersistedState(),
  ],
  state: {
    user: [],
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
  mutations: {
    logUser: function (state, datas) {
      state.user = datas.user;
      state.isAuthenticated = true;
      state.accessToken = datas.accessToken;
      state.refreshToken = datas.refreshToken;
    },
    updateUser: function (state, data) {
      state.user = data.user;
    },
    // delete all auth and user information from the state
    logout: function (state) {
      state.user = [];
      state.refreshToken = "";
      state.accessToken = "";
      state.isAuthenticated = false;
      // localStorage.clear();
    },
    refreshToken: function (state, accessToken) {
      state.accessToken = accessToken;
    },
  },
});

export default store;
