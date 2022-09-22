<template>
  <section>
    <!-- If there are posts -->
    <h2 v-if="posts.length != 0">Dernière Publication</h2>
    <!-- If there are no communities-->
    <h2 v-else>
      Il n'y a pas de post pour le moment.
      <router-link to="/communities"
        >Commence par crée une communauté</router-link
      >
    </h2>
    <PostCard
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      :creatorInfo="creatorInfo"
    />
  </section>
</template>
<script>
import PostCard from "./PostCard.vue";
import axiosInstance from "../../services/api";

export default {
  name: "Posts-Wall",
  components: {
    PostCard,
  },
  data() {
    return {
      // add posts array:
      posts: [],
      creatorInfo: {},
      apiError: "",
      search: "",
    };
  },
  mounted() {
    axiosInstance
      .get("/posts/readAll")
      .then((response) => {
        // console.log(response);
        this.posts = response.data.result;
        console.log("Posts", this.posts);
        const publications = this.posts;
        publications.forEach((el) => {

          const entries = el.users;
          console.log("lkojo", entries.username)
          this.creatorInfo = entries;
          console.log("creatorInfo wall", this.creatorInfo)    
        });
        // var obj = this.posts;
        // for (var [i, post] of Object.entries(obj)) {
        //   console.log(i, ":", post.users);
        //   // let users = post.users;
        //   // console.log("laaa", users.username);
        //   this.creatorInfo = post.users
        //   console.log("laaa", this.creatorInfo)
        // }
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