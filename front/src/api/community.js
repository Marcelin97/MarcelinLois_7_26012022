import axiosInstance from "../services/api";

export default {
  /**
   * Read one community
   * @param id
   * @return {Promise<any>}
   */
  async readTargetCommunity(id) {
    try {
      return await axiosInstance.get(`/community/readOne/${id}`);
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },
  /**
   * Delete community
   * @param id
   * @return {Promise<any>}
   */
  async deleteCommunity(id) {
    try {
      return await axiosInstance.delete(`/community/deleteCommunity/${id}`);
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },
  /**
   * Follow community
   * @param id
   * @return {Promise<any>}
   */
  async followCommunity(id) {
    try {
      return await axiosInstance.post(`community/${id}/follow`);
    } catch (e) {
      throw e.response;
    }
  },
  /**
   * Unfollow community
   * @param id
   * @return {Promise<any>}
   */
  async unfollowCommunity(id) {
    try {
      return await axiosInstance.post(`community/${id}/unfollow`);
    } catch (e) {
      throw e.response;
    }
  },
  /**
   * Add a moderator community
   * @param id
   * @return {Promise<any>}
   */
  async addModeratorCommunity(id) {
    try {
      return await axiosInstance.post(`community/${id}/moderator`);
    } catch (e) {
      throw e.response;
    }
  },
};
