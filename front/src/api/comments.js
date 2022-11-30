import axiosInstance from "../services/api";

export default {
  /**
   * Add a post comment
   * @param postId
   * @param comment
   * @return {Promise<any>}
   */
  async addComment(postId, comment) {
    try {
      const response = await axiosInstance.post("/comments", {
        postId,
        content: comment,
      });
      return response.data;
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },

  /**
   * Get post comments
   * @param postId
   * @return {Promise<any>}
   */
  async getPostComments(postId) {
    try {
      const response = await axiosInstance.get(`/comments/readAll/${postId}`);
      // console.log(response.data.commentFind)
      return response.data.commentFind;
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },
  /**
   * Delete a comment
   * @param commentId
   * @return {Promise<AxiosResponse<any>>}
   */
  async deleteComment(commentId) {
    try {
      return await axiosInstance.delete(`/comments/delete/${commentId}`);
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },

  /**
   * Report a comment
   * @param commentId
   * @param content
   * @return {Promise<AxiosResponse<any>>}
   */
  async commentReport(commentId, content) {
    try {
      return await axiosInstance.post(
        `/comments/reports/${commentId}`,
        content
      );
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },
};
