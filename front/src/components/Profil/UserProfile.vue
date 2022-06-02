<template>
  <div class="wrapper" v-if="user">
    <div class="profile-card js-profile-card">
      <div class="profile-card__img">
        <!-- <img
          :src="user?.data.imageUrl"
          alt="Photo d'utilisateur"
          aria-label="Photo d'utilisateur"
        /> -->
      </div>

      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">
          Nom d'utilisateur :
          {{ user.data?.username || "chargement en cours..." }}
        </div>
        <!-- <div class="profile-card__txt">Identifiant : {{ user?.data.id  || "chargement en cours..."  }}</div> -->
        <!-- <div class="profile-card__txt">administrateur : {{ user?.data.isAdmin }}</div> -->

        <div class="profile-card-inf">
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              {{ user.data?.communities.length }}
            </div>
            <div class="profile-card-inf__txt">Abonnements</div>
          </div>

          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">{{ user.data?.creator.length }}</div>
            <div class="profile-card-inf__txt">Publications</div>
          </div>
        </div>
      </div>

      <div class="profile-card-ctr">
        <router-link class="profile-card__button" to="/">Signaler</router-link>
        <router-link class="profile-card__button" to="/user/parameter"
          >Modifier</router-link
        >
      </div>
    </div>
  </div>
  <div>
    <PostCard />
  </div>
</template>

<script>
import PostCard from "../Posts/PostCard.vue";
import { mapState } from "vuex";

export default {
  name: "User-profile",
  setup() {},
  components: {
    PostCard,
  },
  async mounted() {
    //  if (this.$store.state.user.userId == -1 || null) {
    //   this.$router.push('/');
    //   return ;
    // }
    try {
      await this.$store.dispatch("getUserInfos");
      // console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
};
</script>

<style lang="scss" scoped>
// Profil
.wrapper {
  width: 100%;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 50px 20px;
  padding-top: 100px;
  display: flex;
  background-image: linear-gradient(-20deg, #1c2134 0%, #14151a 100%);

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
  }
}

.profile-card {
  width: 100%;
  margin: auto;
  max-width: 700px;
  position: relative;
  border-radius: 0.8rem;

  &__img {
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-50%);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 4;
    box-shadow: 0px 5px 50px 0px #08708a, 0px 0px 0px 7px #08708a;

    @media screen and (max-width: 576px) {
      width: 120px;
      height: 120px;
    }
  }

  &__cnt {
    margin-top: -35px;
    text-align: center;
    padding: 0 20px;
    transition: all 0.3s;
    background: transparent;
  }

  &__name {
    font-weight: 700;
    margin-bottom: 15px;
    background: transparent;
  }

  &__txt {
    font-size: 18px;
    font-weight: 500;
    color: #324e63;
    margin-bottom: 15px;
    background: transparent;
  }

  &-inf {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 35px;
    background: transparent;

    &__item {
      padding: 10px 35px;
      min-width: 150px;
      background: transparent;

      @media screen and (max-width: 768px) {
        padding: 10px 20px;
        min-width: 120px;
      }
    }

    &__title {
      font-weight: 700;
      font-size: 27px;
      //color: #6944ff;
      color: #324e63;
      background: transparent;
    }

    &__txt {
      font-weight: 500;
      margin-top: 7px;
      background: transparent;
    }
  }

  &-ctr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    border-radius: 0.8rem;
    @media screen and (max-width: 800px) {
      flex-wrap: wrap;
    }
  }
}

.profile-card__button {
  margin-top: 1rem;
  background: lighten(rgb(23, 23, 23), 1%);
  border: none;
  border-radius: 0.8rem;
  transition: all 0.2s ease-in-out;
  font-weight: 700;
  margin: 15px 35px;
  min-width: 201px;
  min-height: 55px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: inset -3px -3px 3px rgba(white, 0.025),
    inset 3px 3px 5px rgba(black, 0.075), -3px -3px 5px rgba(white, 0.025),
    3px 3px 5px rgba(black, 0.05);
  &:hover {
    background: darken(rgb(12, 19, 31), 1%);
    box-shadow: inset -5px -5px 5px rgba(white, 0.01),
      inset 5px 5px 5px rgba(black, 0.1), -5px -5px 5px rgba(white, 0.015),
      5px 5px 5px rgba(black, 0.05);
  }
  @media screen and (max-width: 576px) {
    margin: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

img {
  width: 100%;
  height: 100%;
}
</style>