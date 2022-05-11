// (Authentication service)
import axios from 'axios';

class AuthService {
    login(user) {
        return axios
            .post(process.env.VUE_APP_API_URL + 'login', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(process.env.VUE_APP_API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}
export default new AuthService();