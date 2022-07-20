<template>
  <div class="wrapper" v-if="user.length != 0">
    <div class="profile-card js-profile-card">

      <!-- Profil image -->

      <div>
        <div class="profile-card__img box">
          <img v-if="user.imageUrl != '' && user.imageUrl != null"
            :src="`http://localhost:3000${user.imageUrl}`" :alt="'Avatar de ' + user.imageUrl"
            aria-label="Photo d'utilisateur" />
          <img v-if="user.imageUrl === '' || user.imageUrl === null" src="../../assets/img/avataaars.png"
            alt="Avatar par défaut" aria-label="Avatar par défaut" />
        </div>
        <!-- <div class="box"> -->
        <div v-if="user.isAdmin == true" class="ribbon"><span>Admin</span></div>
        <!-- </div> -->
      </div>

      <!-- Profil informations -->
      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name container">
          {{ user.username }}
        </div>
        <!-- <div class="profile-card__txt">
          Identifiant : {{ user.id || "chargement en cours..." }}
        </div> -->
        <!-- <div class="profile-card__txt">administrateur : {{ user.isAdmin }}</div> -->

        <!-- Profil statistiques -->
        <div class="profile-card-inf">
          <!-- Publications -->
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              <!-- {{ user.posts.length }} -->
            </div>
            <div class="profile-card-inf__txt">Publications</div>
          </div>

          <!-- Commentaires -->
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              <!-- {{ user.comments.length }} -->
            </div>
            <div class="profile-card-inf__txt">Commentaires</div>
          </div>

          <!-- Communautés crées -->
          <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">
              <!-- {{ user.community.length }} -->
            </div>
            <div class="profile-card-inf__txt">Communautés crées</div>
          </div>
        </div>
      </div>

      <!-- button actions -->
      <div class="profile-card-ctr">
        <router-link class="btn" to="/user/parameter">
          Modifier mon profil
        </router-link>
      </div>
      <div class="profile-card-ctr">
        <button type="button" class="btn btn-export" @click="exportDataClick" text="Exporter mes données">
          Exporter mes données
        </button>

        <!-- button delete account -->
        <button type="button" class="btn btn-delete" @click="$refs.modalName.openModal()" text="Supprimer mon compte">
          Supprimer mon compte
        </button>
      </div>
    </div>
  </div>

  <div>
    <PostCard />
  </div>

  <!-- modal delete account -->
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
import PostCard from "../Posts/PostCard.vue";
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";
import usersApi from "../../api/users";

export default {
  name: "User-profile",
  setup() {},
  components: {
    PostCard,
    modalStructure,
    deleteBtn,
  },
  data() {
    return {
      apiError: "",
      user: [],
      communityLength: "",
      commentsLength: "",
      postsLength: "",
    };
  },
  methods: {
    async exportDataClick() {
      try {
        const response = await usersApi.exportMyData();
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.txt");
        document.body.appendChild(fileLink);

        fileLink.click();

        this.$notify({
          type: "success",
          text: "Le téléchargement commence.",
        });
      } catch (error) {
        const errorMessage = (this.apiError = error.response);
        this.errorMessage = errorMessage;
        // console.log("apiError", error);

        // notification d'erreur
        this.$notify({
          duration: 2500,
          type: "error",
          title: `Erreur lors du téléchargement des données`,
          text: `Erreur reporté : ${errorMessage}`,
        });
      }
    },
    async deleteAccountClick() {
      if (
        window.confirm(
          "Attention, vous êtes sur le point de supprimer votre compte. Cette action est irréversible. Souhaitez-vous tout de même continuer ?"
        )
      ) {
        try {
          await usersApi.deleteUser();
          await this.$store.commit("logout");
          // await this.$store.commit("setStatus", "logout");
          await this.$router.push("/");
        } catch (e) {
          console.error(e.data);
        }
      }
    },
  },
  mounted() {
    this.user = this.$store.state.user;

    // if user is not connected redirect to login page
    if (!this.user) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss" scoped>

.box {
  width: 200px;
  height: 300px;
  position: relative;
  border: 1px solid #BBB;
  background: #EEE;
}

.ribbon {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;
}

.ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #FFF;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79A70A;
  background: linear-gradient(#9BC90D 0%, #79A70A 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  right: -21px;
}

.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #79A70A;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79A70A;
}

.ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #79A70A;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79A70A;
}
.pro {
  /* Shown at the bottom right corner */
  top: 0;
  position: absolute;
  right: 0;
  transform: translate(50%, 50%);

  /* Rounded border */
  border-radius: 0 20px 20px 0;
  width: auto;

  /* Background color */
  color: #231E39;
      background-color: #FEBB0B;
      font-size: 14px;
      font-weight: bold;
      padding: 3px 7px;
}
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
  box-shadow: 0px 5px 50px 0px #bebdb8;

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
    box-shadow: 0px 5px 50px 0px #bebdb8, 0px 0px 0px 5px #142342;

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
    color: #c7545e;
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
      color: #c7545e;
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

.btn-delete:focus {
  box-shadow: 0 0 0 2px red;
}
</style>