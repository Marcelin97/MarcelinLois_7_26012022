<template>
  <div class="container">
    <!-- LINK TO COMMUNITY PROFILE -->
    <router-link
      class="more"
      :to="`/communities/profil/${this.id}`"
      aria-label="Profil d'une communauté"
    >
      <div class="card">
        <!-- Picture community -->
        <img
          class="card__img"
          :src="`http://localhost:3000${community.icon}`"
          :alt="'Avatar de ' + community.title"
          aria-label="Photo de la communauté"
        />
        <!-- Community title -->
        <div class="title">{{ community.title }}</div>
        <!-- Community description -->
        <div class="about">
          {{ community.about }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Community-List",
  props: ["community"],
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.community.id;
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 4rem auto;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: #f3f3f3;
  width: 100%;
  box-shadow: 8px 8px 10px #e0e0e0, -2px -2px 15px #ffffff;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(-5rem);
  animation: appear-from-top 750ms ease forwards;
  animation-delay: 1s;
  &__img {
    margin: 0 auto;
    max-height: 300px;
    max-width: 100%;
    border-radius: 0.5rem;
    transform: translateY(-40px);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
      0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
  }
}
.title {
  color: #522cad;
  font-size: 1.075rem;
  margin-bottom: 0.5rem;
}

.about {
  color: #888888;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  word-break: break-all;
}

@keyframes appear-from-top {
  0% {
    opacity: 0;
    transform: translateY(-5rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
