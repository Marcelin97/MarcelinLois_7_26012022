<template>
    <article class="tile">
      <div class="tile-header">
        <img class="user-card__avatar" alt="Image utilisateur" />
        <h3>
          <span>{{ user.username }}</span>
          <span>identifiant: {{ user.id }}</span>
        </h3>
      </div>
      <router-link to="/TargetUser">
        <span>Voir le profil</span>
        <span class="icon-button">
          <font-awesome-icon :icon="['fa', 'person-walking-arrow-right']" />
        </span>
      </router-link>
    </article>
</template>

<script>
export default {
  props: ["user"],
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
    background-color: #45C2F8;
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
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 0.5rem solid #2f3b49;
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
</style>