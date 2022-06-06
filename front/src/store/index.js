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
  } catch (ex) {
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
    isAuthenticated: false
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
      state.submitStatus = status;
    },
    // sets state with user information and toggles
    // isAuthenticated from false to true
    logUser: function (state, user) {
      state.user = user;
      state.isAuthenticated = true;
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
    }
  },
  actions: {
    refreshToken ({ commit }, accessToken){
      const user = JSON.parse(localStorage.getItem('authToken'))
      user.accessToken = accessToken
      localStorage.setItem("authToken", JSON.stringify(user));
      commit('refreshToken', accessToken);
      console.info('Access token updated, you can ignore the previous 401 error')
    },
    login: ({ commit, dispatch }, user) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        axiosInstance
          .post("/auth/login", user)
          .then(async (response) => {
            console.log('login :', response)
            localStorage.setItem("authToken", JSON.stringify({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
            // localStorage.setItem("user", JSON.stringify(response.data))
            commit("refreshToken", response.data.refreshToken);
            commit("accessToken", response.data.accessToken);
            await dispatch("getUserInfos")
            resolve(response);
          })
          .catch((error) => {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, user) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        axiosInstance
          .post("/signup", user)
          .then((response) => {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch((error) => {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      axiosInstance
        .get("/auth/read")
        .then((response) => {
          commit('setStatus', '');
          commit("logUser", response.data );
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