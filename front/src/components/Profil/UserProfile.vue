<template>
  <div class="wrapper">
    <div class="profile-card js-profile-card">
      <div class="profile-card__img">
        <img
          src="https://images.unsplash.com/photo-1528785198459-ec50485704c7?ixlib=rb-0.3.5&s=3a2fc3039516555bbb2e9cd2967bd321&auto=format&fit=crop&w=1537&q=80"
          alt="profile card"
          aria-label="Photo d'utilisateur"
        />
      </div>

      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">User Groupomania</div>
        <div class="profile-card__txt">Full Stack Developer</div>

        <div class="profile-card-inf">
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">15</div>
            <div class="profile-card-inf__txt">Abonnements</div>
          </div>

          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">35</div>
            <div class="profile-card-inf__txt">Publications</div>
          </div>
        </div>
      </div>

      <div class="profile-card-ctr">
        <button class="profile-card__button">Message</button>
        <button class="profile-card__button">Signaler</button>
        <button class="profile-card__button">Modifier</button>
      </div>
    </div>
  </div>
<div>
        <PostCard />

</div>
</template>

<script>
import PostCard from "../Posts/PostCard.vue";

export default {
  setup() {},
    components: {
    PostCard,
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
  //   background-image: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
  }
}

.profile-card {
  width: 100%;
  //   min-height: 460px;
  margin: auto;
  //   background: #292929;
  border-radius: 12px;
  max-width: 700px;
  position: relative;

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

    @media screen and (max-width: 576px) {
      flex-wrap: wrap;
    }
  }

  &__button {
    background: none;
    border: none;
    font-weight: 700;
    margin: 15px 35px;
    padding: 15px 40px;
    min-width: 201px;
    border-radius: 50px;
    min-height: 55px;
    cursor: pointer;
    transition: all 0.3s;

    @media screen and (max-width: 768px) {
      min-width: 170px;
      margin: 15px 25px;
    }

    @media screen and (max-width: 576px) {
      min-width: inherit;
      margin: 0;
      margin-bottom: 16px;
      width: 100%;
      max-width: 300px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.profile-card__button {
  margin-top: 1rem;
  background: lighten(rgb(23, 23, 23), 1%);
  border: none;
  font-size: 12px;
  padding: 0.6rem 0.6rem;
  border-radius: 0.8rem;
  transition: all 0.2s ease-in-out;
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
}
img{
  width: 100%;
  height: 100%;
}
</style>