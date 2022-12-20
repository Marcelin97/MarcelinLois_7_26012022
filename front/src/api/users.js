import axiosInstance from "../services/api";

export default {
  /**
  * Get all users
  * @return {Promise<any>}
  */
  async getUsers() {
    try {
      const response = await axiosInstance.get("/auth/readAll")
      return response.data.data
    } catch (e) {
      throw e.response
    }
  },
  /**
   * Export logged user's data
   * @return {Promise<any>}
   */
  async exportMyData() {
    try {
      return await axiosInstance.get("/auth/export", { responseType: "blob" });
    } catch (e) {
      throw e.response;
    }
  },
  /**
   * Delete user
   * @return {Promise<any>}
   */
  async deleteUser() {
    try {
      return await axiosInstance.delete("auth/delete");
    } catch (e) {
      throw e.response;
    }
  },
  /**
   * Delete a post
   * @param id
   * @return {Promise<any>}
   */
  async readTargetUser(id) {
    try {
      return await axiosInstance.get(`/auth/readByName/${id}`);
    } catch (e) {
      console.error(e.response);
      throw e.response;
    }
  },
};
