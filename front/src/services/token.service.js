import store from "../store/index";

class TokenService {
  getLocalRefreshToken() {
    const user = store.state.refreshToken;
    return user;
  }
  getLocalAccessToken() {
    const user = store.state.accessToken;
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
