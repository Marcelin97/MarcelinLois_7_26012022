<template>
  <div v-if="user.length != 0">
    <section>
      <h1>Mon compte</h1>
      <UserProfile :user="user" :userId="user.id" :userLoggedIn="true" />
    </section>

    <!-- If there are posts -->
    <section>
      <div v-if="posts.length != 0">
        <PostCard
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          v-bind:id="post.id"
        />
      </div>
      <div v-else>
        <h3>Tu n'as pas de post pour le moment</h3>
        <router-link class="link" to="/communities"
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
    };
  },
  mounted() {
    const user = this.$store.state.user;
    this.user = this.$store.state.user; // current user
    this.posts = this.$store.state.user.posts.map((post) => {
      post.user = user;
      return post;
    });
    console.log("mon compte", this.posts);
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
  @media only screen and (min-width: 768px) {
    margin-top: 0px;
  }
}
</style>