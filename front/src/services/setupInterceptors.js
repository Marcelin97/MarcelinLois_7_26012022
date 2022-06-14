import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/auth/login" && err.response) {
        // 403: Forbidden access
        if (err.response && err.response.status === 403) {
          TokenService.removeUser();
          // return Promise.resolve(false)
          return Promise.reject(err.response);
        }
        // 401: accessToken is probably expired, or the user isn't connected
        if (err.response && err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const user = JSON.parse(localStorage.getItem('authToken')) || {}
          console.log("user :", user)

          if (user && user.refreshToken) {
            const rs = await axiosInstance.post('/auth/refreshtoken', {
              refreshToken: TokenService.getLocalRefreshToken(),
            }).catch((err) => {
              console.log(err);
              // We can't reconnect the user... just exit
              return Promise.resolve(false)
            })

            const { accessToken } = rs.data
            console.log("accessToken:" , accessToken)

            if (accessToken) {
              store.dispatch('auth/refreshToken', accessToken)
              return axiosInstance(originalConfig)
            }
          } else {
            localStorage.removeItem('authToken')
            return Promise.reject(err)
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;

