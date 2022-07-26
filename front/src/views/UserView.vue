<template>
  <HeaderNavigation />
  <section>
    <h1>Le profil de...{{this.user.username}}</h1>
    <UserProfile :user="user" :key="user.id" :userLoggedIn="userLoggedIn" />

    <!-- gestion erreur API avec axios -->
    <div v-if=apiErrors class="error-api">
      <p v-for="(apiError, i) in apiErrors" :key="i" class="error-msg">{{ apiError.message }}</p>
    </div>
    <!-- gestion erreur API avec axios -->

  </section>
</template>

<script>
import UserProfile from "@/components/Profil/UserProfile.vue";
import HeaderNavigation from "../components/Menu/HeaderNavigation.vue";
import usersApi from "../api/users";

export default {
  name: "User-View",
  components: {
    UserProfile,
    HeaderNavigation,
  },
  data() {
    return {
      user: [],
      userId: "",
      apiErrors: false,
      userLoggedIn: false,
    };
  },
  computed: {
    userTargetId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.userId = this.$route.params.id;

    try {
      const response = await usersApi.readTargetUser(this.userId);
      // console.log("utilisateur cible", response.data.data);
      this.user = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async beforeRouteUpdate(to) {
    this.userId = to.params.id;
    try {
      const response = await usersApi.readTargetUser(this.userId);
      this.user = response.data.data;
    } catch (error) {
      console.log(error);
      this.apiErrors= error.data
    }
  },
};
</script>

<style lang="scss" scoped>
h1 {
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

