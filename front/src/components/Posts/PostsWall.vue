<template>
  <section>
    <!-- If there are posts -->
    <h2 v-if="posts.length != 0">Dernière Publication</h2>
    <!-- If there are no communities-->
    <h2 v-else>Il n'y a pas de post pour le moment. <router-link to="/communities">Commence par crée une communauté</router-link></h2>
    <PostCard
      v-for="(post, index) in filteredPosts"
      :key="index"
      :post="post"
    />
  </section>
</template>
<script>
import PostCard from "./PostCard.vue";
import axiosInstance from "../../services/api";

export default {
  name: "Posts-View",
  components: {
    PostCard,
  },
  data() {
    return {
      // add posts array:
      posts: [],
      apiError: "",
      search: "",
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) =>
        post.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    axiosInstance
      .get("/posts/readAll")
      .then((response) => {
        // console.log(response);
        this.posts = response.data.result;
        console.log("Posts", this.posts);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          const errorMessage = (this.apiError =
            "Il n'y pas encore de post(s) !");
          this.errorMessage = errorMessage;

          // notification d'erreur
          this.$notify({
            type: "info",
            title: `Information de l'api`,
            text: `${errorMessage}`,
          });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.4rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  line-height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>