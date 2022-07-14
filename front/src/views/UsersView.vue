<template>
  <HeaderNavigation />

  <section v-if="users.length">
    <h1>Explore des nouveaux profils !</h1>

    <!-- search bar -->
    <div class="search-bar">
      <input type="text" placeholder="Search" v-model="search" />
    </div>

    <!-- output component -->
    <div class="list_users">
      <UsersList
        v-for="(user, index) in filteredUsers"
        :key="index"
        :user="user"
        :items="filteredArticles"
      />
    </div>
  </section>

  <section v-else>
    <h2>Il n'y a pas encore d'utilisateurs.</h2>
  </section>
</template>

<script>
import HeaderNavigation from "@/components/Menu/HeaderNavigation.vue";
import UsersList from "@/components/Profil/UsersList";
import axiosInstance from "../services/api";

export default {
  name: "UsersView",
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
    axiosInstance
      .get("/auth/readAll")
      .then((response) => {
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

.search-bar {
  height: 34px;
  display: flex;
  width: 100%;

  input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgb(23, 23, 23);
    border-radius: 8px;
    padding: 0 40px 0 16px;
  }
}

.list_users {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  margin-top: 1.25rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
