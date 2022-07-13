<template>
  <section>
    <div class="container">
      <div
        class="community-card"
        :key="index"
        v-for="(community, index) in communities"
      >
        <h5 class="community-card__title">
          {{ community.title }}
        </h5>
        <div
          class="community-card__img"
          v-bind:style="{
            backgroundImage: `url(http://localhost:3000${community.icon})`,
          }"
        ></div>
        <p class="community-card__desc">{{ community.about }}</p>
        <div class="community-details">
          <!-- <div>
					Dernière Mise à jour
					<span>{{community.updatedAt}}</span>
				</div> -->
          <div>
            Identifiant
            <span>{{ community.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axiosInstance from "../../services/api";

export default {
  name: "CommunityList",
  setup() {},
  data() {
    return {
      title: "Voici la liste de toutes les communautés",
      bottom: false,
      communities: [],
      selectedMeal: null,
    };
  },
  mounted() {
    axiosInstance
      .get("/community/readAllCommunities")
      .then((response) => (this.communities = response.data.datas))
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  border-left: solid whitesmoke 1px;
  border-right: solid whitesmoke 1px;
  padding: 40px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.community-card {
  margin-bottom: 50px;
  width: 100%;
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
    margin-bottom: 3rem;
  }
  &__img {
    background-position: center;
    background-size: cover;
    min-width: 60px;
    width: 100%;
    height: 60px;
    border-radius: 0.8rem;
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
  }
}

.community-details {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  div {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    font-size: 14px;
  }
}

.community-details div span {
  font-size: 20px;
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