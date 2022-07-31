<template>
  <section v-if="user.length != 0">
    <h1>Mon compte</h1>
    <UserProfile :user="user" :userLoggedIn="true" />
  </section>
</template>

<script>
import UserProfile from "@/components/Profil/UserProfile.vue";

export default {
  name: "Profile-View",
  components: {
    UserProfile,
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