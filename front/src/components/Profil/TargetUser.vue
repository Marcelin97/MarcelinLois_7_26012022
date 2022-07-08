<template>
 <GoBack />
    <div class="wrapper" v-if="this.targetUserProfil">
    <div class="profile-card js-profile-card">

      <!-- Profil image -->
      <div class="profile-card__img" v-if="this.targetUserProfil.imageUrl">
        <img
          :src="`http://localhost:3000${this.targetUserProfil.imageUrl}`"
          :alt="'Avatar de ' + this.targetUserProfil.username"
          aria-label="Photo d'utilisateur"
        />
      </div>

      <!-- Profil informations -->
      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">
          Nom d'utilisateur :
          {{ this.targetUserProfil.username || "chargement en cours..." }}
        </div>
        <div class="profile-card__txt">
          Identifiant : {{ userTargetId }}
        </div>
        <div class="profile-card__txt">
          administrateur : {{ this.targetUserProfil.isAdmin }}
        </div>

        <!-- Profil statistiques -->
        <div class="profile-card-inf">
          <!-- Publications -->
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              {{ this.targetUserProfil.posts }}
            </div>
            <div class="profile-card-inf__txt">Publications</div>
          </div>

          <!-- Commentaires -->
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              {{ this.targetUserProfil.comments }}
            </div>
            <div class="profile-card-inf__txt">Commentaires</div>
          </div>

          <!-- Communautés crées -->
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              {{ this.targetUserProfil.community }}
            </div>
            <div class="profile-card-inf__txt">Communautés crées</div>
          </div>
        </div>
      </div>

      <!-- button actions -->
      <div class="profile-card-ctr">
        
        <!-- button send a message -->
        <button
          type="button"
          class="btn"
          @click="sendMessage"
          text="Écrire un message"
        >
          Écrire
        </button>

        <!-- button report user -->
        <button
          type="button"
          class="btn"
          @click="$refs.modalName.openModal()"
          text="Signaler ce compte"
        >
          Signaler...
        </button>
      </div>
    </div>
  </div>

    <!-- modal report user -->
  <modalStructure ref="modalName">
    <template v-slot:header>
      <h1>Supprimer mon compte</h1>
    </template>

    <template v-slot:body>
      <p>
        Attention, vous êtes sur le point de supprimer votre compte. Cette
        action est irréversible. Souhaitez-vous tout de même continuer ?'
      </p>
    </template>

    <template v-slot:footer>
      <div class="modal__actions">
        <button class="btn" @click="$refs.modalName.closeModal()">
          Cancel
        </button>
        <deleteBtn @click="deleteAccountClick" />
      </div>
    </template>
  </modalStructure>
</template>

<script>
// import PostCard from "../Posts/PostCard.vue";
import modalStructure from "../Modal/ModalStructure.vue";
import GoBack from "../Base/GoBack.vue";
import userApi from "../../api/users";


export default {
  name: "User-profile",
  props: ["targetUser"],
  setup() {},
  components: {
    // PostCard,
    modalStructure,
    GoBack 
  },
  data() {
    return {
      apiError: "",
      userId: "",
      targetUserProfil: [],
    };
  },
  computed: {
    userTargetId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await userApi.readTargetUser(this.userId);
      console.log(response.data.data);
      this.targetUserProfil = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async beforeRouteUpdate(to) {
    this.userId = to.params.id;
    try {
      const response = await userApi.readTargetUser(this.userId);
      this.user = response.data.data;
    } catch (error) {
      console.log(error);
    }
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
  box-shadow: 0px 5px 50px 0px #324e63;

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
    box-shadow: 0px 5px 50px 0px #324e63, 0px 0px 0px 7px #08708a;

    @media screen and (max-width: 576px) {
      width: 120px;
      height: 120px;
    }
  }

  &__cnt {
    margin-top: 1rem;
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

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 40%;
}

.btn {
  margin: 1rem;
}

</style>