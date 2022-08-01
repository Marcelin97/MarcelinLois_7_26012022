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
                icon: data.icon
            })
            console.log(response)
            return response.data
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
    async readTargetCommunity(id) {
        try {
            return await axiosInstance.get(`/community/readOne/${id}`)
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
    async deleteCommunity(id) {
        try {
            return await axiosInstance.delete(`community/deleteCommunity/${id}`);
        } catch (e) {
            throw e.response;
        }
    },

};