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
        <div v-if="posts.length != 0" class="post">
          <PostCard
            class="post__card"
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
            v-bind:index="index"
            v-bind:id="post.id"
            @deletePostClick="deletePostClick"
          />
        </div>
        <div v-else>
          <div class="container-communities">
            <h3>Il n'y a pas de post pour le moment</h3>
            <router-link class="menu-link underline" to="/communities"
              >Commence par crée une communauté
            </router-link>
          </div>
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
import postsApi from "../../api/posts";

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
      apiErrors: "",
    };
  },
  mounted() {
    axiosInstance
      .get("/posts/readAll")
      .then((response) => {
        this.posts = response.data.result;
        // console.log("wall posts", this.posts);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          const errorMessage = (this.apiErrors =
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
  methods: {
    async deletePostClick(index, id) {
      try {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) return;
        await postsApi.deletePost(`${id}`);

        // force refresh page
        this.$router.go(0);
      } catch (error) {
        console.error(error.data.error);

        const errorMessage = (this.apiErrors = error.data.error);
        this.errorMessage = errorMessage;

        // notification error message
        this.$notify({
          type: "error",
          title: `Accès refusé:`,
          text: `${errorMessage}`,
          duration: 3000,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  &__sidebar {
    top: 0;
  }
  &__main {
    /* Take the remaining width */
    flex: 1;
  }
}

.container-communities {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.post {
    margin: auto;
    width: 350px;
    display: flex;
    flex-direction: column;
}

.underline {
  position: relative;
}

.underline::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #ffd7d7;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) and (pointer: fine) {
  .underline:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>