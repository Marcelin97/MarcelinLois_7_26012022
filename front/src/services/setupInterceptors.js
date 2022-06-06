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
              refreshToken: JSON.parse(localStorage.getItem('authToken')).refreshToken
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
          

          // const { refreshToken } =
          //   JSON.parse(localStorage.getItem("authToken")) || {};
          // // const user = JSON.parse(localStorage.getItem('authToken')) || {}
          // console.log("refreshToken :", refreshToken);
          // /* If the user is logged and his token is expired, try to reconnect it automatically with
          //  * the refresh token */
          // if (refreshToken) {
          //   try {
          //     const response = await axiosInstance
          //       .post("/refreshtoken", {
          //         // refreshToken: refreshToken,
          //         refreshToken: JSON.parse(localStorage.getItem("authToken")).refreshToken
          //       })
          //     console.log("response :" , response.data)
          //     const { accessToken } = response.data;
          //     console.log("accessToken :", accessToken);
          //     if (accessToken) {
          //       try {
          //           await store.dispatch("refreshtoken", refreshToken);
          //         // await store.dispatch("getUserInfos")
          //         //   await Promise.resolve(axiosInstance(originalConfig));
          //         return axiosInstance(originalConfig)
          //       } catch (error) {
          //         console.log(error)
          //       }
          //     }
          //   } catch (error) {
          //     // We can't reconnect the user... just exit
          //     return Promise.resolve(false);
          //   }
          // } else {
          //   localStorage.removeItem("authToken");
          //   return Promise.reject(err);
          // }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;

