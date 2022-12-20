<template>
  <div>
    <!-- Feeds -->
    <div class="container">
      <!-- Main -->

      <!-- Stories -->
      <StoriesWall />

      <div class="sidebar">
        <aside class="sidebar__sidebar">
          <!-- INPUT BOX - CREATE POST -->
          <InputBox v-if="communities.length != 0" @create-post="createPost" />
          <div v-else class="container-communities">
            <!-- LINK COMMUNITIES -->
            <router-link
              class="underline"
              to="/communities"
              aria-label="Page des communautés"
            >
              Commence par crée une communauté 😎
            </router-link>
          </div>
        </aside>

        <div class="sidebar__main">
          <!-- POSTS -->
          <div v-if="posts.length != 0" class="post">
            <PostCard
              class="post__card"
              v-for="(post, index) in posts"
              :key="index"
              :post="post"
              v-bind:index="index"
              v-bind:id="post.id"
              @delete-post="deletePost"
              @update-post="onUpdatePost"
            />
          </div>
          <!-- IF ANY POSTS -->
          <div v-else>
            <div class="container-communities">
              <h2>{{ this.loadingPost }}</h2>
            </div>
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

// Post requests
import postsApi from "../../api/posts";
// Communities requests
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
  async created() {
    // I get all the posts
    const posts = await postsApi.getPosts();
    this.posts = posts;
    if (this.posts.length < 1) {
      this.loadingPost = "Il n y a pas encore de publications à afficher";
    }
    // I collect all the communities to assign them to a publication
    const getCommunities = await communitiesApi.getCommunities();
    this.communities = getCommunities;
  },
  methods: {
    // EVENT : create post
    createPost(data) {
      this.posts = [data, ...this.posts];
    },
    // EVENT : update publication
    onUpdatePost(data, postId) {
      this.posts = this.posts.map((post) => {
        if (post.id === postId) {
          post = data;
        }
        return post;
      });
    },
    // EVENT : delete post
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
}

.sidebar {
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 576px) {
    flex-direction: row;
  }
}

.sidebar__sidebar {
  width: 100%;

  @media only screen and (min-width: 576px) {
    width: 35%;
  }
}

.sidebar__main {
  display: flex;
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;
}

.container-communities {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1.2rem;
}

.post {
  display: flex;
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
