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
        <div class="container-communities">
        <h3>Il n'y a pas de post pour le moment</h3>
        <router-link class="menu-link underline" to="/communities"
          >Commence par crée une communauté
          </router-link
        >
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
        // console.log(error);
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
}
.container__sidebar {
    top: 0;
}
.container__main {
  /* Take the remaining width */
  flex: 1;
}

.container-communities{
  display: flex;
 align-items: center;
  flex-direction: column;
}
.menu-link::after {
  position: absolute;
  top: 0;
  right: 100%;
  font-size: 0.75rem;
  letter-spacing: 0.056rem;
  padding: 0 0.25rem 0 0;
}

.menu-item {
  margin: 1rem;
  @for $i from 0 through 5 {
    &:nth-child(#{1 + $i}) {
      .menu-link::after {
        content: "0#{1 + $i}";
      }
    }
  }
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