import store from "../store/index";

class TokenService {
  getLocalRefreshToken() {
    const user = store.state.refreshToken;
    // console.log("store.state.refreshToken", user);
    return user;
  }
  getLocalAccessToken() {
    const user = store.state.accessToken;
    // console.log("store.state.accessToken", user);
    return user;
  }
  updateLocalAccessToken(token) {
    store.commit("refreshToken", token); 
  }
  getUser() {
    const user = store.state.user;
    return user;
  }
}
export default new TokenService();
