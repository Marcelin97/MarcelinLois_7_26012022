<template>
  <article class="tile">
    <div class="tile-header">
      <img alt="Photo" />
      <h3>
        <span>{{ user.username }}</span>
        <span>identifiant: {{ user.id }}</span>
      </h3>
    </div>
    <router-link
      @click="viewTargetProfil"
      class="more"
      :to="`/explore/users/${this.id}`"
    >
      <span class="more__user">Voir le profil</span>
      <span>
        <font-awesome-icon
          class="more__icon"
          :icon="['fa', 'person-walking-arrow-right']"
        />
      </span>
    </router-link>
  </article>
</template>

<script>
import axiosInstance from "../../services/api";

export default {
  props: ["user"],
  data() {
    return {
      apiError: "",
      id: "",
      targetUser: [],
    };
  },
  mounted() {
    this.id = this.user.id;
    // console.log(this.id);
  },
  methods: {
    viewTargetProfil() {
      axiosInstance
        .get(`auth/readByName/${this.id}`, this.targetUser)
        .then((result) => {
          // console.log(result.data.data);
          this.targetUser = result.data.data;
          console.log("xx", this.targetUser);
          this.$store.commit("readTargetUser", result.data.data);
          this.$store.dispatch('readTargetUser', result.data.data);

        })
        .catch((error) => {
          console.log(error);
          const errorMessage = (this.apiError = error.response);
          this.errorMessage = errorMessage;
          console.log("apiError", error);

          // notification d'erreur
          this.$notify({
            duration: 2500,
            type: "error",
            title: `Erreur lors du chargement des données utilisateurs`,
            text: `Erreur reporté : ${errorMessage}`,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tile {
  padding: 1rem;
  border-radius: 8px;
  background-color: #e3ffa8;
  color: #000000;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:nth-child(2) {
    background-color: #45ffbc;
  }

  &:nth-child(3) {
    background-color: #bdbbb7;
  }

  &:nth-child(4) {
    background-color: #45c2f8;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: #000000;
  }
}

.tile-header {
  display: flex;
  align-items: center;

  img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    border: 0.1rem solid #2f3b49;
  }

  h3 {
    display: flex;
    flex-direction: column;
    line-height: 1.375;
    margin-left: 0.5rem;

    span:first-child {
      color: #000000;
      font-weight: 600;
    }

    span:last-child {
      color: #000000;
      font-size: 0.825em;
      font-weight: 200;
    }
  }
}

.more {
  color: #000000;

  &__user {
    color: #000000;
  }

  &__icon {
    background-color: #000000;
    opacity: 0.5;
    padding: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1rem;
    border-radius: 0.625rem;

    &:hover {
      opacity: 1;
    }
  }
}
</style>