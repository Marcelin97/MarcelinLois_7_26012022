import store from "../store/index";

class TokenService {
  getLocalRefreshToken() {
    // const user = JSON.parse(localStorage.getItem("vuex")) || {};
    const user = store.state.refreshToken;
    console.log("store.state.refreshToken", user);
    return user;
  }
  getLocalAccessToken() {
    // const user = JSON.parse(localStorage.getItem("vuex")) || {};
    const user = store.state.accessToken;
    console.log("store.state.accessToken", user);
    return user;
  }
  updateLocalAccessToken(token) {
    store.commit("refreshToken", token); 
  }
  getUser() {
    // const user = JSON.parse(localStorage.getItem("vuex")) || {};
    const user = store.state.user;
    return user;
  }
  // setUser(vuex) {
  //   console.log(JSON.stringify(vuex));
  //   localStorage.setItem("vuex", JSON.stringify(vuex));
  // }
  // removeUser() {
  //   localStorage.removeItem("vuex");
  // }
}
export default new TokenService();
