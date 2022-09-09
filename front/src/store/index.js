import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({
  plugins: [createPersistedState()],
  namespaced: true,
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
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated === true && state.user !== null;
    },
    isSuperAdmin(state) {
      return state.isAuthenticated === true && state.user.isAdmin === true;
    },
    // Return current user data in state
    user(state) {
      return state.user !== null ? state.user : false;
    },
    // Check if current user is moderator of a specific community
    isModerator: (state, getters) => (communityId) => {
      if (getters.isAuthenticated) {
        const moderators = getters.user.moderators;
        for (let moderator of moderators) {
          console.log(
            "Embarquement du passager " +
              moderator.community_moderator.userId +
              " qui modère la communauté " +
              moderator.community_moderator.communityId
          );
          if (
            moderator.community_moderator.userId === getters.user.id &&
            moderator.community_moderator.communityId === parseInt(communityId)
          )
            return true;
        }
      }
      return false;
    },
    // Check if current user is following a specific community
    isFollowingCommunity: (state, getters) => (communityId) => {
      if (getters.isAuthenticated) {
        const followers = getters.user.follow;
        for (let follower of followers) {
          console.log(
            "Embarquement du passager " +
              follower.follower.userId +
              " qui modère la communauté " +
              follower.follower.communityId
          );
          if (
            follower.follower.userId === getters.user.id &&
            follower.follower.communityId === parseInt(communityId)
          )
            return true;
        }
      }

      return false;
    },
    isAdmin: (state, getters) => () => {
      if (getters.isSuperAdmin) {
        return true;
      }
      return false;
    },
  },
});

export default store;
