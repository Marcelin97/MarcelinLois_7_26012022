class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("authToken"));
        return user?.refreshToken;
    }
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("authToken")) || {};
        return user?.accessToken;
    }
    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("authToken"));
        user.accessToken = token;
        localStorage.setItem("authToken", JSON.stringify(user));
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    setUser(user) {
        console.log(JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
    }
    removeUser() {
        localStorage.removeItem("authToken");
    }
}
export default new TokenService();