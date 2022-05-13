import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
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
    instance.defaults.headers.common["Authorization"] = user.accessToken;
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
    status: '',
        user: {
            userId: -1,
            accessToken: "",
        },
    userInfos: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      birthday: '',
      imageUrl: '',
      isAdmin: '',
    },
  },
  mutations: {
      setStatus: function (state, status) {
          state.status = status;
          state.submitStatus = status;
      },
      logUser: function (state, user) {
        instance.defaults.headers.common['Authorization'] = user.accessToken;
        console.log(user.accessToken);
        //   localStorage.setItem('user', JSON.stringify(user));
          state.user = user;
      },
      userInfos: function (state, userInfos) {
          state.userInfos = userInfos;
      },
  //     logout: function (state) {
  //         state.user = {
  //             userId: -1,
  //             token: '',
  //         }
  //         localStorage.removeItem('user');
  //     }
  },
  actions: {
      login: ({ commit }, userInfos) => {
          commit('setStatus', 'loading');
          return new Promise((resolve, reject) => {
              instance
                  .post("/login", userInfos)
                  .then((response) => {
                      commit('setStatus', '');
                      commit('logUser', response.data);
                      resolve(response)
                      //   console.log(response);
                      // setTimeout(
                      //   function () {
                      //     this.$router.push("/login");
                      //   }.bind(this),
                      //   10000,
                      //   this
                      // );
                  })
                  .catch((error) => {
                      commit('setStatus', 'error_login');
                      reject(error)
                      //   console.log(error);
                  });
          })
    },
      createAccount: ({ commit }, userInfos) => {
          commit('setStatus', 'loading');
          return new Promise((resolve, reject) => {
              commit;
              instance
                  .post("/signup", userInfos)
                  .then((response) => {
                      commit('setStatus', 'created');
                      resolve(response)
                    //   console.log(response);
                      // setTimeout(
                      //   function () {
                      //     this.$router.push("/login");
                      //   }.bind(this),
                      //   10000,
                      //   this
                      // );
                  })
                  .catch((error) => {
                      commit('setStatus', 'error_create');
                      reject(error)
                    //   console.log(error);
                  });
          })
      
    },
    getUserInfos: ({ commit }) => {
        instance.get('/read')
            .then(function (response) {
                commit('userInfos', response.data.infos);
            })
            .catch(function () {
            });
    }
  },
});

export default store;
