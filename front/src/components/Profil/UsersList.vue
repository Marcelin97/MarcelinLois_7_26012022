<template>
  <article class="tile">
    <div class="tile-header">
      <img
        :src="`http://localhost:3000${user.imageUrl}`"
        :alt="'Avatar de ' + user.username"
        aria-label="Photo d'utilisateur"
        v-if="user.imageUrl"
      />
      <img
        v-else
        src="../../assets/img/avataaars.png"
        alt="Avatar par défaut"
        aria-label="Avatar par défaut"
      />
      <h3>
        <span>{{ user.username }}</span>
        <span>id: {{ user.id }}</span>
      </h3>
    </div>

    <!-- link to profile page -->
    <router-link class="more" :to="`/explore/users/${this.id}`">
      <span class="more__user">Voir le profile</span>
      <span>
        <font-awesome-icon
          class="more__icon"
          :icon="['fas', 'person-walking-arrow-right']"
        />
      </span>
    </router-link>
  </article>
</template>

<script>
export default {
  name: "Users-List",
  props: ["user"],
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.user.id;
    // console.log(this.id);
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
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    border: 0.1rem solid #2f3b49;
    object-fit: cover;
    object-position: 50% 40%;
  }

  h3 {
    display: flex;
    flex-direction: column;
    line-height: 1.375;
    margin-left: 0.5rem;

    span:first-child {
      color: #000000;
      font-weight: 700;
    }

    span:last-child {
      color: #000000;
      font-size: 0.625em;
      font-weight: 700;
    }
  }
}

.more {
  color: #000000;

  &__user {
    color: #000000;
  }

  &__icon {
    opacity: 0.5;
    padding: 0.2rem;

    &:hover {
      opacity: 1;
    }
  }
}
</style>