<template>
  <div v-if="user.length != 0">
    <section>
      <h1>Mon compte</h1>

      <!-- output component -->
      <UserProfile
        :user="user"
        :userId="user.id"
        :userLoggedIn="true"
        @update-user="onUpdateAccount"
      />
    </section>

    <!-- If there are posts -->
    <section>
      <div v-if="posts.length != 0">
        <!-- output component -->
        <PostCard
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          v-bind:id="post.id"
          @delete-post="deletePost"
          @update-post="onUpdatePost"
        />
      </div>
      <div v-else>
        <h3>{{ this.loadingMessage }}</h3>
        <router-link
          class="link"
          to="/communities"
          aria-label="Aller sur la page de communautés"
          >Commence par crée une communauté</router-link
        >
      </div>
    </section>
  </div>
  <div v-else>
    <h2>Chargement en cours...</h2>
  </div>
</template>

<script>
import UserProfile from "@/components/Profil/UserProfile.vue";
import PostCard from "../components/Posts/PostCard.vue";

// Post requests
import postsApi from "../api/posts";

export default {
  name: "Profile-View",
  components: {
    UserProfile,
    PostCard,
  },
  data() {
    return {
      posts: [], // add posts array
      user: [], // current user
      loadingMessage: "Chargement en cours",
    };
  },
  mounted() {
    // Current user
    this.user = this.$store.state.user;
  },
  async created() {
    // I'm looking for posts about my account
    const posts = await postsApi.getPostsByUser(this.$store.state.user.id);
    this.posts = posts;
    if (this.posts.length < 1) {
      this.loadingMessage = "Il n y a pas encore de publications à afficher";
    }
  },
  methods: {
    // EVENT : update my account
    onUpdateAccount(data) {
      this.user = data.user;
    },
    // EVENT : update publication
    onUpdatePost(data, postId) {
      // console.log("DEBUG POST", data);
      this.posts = this.posts.map((post) => {
        if (post.id === postId) {
          // console.log("DEBUG DATA PROFILE", data)
          post = data;
          // console.log('DEBUG POST PROFILE', post)
        }
        return post;
      });
      // console.log("READ POSTS AFTER UPDATE", this.posts)
    },
    // EVENT : delete post
    deletePost(postId) {
      this.posts = this.posts.filter((p) => p.id !== postId);
    },
  },
};
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
.link {
  display: flex;
  justify-content: center;
  margin-top: 35px;
  line-height: 35px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
