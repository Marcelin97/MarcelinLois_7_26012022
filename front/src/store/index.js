import { createStore } from "vuex";
import axiosInstance from "../services/api";

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
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
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
        // delete all auth and user information from the state
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
      state.refreshToken = "";
      state.accessToken = "";
      state.isAuthenticated = false;
    },
  },
  actions: {
    login: ({ commit }, user) => {

      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        axiosInstance
          .post("/login", user)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data)
            commit("logUser", response.data);
            // console.log(response.data);
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
        axiosInstance
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
    getUserInfos: async ({ commit }) => {
      await axiosInstance
        .get("/read")
        .then(function (response) {
          commit("user", response.data);
          // console.log(",", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export default store;
