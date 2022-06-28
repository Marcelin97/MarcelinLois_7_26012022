import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state: {
    user: [],
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
  mutations: {
    // sets state with user information and toggles
    // isAuthenticated from false to true
    logUser: function (state, datas) {
      state.user = datas.user;
      state.isAuthenticated = true;
      state.accessToken = datas.accessToken;
      state.refreshToken = datas.refreshToken;
    },
    // delete all auth and user information from the state
    logout: function (state) {
      state.user = []
      state.refreshToken = "";
      state.accessToken = "";
      state.isAuthenticated = false;
    },

  },
  actions: {
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken);
    }
  },
});

export default store;
