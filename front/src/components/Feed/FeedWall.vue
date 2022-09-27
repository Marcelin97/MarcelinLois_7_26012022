<template>
  <div>
    <!-- Feeds -->
    <div class="container">
      <!-- SidebarNavigation -->
      <SidebarNavigation class="container__sidebar" />

      <!-- Main -->
      <div class="container__main">
        <!-- Stories -->
        <StoriesWall />
        <!-- Input Box -->
        <InputBox />
        <!-- Posts -->
        <div v-if="posts.length != 0">
        <PostCard
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
      </div>
      <div v-else>
        <h3>Il n'y a pas de post pour le moment</h3>
        <router-link class="link" to="/communities"
          >Commence par crée une communauté</router-link
        >
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from "../Posts/PostCard.vue";
import InputBox from "./InputBox.vue";
import StoriesWall from "./StoriesWall.vue";
import SidebarNavigation from "../Menu/SidebarNavigation.vue";
import axiosInstance from "../../services/api";

export default {
  name: "Feed-Wall",
  components: {
    PostCard,
    InputBox,
    StoriesWall,
    SidebarNavigation,
  },
    data() {
    return {
      posts: [], // add posts array
      apiError: "",
    };
  },
    mounted() {
    axiosInstance
      .get("/posts/readAll")
      .then((response) => {
        this.posts = response.data.result;
        console.log("wall posts", this.posts)
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          const errorMessage = (this.apiError =
            "Il n'y pas encore de post(s) !");
          this.errorMessage = errorMessage;

          // notification d'erreur
          this.$notify({
            type: "error",
            title: `Information de l'api`,
            text: `${errorMessage}`,
          });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @media only screen and (min-width: 576px) {
    flex-direction: inherit;
  }
}
.container__sidebar {
  width: 100%;
  @media only screen and (min-width: 576px) {
    width: 0%;
  }
}
.container__main {
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;
}
</style>