import axiosInstance from "../services/api";

export default {
    /**
* Read all posts
 * @param posts
// @return {Promise<AxiosResponse<any>>}
*
    // async readAllPosts(posts) {
    //     try {
    //     await axiosInstance.get("/posts/readAll", posts)

    //     } catch (e) {
    //         console.error(e.response)
    //         throw e.response
    //     }
    // },
    /**
  * Delete a post
  * @param postId
  * @return {Promise<AxiosResponse<any>>}
  */
    async deletePost(postId) {
        try {
            return await axiosInstance.delete(`/posts/${postId}/delete`)
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
    /**
 * Report a post
 * @param postId
 * @param content
 * @return {Promise<void>}
 */
    async reportPost(postId, content) {
        try {
            return await axiosInstance.post(`/posts/${postId}/reports`, content );
        } catch (e) {
            console.error(e.response)
            throw e.response
        }
    },
};