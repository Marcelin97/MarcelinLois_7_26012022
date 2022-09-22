<template>
  <section>
    <!-- If there are posts -->
    <h2 v-if="posts != 0">Mes Publication</h2>
    <!-- If there are no communities-->
    <h2 v-else>
      Tu n'as pas de post pour le moment.
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

export default {
  name: "Posts-Profile",
  components: {
    PostCard,
  },
  data() {
    return {
      apiError: "",
      search: "",
      posts: [],
      creatorInfo: [],
    };
  },
  mounted() {
    this.posts = this.$store.state.user.posts;
    console.log("blabla", this.$store.state.user.posts);
      this.creatorInfo = this.$store.state.user;
    console.log("PostsProfile currentUser", this.creatorInfo)
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