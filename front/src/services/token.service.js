class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("vuex")) || {};
    return user?.refreshToken;
  }
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("vuex")) || {};
    return user?.accessToken;
  }
  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("vuex")) || {};
    user.accessToken = token;
    localStorage.setItem("vuex", JSON.stringify(user));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("vuex")) || {};
  }
  setUser(vuex) {
    console.log(JSON.stringify(vuex));
    localStorage.setItem("vuex", JSON.stringify(vuex));
  }
  removeUser() {
    localStorage.removeItem("vuex");
  }
}
export default new TokenService();
