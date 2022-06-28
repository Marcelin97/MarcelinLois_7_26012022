<template>
  <HeaderNavigation />
  <section v-if="users.length">
    <h1>Explore des nouveaux profil !</h1>
    <input type="text" v-model="search" placeholder="Search..." />

    <!-- output component -->
    <div class="tiles">
      <UsersList v-for="(user, index) in filteredUsers" :key="index" :user="user" :items="filteredArticles"/>
    </div>
  </section>
</template>

<script>
import HeaderNavigation from "@/components/Menu/HeaderNavigation.vue";
import UsersList from "@/components/Profil/UsersList";
import axiosInstance from "../services/api";
import TokenService from "../services/token.service";

export default {
  name: "CommunityView",
  components: {
    UsersList,
    HeaderNavigation,
  },
  data() {
    return {
      // add users array:
      users: [],
      apiError: "",
      search: "",
    };
  },
  // Add computed section:
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.apiError = "";
    const token = TokenService.getLocalAccessToken();
    // console.log("token :" , token);
    axiosInstance
      .get("/auth/readAll", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log(response.data.data)
        this.users = response.data.data;
      })
      .catch((error) => {
        if (error.response.status == 404) {
          const errorMessage = (this.apiError = "Utilisateur introuvable !");
          this.errorMessage = errorMessage;
          // notification d'erreur
          this.$notify({
            type: "error",
            title: `Erreur lors de la connexion`,
            text: `Erreur reporté : ${errorMessage}`,
          });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  margin-top: 1.25rem;
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

h1 {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  line-height: 35px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1.2rem;
  margin-bottom: 5rem;
  margin-right: 1rem;
  text-align: center;
}
</style>
