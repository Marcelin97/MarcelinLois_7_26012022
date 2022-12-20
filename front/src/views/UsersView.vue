<template>
  <!-- If there are users -->
  <section v-if="users.length != 0 || (users.length != '') & !isOwner">
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
    <h2>{{ this.loadingMessage }}</h2>
  </section>
</template>

<script>
import UsersList from "@/components/Profil/UsersList";

// User requests
import usersApi from "../api/users";

export default {
  name: "Users-View",
  components: {
    UsersList,
  },
  data() {
    return {
      users: [], // add users array
      apiErrors: "",
      search: "",
      loadingMessage: "Chargement en cours",
    };
  },
  computed: {
    // Search Bar
    filteredUsers() {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    // Search if it's current user
    isOwner() {
      return this.users.filter((user) =>
        user.id.includes(this.$store.state.user.id)
      );
    },
  },
  async mounted() {
    // I'm creating a query to retrieve all users informations.
    try {
      const response = await usersApi.getUsers();
      // I assign datas to the users array
      this.users = response;
      // If no users
      if (this.users.length < 1) {
        this.loadingMessage = "Il n y a pas encore d autres utilisateurs";
      }
    } catch (error) {
      if (error.response.status === 404) {
        this.apiErrors = "Utilisateurs introuvable !";

        // notification d'erreur
        this.$notify({
          type: "error",
          title: `Erreur de l'api`,
          text: `Erreur reporté : ${this.apiErrors}`,
        });
      }
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
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
}
</style>
