import axiosInstance from "../services/api";

export default {
    /**
       * Add a post comment
       * @param postId
       * @param comment
    * @param userId
       * @return {Promise<any>}
       */
    async addComment(postId, comment, userId) {
        try {
            const response = await axiosInstance.post('/', { postId, userId, content: comment })
            return response.data
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },

    /**
     * Get post comments
     * @param postId
     * @return {Promise<any>}
     */
    async getPostComments(postId) {
        try {
            const response = await axiosInstance.get(`/comments/readAll/${postId}`)
            console.log(response.data.commentFind)
            return response.data.commentFind
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
    /**
   * Delete a comment
   * @param commentId
   * @return {Promise<AxiosResponse<any>>}
   */
    async deleteComment(commentId) {
        try {
            return await axiosInstance.delete(`/comments/${commentId}`)
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },

    /**
     * Get reported comments
     * @returns {Promise<any>}
     */
    async getReportedComments() {
        try {
            const response = await axiosInstance.get('/comments/reports')
            return response.data
        } catch (e) {
            throw e.response
        }
    },

    /**
     * Report a comment
     * @param commentId
     * @return {Promise<AxiosResponse<any>>}
     */
    async commentReport(commentId) {
        try {
            return await axiosInstance.post(`/comments/${commentId}/reports`)
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
}