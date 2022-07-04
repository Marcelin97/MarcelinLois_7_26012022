<template>
  <div>User {{ username }}</div>
  <div>
    {{ targetUserProfil.id || "chargement en cours..."}}
    {{targetUserProfil.username}}
    {{targetUser}}
  </div>
</template>

<script>
// import PostCard from "../Posts/PostCard.vue";
// import modalStructure from "../Modal/ModalStructure.vue";
// import deleteBtn from "../Base/DeleteBtn.vue";
// import userApi from "../../api/users"

export default {
  name: "User-profile",
  props: ["targetUser"],
  setup() {},
  components: {
    // PostCard,
    // modalStructure,
    // deleteBtn,
  },
  data() {
    return {
      apiError: "",
      targetUserProfil: [],
    };
  },
  async beforeMount() {
    // if (!this.user) {
    //   this.$router.push("/login");
    // }

    this.targetUserProfil = this.$store.state.targetUserId;
    console.log("connected user", this.targetUserProfil);

  },
  computed: {
    username() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
// modalStructure
.overflow-hidden {
  overflow: hidden;
}

.modal__actions {
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
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

// .profile-card__button {
//   margin-top: 1rem;
//   background: lighten(rgb(23, 23, 23), 1%);
//   border: none;
//   border-radius: 0.8rem;
//   transition: all 0.2s ease-in-out;
//   font-weight: 700;
//   margin: 15px 35px;
//   min-width: 201px;
//   min-height: 55px;
//   text-align: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   box-shadow: inset -3px -3px 3px rgba(white, 0.025),
//     inset 3px 3px 5px rgba(black, 0.075), -3px -3px 5px rgba(white, 0.025),
//     3px 3px 5px rgba(black, 0.05);
//   &:hover {
//     background: darken(rgb(12, 19, 31), 1%);
//     box-shadow: inset -5px -5px 5px rgba(white, 0.01),
//       inset 5px 5px 5px rgba(black, 0.1), -5px -5px 5px rgba(white, 0.015),
//       5px 5px 5px rgba(black, 0.05);
//   }
//   @media screen and (max-width: 576px) {
//     margin: 1em;
//     &:last-child {
//       margin-bottom: 0;
//     }
//   }
// }

img {
  width: 100%;
  height: 100%;
}

.btn {
  margin: 1rem;
}

.btn-delete:focus {
  box-shadow: 0 0 0 2px red;
}
</style>