import axiosInstance from "./api";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const { accessToken } = JSON.parse(localStorage.getItem('authToken')) || {}

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        },
        (error) => {
            return Promise.reject(error)
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
                    localStorage.removeItem('authToken')
                    return Promise.resolve(false)
                }
                // 401: accessToken is probably expired, or the user isn't connected
                if (err.response && err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true

                    const { refreshToken } = JSON.parse(localStorage.getItem('authToken')) || {}
                    // const user = JSON.parse(localStorage.getItem('authToken')) || {}

                    /* If the user is logged and his token is expired, try to reconnect it automatically with
                    * the refresh token */
                    if (refreshToken) {
                        const rs = await axiosInstance.post('/auth/refreshtoken', {
                            // refreshToken: refreshToken
                            refreshToken: JSON.parse(localStorage.getItem('authToken')).refreshToken
                        }).catch(() => {
                            // We can't reconnect the user... just exit
                            return Promise.resolve(false)
                        })

                        const { accessToken } = rs.data

                        if (accessToken) {
                           return store.dispatch('auth/refreshtoken', accessToken).then(async() => {
                               await store.dispatch("getUserInfos")
                                    .then(async () => {
                                        await Promise.resolve(axiosInstance(originalConfig))
                                        // return axiosInstance(originalConfig)

                                    }).catch((error) => { console.log(error) })
                            })
                                .catch((error) => { console.log(error) })
                        }
                    } else {
                        localStorage.removeItem('authToken')
                        return Promise.reject(err)
                    }
                }
            }
        }
  );
}
export default setup;