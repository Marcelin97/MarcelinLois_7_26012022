<template>
  <div class="container">
    <div class="community-card">
      <h5 class="community-card__title">
        {{ community.title }}
      </h5>
      <div
        class="community-card__img box"
        v-bind:style="{
          backgroundImage: `url(http://localhost:3000${community.icon})`,
        }"
      ></div>
      <p class="community-card__desc">{{ community.about }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommunityList",
  setup() {},
  props: ["community"],
  data() {
    return {
      title: "Voici la liste de toutes les communautés",
      bottom: false,
      communities: [],
    };
  },
};
</script>

<style lang="scss" scoped>

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.community-card {
  margin-bottom: 50px;
  width: 60%;
  opacity: 0;
  transform: translateY(-5rem);
  animation: appear-from-top 750ms ease forwards;
  animation-delay: 1s;

  &__title {
    position: relative;
    font-size: 22px;
    font-weight: 400;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__img {
    background-position: center;
    background-size: cover;
    min-width: 60px;
    width: 50%;
    height: 60px;
    border-radius: 0.8rem;
    margin: 0 auto;

    @media only screen and (min-width: 230px) {
      height: 170px;
    }

    @media only screen and (min-width: 576px) {
      height: 230px;
    }
  }

  &__desc {
    margin-top: 15px;
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    word-break: break-word;
  }
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