<template>
  <section v-if="user.length != 0">
    <HeaderNavigation />
    <h1>Mon compte</h1>
    <UserProfile :user="user" :userLoggedIn="true" />
  </section>
</template>

<script>
import UserProfile from "@/components/Profil/UserProfile.vue";
import HeaderNavigation from "@/components/Menu/HeaderNavigation.vue";

export default {
  name: "Profile-View",
  components: {
    UserProfile,
    HeaderNavigation,
  },
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    this.user = this.$store.state.user;
    // console.log(this.$store.state.user);
    // if user is not connected redirect to login page
    if (!this.user) {
      this.$router.push("/login");
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