<template>
  <div>
    <!-- Feeds -->
    <div class="container">
      <!-- Main -->
      <div class="container__main">
        <!-- Stories -->
        <StoriesWall />
        <!-- Input Box -->
        <InputBox v-if="communities.length != 0" @create-post="createPost" />
        <div v-else class="container-communities">
          <router-link
            class="underline"
            to="/communities"
            aria-label="Page des communautés"
          >
            Commence par crée une communauté 😎
          </router-link>
        </div>

        <!-- Posts -->
        <div v-if="posts.length != 0" class="post">
          <PostCard
            class="post__card"
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
            v-bind:index="index"
            v-bind:id="post.id"
            @delete-post="deletePost"
          />
        </div>
        <div v-else>
          <div class="container-communities">
            <h3>Il n'y a pas de post pour le moment.</h3>
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

import postsApi from "../../api/posts";
import communitiesApi from "../../api/community";

export default {
  name: "Feed-Wall",
  components: {
    PostCard,
    InputBox,
    StoriesWall,
  },
  data() {
    return {
      posts: [], // add posts array
      communities: [], // add communities array
      apiErrors: "",
    };
  },
  async mounted() {
    const getPosts = await postsApi.getPosts();
    this.posts = getPosts;
    const getCommunities = await communitiesApi.getCommunities();
    this.communities = getCommunities;
  },
  methods: {
    // createPost(data) {
    //   console.log("receive newPost", data);
    //   // this.posts = [data.datas, ...this.posts];
    //   this.posts.unshift(data.datas);
    //   console.log("update all posts", this.posts);
    // },
    async createPost() {
      try {
        const getPosts = await postsApi.getPosts();
        this.posts = getPosts;
      } catch (error) {
        this.$notify({
          type: "error",
          title: `Erreur lors du changement des posts`,
          text: `Erreur reporté : ${error}`,
          duration: 30000,
        });
      }
    },
    deletePost(postId) {
      this.posts = this.posts.filter((p) => p.id !== postId);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &__main {
    /* Take the remaining width */
    flex: 1;
  }
}

.container-communities {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1.2rem;
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
  top: 1.2rem;
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
