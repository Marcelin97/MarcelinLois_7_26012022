<template>
  <!-- link to profile page -->
  <router-link
    :to="`/explore/users/${this.id}`"
    aria-label="Explore ce profile d'utilisateur"
  >
    <article v-if="!isOwner" class="tile">
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
        <h2>
          {{ user.username }}
          <span>id: {{ user.id }}</span>
        </h2>
      </div>
      <div>
        <p>Publication(s) : {{ user.posts.length }}</p>
      </div>
      <div>
        <p>Commentaire(s) : {{ user.comments.length }}</p>
      </div>
    </article>
  </router-link>
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
  },
  computed: {
    isOwner() {
      return this.user.id === this.$store.state.user.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 200px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 0.4rem;
  margin-bottom: 2rem;
  transition: 0.25s ease;
  &:hover {
    transform: translateY(-5px);
  }
  @media only screen and (min-width: 576px) {
    min-height: 130px;
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

  h2 {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    font-weight: bolder;
    line-height: 1.375;
    margin-left: 0.5rem;

    span:first-child {
      font-weight: 700;
      font-size: 0.625em;
    }
  }
}
</style>
