import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie"; // Storing Vuex State as Cookies

// Create a new store instance.
const store = createStore({
  plugins: [
    createPersistedState(),
    //   {
    //   storage: {
    //     getItem: (key) => Cookies.get(key), // We passed in an object so that we can get the data by its key with getItem .
    //     setItem: (key, value) => // setItem sets the data with the given key.
    //       Cookies.set(key, value, { expires: 3, secure: true }), // expires is the expiry time in days. secure makes sure the cookie is only set over HTTPS.
    //     removeItem: (key) => Cookies.remove(key), // removeItem removes an item by its key.
    //   },
    // }
  ],
  state: {
    // status: "",
    user: [],
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
  mutations: {
    // setStatus: function (state, status) {
    //   state.status = status;
    // },
    // sets state with user information and toggles
    // isAuthenticated from false to true
    signupUser: function (state, data) {
      state.user = data;
      state.isAuthenticated = true;
    },
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
      localStorage.clear();
    },
    refreshToken: function (state, accessToken) {
      state.user = { ...state.user, accessToken: accessToken };
    },
  },
  actions: {
    refreshToken({ commit }, accessToken) {
      commit("refreshToken", accessToken);
      console.info(
        "Access token updated, you can ignore the previous 401 error"
      );
    },
  },
});

export default store;
