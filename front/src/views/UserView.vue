<template>
  <div v-if="user.length != 0">
    <section>
      <h1>Profil de {{ this.user.username }}</h1>
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
      <PostCard
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        :creatorInfo="creatorInfo"
      />
    </section>
  </div>
  <div v-else>
    <h2>Chargement en cours...</h2>
  </div>
</template>

<script>
import UserProfile from "@/components/Profil/UserProfile.vue";
import usersApi from "../api/users";
import PostCard from "../components/Posts/PostCard.vue";

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
    };
  },
  async mounted() {
    this.userId = this.$route.params.id;

    try {
      const response = await usersApi.readTargetUser(this.userId);
      this.user = response.data.data;
    } catch (error) {
      const errorMessage = (this.apiErrors = error.response);
      this.errorMessage = errorMessage;

      // notification error message
      this.$notify({
        type: "error",
        title: `Erreur lors du changement de l'utilisateur'`,
        text: `Erreur reporté : ${errorMessage}`,
        duration: 30000,
      });
    }

    this.posts = this.user.posts;
    // console.log("Posts user pointé", this.posts);
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

