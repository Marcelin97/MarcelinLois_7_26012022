import axiosInstance from "../services/api";

export default {
  /**
   * Export logged user's data in a csv format
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
