import axiosInstance from "../services/api";

export default {
    /**
     * Export logged user's data in a csv format
     * @return {Promise<any>}
     */
    async exportMyData() {
        try {
            return await axiosInstance.get('/auth/export', { responseType: 'blob' })
        } catch (e) {
            throw e.response
        }
    },

    async deleteUser() {
        try {
            return await axiosInstance.delete("auth/delete")
        } catch (e) {
            throw e.response
        }
    },

    async userReport(userId) {
        try {
            return await axiosInstance.post(`/auth/report/${userId}`)
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
}