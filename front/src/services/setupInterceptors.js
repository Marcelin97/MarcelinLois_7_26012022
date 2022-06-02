import axiosInstance from "./api";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const { accessToken } =
        JSON.parse(localStorage.getItem("authToken")) || {};

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
          localStorage.removeItem("authToken");
          // return Promise.resolve(false)
          return Promise.reject(err.response);
        }
        // 401: accessToken is probably expired, or the user isn't connected
        if (
          err.response &&
          err.response.status === 401 &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          const { refreshToken } =
            JSON.parse(localStorage.getItem("authToken")) || {};
          // const user = JSON.parse(localStorage.getItem('authToken')) || {}
          console.log("refreshToken", refreshToken);
          /* If the user is logged and his token is expired, try to reconnect it automatically with
           * the refresh token */
            if (refreshToken) {
              try {
                  const rs = await axiosInstance
                      .post("/refreshtoken", {
                          refreshToken: refreshToken,
                          // refreshToken: JSON.parse(localStorage.getItem("authToken")).refreshToken,
                      });
                  console.log(rs)
                  const { accessToken } = rs.data;
                  console.log("accessToken", accessToken);
                  if (accessToken) {
                      try {
                        //   await store.dispatch("refreshtoken", accessToken);
                          await store.dispatch("getUserInfos")
                        //   await Promise.resolve(axiosInstance(originalConfig));
                          return axiosInstance(originalConfig)
                      } catch (error) {
                          console.log(error)
                      }       
                  }
              } catch (error) {
                  // We can't reconnect the user... just exit
                  return Promise.resolve(false);
              }
          } else {
            localStorage.removeItem("authToken");
            return Promise.reject(err);
          }
        }
      }
    }
  );
};
export default setup;
