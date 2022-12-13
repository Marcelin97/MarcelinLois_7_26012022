<template>
  <div v-if="user.length != 0">
    <section>
      <h1>Profil de {{ this.user.username }}</h1>

      <!-- output component -->
      <UserProfile :user="user" :userLoggedIn="false" />

      <!-- gestion erreur API avec axios -->
      <div v-if="apiErrors != 0" class="error-api">
        <p v-for="(apiError, i) in apiErrors" :key="i" class="error-msg">
          {{ apiError.message }}
        </p>
      </div>
      <!-- gestion erreur API avec axios -->
    </section>

    <!-- If there are posts -->
    <section v-if="posts.length != 0">
      <!-- output component -->
      <PostCard
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        v-bind:id="post.id"
        :creatorInfo="creatorInfo"
        @update-post="onUpdatePost"
      />
    </section>
  </div>
  <div v-else>
    <h2>{{ this.loadingMessage }}</h2>
  </div>
</template>

<script>
import UserProfile from "@/components/Profil/UserProfile.vue";
import PostCard from "../components/Posts/PostCard.vue";

// User requests
import usersApi from "../api/users";
// Post requests
import postsApi from "../api/posts";

export default {
  name: "User-View",
  components: {
    UserProfile,
    PostCard,
  },
  data() {
    return {
      creatorInfo: [], // add creatorInfo
      posts: [], // add posts array
      user: [], // target user info
      userId: "",
      apiErrors: "",
      loadingMessage: 'Chargement en cours'
    };
  },
  async created() {
    // I get my route parameter
    this.userId = this.$route.params.id;

    // I'm creating a query to retrieve post by target user.
    const posts = await postsApi.getPostsByUser(this.userId)
    this.posts = posts;
    // console.log("user target => posts", this.posts);
    if (this.posts.length < 1) {
      this.loadingMessage = 'Il n y a pas encore de publications à afficher'
    }
  },
  async mounted() {
    // I'm creating a query to retrieve target user information.
    try {
      const response = await usersApi.readTargetUser(this.userId);
      // I assign data to the user array
      this.user = response.data.data;
    } catch (error) {
      this.apiErrors = error.response;

      // Error notification
      this.$notify({
        type: "error",
        title: `Erreur lors du changement de l'utilisateur'`,
        text: `Erreur reporté : ${this.apiErrors}`,
        duration: 30000,
      });
    }

    // I assign target user info to CreatorInfo
    this.creatorInfo = this.user;
  },
};
</script>

<style lang="scss" scoped>
h1,
h2 {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  line-height: 35px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
