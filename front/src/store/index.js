import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.accessToken}`;
  } catch (ex) {
    user = {
      userId: -1,
      accessToken: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: user,
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
      state.submitStatus = status;
    },
    logUser: function (state, user) {
      // instance.defaults.headers.common['Authorization'] = user.accessToken;
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            }
            localStorage.removeItem('user');
        }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/login", userInfos)
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch((error) => {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/signup", userInfos)
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
    getUserInfos: async({ commit }) => {
      await instance
        .get("/read")
        .then(function (response) {
          commit("userInfos", response.data);
          console.log(',' , response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export default store;
