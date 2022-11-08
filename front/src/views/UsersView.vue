<template>
  <!-- If there are users -->
  <section v-if="users.length != 0 || users.length != '' & !isOwner">
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
      />
    </div>
  </section>

  <!-- If there are no users -->
  <section v-else>
    <h2>Il n'y a pas d'autres utilisateurs pour le moment.</h2>
  </section>
</template>

<script>
import UsersList from "@/components/Profil/UsersList";
import axiosInstance from "../services/api";

export default {
  name: "Users-View",
  components: {
    UsersList,
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
    isOwner() {
      return this.users.filter((user) =>
        user.id.includes(this.$store.state.user.id)
      );
    },
  },
  mounted() {
    axiosInstance
      .get("/auth/readAll")
      .then((response) => {
        this.users = response.data.data;
      })
      .catch((error) => {
        if (error.response.status == 404) {
          const errorMessage = (this.apiError = "Utilisateurs introuvable !");
          this.errorMessage = errorMessage;

          // notification d'erreur
          this.$notify({
            type: "error",
            title: `Erreur de l'api`,
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
    height: 2rem;
    border: none;
    outline: none;
    background: #4e5166;
    border-radius: 8px;
    padding: 0 40px 0 16px;
    color: #e2dedb;
  }
}

input::placeholder {
  color: #ffff;
  opacity: 0.7;
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
