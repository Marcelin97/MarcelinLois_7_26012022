<template>
  <div>
    <InputBoxCommunityVue />
  </div>
  <div class="banner" :key="index" v-for="(community, index) in communities">
    <div class="banner__top">
      <div class="banner__container">
        <p class="banner__top-title">
          {{ community.title }} <strong>{{ community.id }}</strong>
        </p>
      </div>
    </div>

    <div
      class="banner__bottom"
      v-bind:style="{
        backgroundImage: `url(http://localhost:3000${community.icon})`,
      }"
    >
      <div class="banner__container">
        <div class="banner__card">
          <div class="banner__card-top">
            <p class="banner__card-title">à Propos : {{ community.about }}</p>
            <p class="banner__card-description">
              Crée par l'utilisateur : {{ community.userId }}
            </p>
            <p class="banner__card-description">
              Dernière mise à jour : {{ community.updatedAt }}
            </p>
          </div>

          <div href="#" class="banner__card-button">
            <button class="btn-follow" @click="showToast">
              <span class="background"></span>
              <!-- <span class="icon uil uil-instagram"></span> -->
              <font-awesome-icon class="icon" :icon="['fas', 'hashtag']" />
              <span class="content"> S'abonner </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBoxCommunityVue from "../Community/InputBoxCommunity.vue";
import axiosInstance from "../../services/api";

export default {
  name: "CommunityList",
  components: {
    InputBoxCommunityVue,
  },
  setup() {},
  data() {
    return {
      title: "Voici la liste de toutes les communautés",
      bottom: false,
      communities: [],
    };
  },
  mounted() {
    axiosInstance
      .get("/community/readAllCommunities")
      .then((response) => (this.communities = response.data.datas))
      .catch((error) => {
        console.log(error);
        // if (error.response) {
        //   console.error(error.response.data);
        //   console.error(error.response.status);
        //   console.error(error.response.headers);
        // } else if (error.request) {
        //   console.error(error.request);
        // } else {
        //   console.error("Error", error.message);
        // }
      });
  },
};
</script>

<style lang="scss" scoped>
// follow button
button {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  display: flex;
  align-items: center;
  width: 10rem;
  height: 4rem;
  padding-left: 3.4rem;
  border-radius: 0.8rem;
  border: none;
  background: #ffffff;
  cursor: pointer;
}

.background {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: -230px;
  transform: translate(-3.5rem, -50%);
  width: 300px;
  height: 300px;
  background: #8de8fe;
  transition: 0.3s all;
}

.icon {
  background: transparent;
  stroke: black;
  stroke-width: 8px;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  z-index: 2;
  transform: translate(0.75rem, -50%);
  font-size: 2rem;
  transition: 0.3s all;
}

.content {
  font-size: 1rem;
  background: transparent;
  color: black;
}

button:hover .background {
  border-radius: 50%;
  transform: translate(-2rem, -50%);
}

button:hover .icon {
  transform: translate(0, -50%);
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

.banner {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-bottom: 10rem;
    @media only screen and (min-width: 300px) {
margin-bottom: 5rem;
}

  &__container {
    margin: 0 auto;
    width: 85rem;
    max-width: 100%;
    position: relative;
  }

  &__top {
    // background: #242b35;
    color: #9ea4b9;
    margin-bottom: 4rem;
    &-title {
      position: sticky;
      padding: 0.5rem 0;
      padding-left: 3rem;
      font-size: 1.6rem;
      transition: 250ms ease all;
      &:after,
      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0.25rem;
        height: 2rem;
        width: 2rem;
        border-radius: 2.5rem;
        box-shadow: inset 0 0 0 0.25rem, inset 0 4.9rem 0 0.25rem;
      }
      &:before {
        bottom: -3.5rem;
        color: #08708a;
      }
      strong,
      &:before {
        opacity: 0;
        transform: translateY(-5rem);
        animation: appear-from-top 750ms ease forwards;
        animation-delay: 1s;
      }
      strong {
        position: absolute;
        top: 4.5rem;
        left: 3rem;
        white-space: nowrap;
        color: #8de8fe;
      }
    }
  }
  &__bottom {
    // background: url(https://cdn.discordapp.com/attachments/935835196538896386/936744841600172082/zyro-image.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 75%;
    box-sizing: border-box;
    min-height: 24rem;
    // padding-top: 5rem;
    transition: 250ms ease all;
    position: relative;
  }
  &__card {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.69rem;
    max-width: 16rem;
    // background: #08708a;
    // background: darkslategrey;
    // opacity: 0.8;
    margin-left: auto;
    border-radius: 0.5rem;
    position: relative;
    top: 260px;
        @media only screen and (min-width: 300px) {
              top: 200px;
        }
    &-top {
      background: #08708a;
      opacity: 0.8;
      padding: 1rem;
      border-radius: 0.8rem;
    }
    &-title {
      background: transparent;
      margin-bottom: 0.1em;
      max-width: 20rem;
      text-overflow: ellipsis;
      word-wrap: break-word;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 1.5rem;
      letter-spacing: 0.1rem;
    }
    &-description {
      background: transparent;
      max-width: 20rem;
      margin-bottom: 1rem;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    &-button {
      background: transparent;
      padding: 0.8rem 2.5rem;
      align-self: center;
      transition: 250ms ease all;
    }
  }
}
</style>