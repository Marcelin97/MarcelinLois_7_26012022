// (Data service)

import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    getPublicContent() {
        return axios.get(process.env.VUE_APP_API_URL + 'readAll');
    }
    getUserBoard() {
        return axios.get(process.env.VUE_APP_API_URL + 'read', { headers: authHeader() });
    }
}
export default new UserService();