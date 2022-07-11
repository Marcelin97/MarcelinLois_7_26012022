import axiosInstance from "../services/api";

export default {
    /**
     * Export logged user's data in a csv format
     * @return {Promise<any>}
     */
    async createCommunity(data) {
        try {
            const response = await axiosInstance.post('/community', {
                title: data.title,
                about: data.about,
                icon: data.file
            })

            return response.data
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },

};