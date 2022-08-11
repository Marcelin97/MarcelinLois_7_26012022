<template>
<div>
  <div class="wrapper" >
    <div class="profile-card js-profile-card">

      <!-- Profil image -->
      <div>
        <div class="profile-card__img">
          <img v-if="user.imageUrl" :src="`http://localhost:3000${user.imageUrl}`" :alt="'Avatar de ' + user.imageUrl"
            aria-label="Photo d'utilisateur" />
          <img v-else src="../../assets/img/avataaars.png" alt="Avatar par défaut" aria-label="Avatar par défaut" />
        </div>

        <div v-if="user.isAdmin == true" class="ribbon">
          <span>Admin</span>
        </div>
      </div>

      <!-- Profil informations -->
      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">
          {{ user.username }}
        </div>

        <!-- Profil statistics -->
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

        <div v-if="userLoggedIn == false" class="profile-card-ctr__actions">
          <!-- button report user -->
          <button type="button" class="btn" @click="$refs.reportUser.openModal()" text="Signaler ce compte">
            Signaler...
          </button>
        </div>

        <div v-else class="profile-card-ctr__actions">
          <!-- update profile -->
          <router-link class="btn" to="/user/parameter">
            Modifier mon profil
          </router-link>

          <!-- export data -->
          <button type="button" class="btn btn-export" @click="exportDataClick" text="Exporter mes données">
            Exporter mes données
          </button>

          <!-- button delete account -->
          <button type="button" class="btn btn-delete" @click="$refs.deleteAccount.openModal()"
            text="Supprimer mon compte">
            Supprimer mon compte
          </button>
        </div>

      </div>
    </div>
  </div>

  <div>
    <PostCard />
  </div>

  <!-- modal delete account -->
  <modalStructure ref="deleteAccount">
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
        <button class="btn" text="Annuler" @click="$refs.modalName.closeModal()">
          Cancel
        </button>
        <deleteBtn @click="deleteAccountClick" />
      </div>
    </template>
  </modalStructure>

  <!-- modal report user -->
  <modalStructure ref="reportUser">
    <template v-slot:header>
      <h1>Signaler ce compte</h1>
    </template>

    <template v-slot:body>
      <div class="container">
        <form action="#" method="post" @submit.prevent="reportAccountClick">
          <div class="FormGroup">
            <label class="FormGroupLabel" for="">Pourquoi signalez-vous ce compte ?</label>
            <div class="FormTextboxWrapper">
              <textarea cols="50" rows="5" required class="FormTextbox" type="text"
                placeholder="Explique nous les raisons de ce signalement." v-model="state.user.content"
                @blur="v$.user.content.$touch" :class="v$.user.content.$error === true ? 'error' : 'dirty'" />
            </div>

            <!-- Error Message -->
            <template v-if="v$.user.content.$dirty">
              <div class="input-errors" v-for="(error, index) of v$.user.content.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>

          <button type="submit" class="btn button" title="Signaler" text="Signaler" value="Signaler">
            Confirmer signalement
          </button>
        </form>
      </div>
    </template>

    <template v-slot:footer>
      <!-- gestion erreur API avec axios -->
      <div class="error-api">
        <p class="error-msg">{{ apiError }}</p>
      </div>
      <!-- gestion erreur API avec axios -->
    </template>
  </modalStructure>
</div>
</template>
<script>
import PostCard from "../Posts/PostCard.vue";
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";
import usersApi from "../../api/users";
import axiosInstance from "../../services/api";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "User-profile",
  props: ["user", "userLoggedIn", "targetUser"],
  setup() {
    const state = reactive({
      user: {
        content: "",
      },
    });

    const rules = computed(() => ({
      user: {
        content: {
          // required: helpers.withMessage("L'/email est obligatoire", required),
          $autoDirty: true,
          $lazy: true,
          minLength: helpers.withMessage(
            "Ce champ doit être long d'au moins 5",
            minLength(5)
          ),
          maxLength: helpers.withMessage(
            "La longueur maximale autorisée est de 255",
            maxLength(255)
          ),
        },
      },
    }));

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  validationConfig: {
    $lazy: true,
  },
  components: {
    PostCard,
    modalStructure,
    deleteBtn,
  },
  data() {
    return {
      apiError: "",
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
    reportAccountClick() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        axiosInstance
          .post(`/auth/report/${this.userId}`, this.state.user)
          .then(() => {
            // notification de succès
            this.$notify({
              type: "success",
              title: `Signalement envoyé !`,
              text: `Vous allez être redirigé vers votre profil.`,
            });

            // force refresh page
            setTimeout(
              function () {
                this.$router.go(0);
              }.bind(this),
              1000,
              this
            );
          })
          .catch((error) => {
            console.log(error.response.status);
            if (error.response.status == 404) {
              const errorMessage = (this.apiError =
                "Utilisateur introuvable !");
              this.errorMessage = errorMessage;
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors du signalement`,
                text: `Erreur reporté : ${errorMessage}`,
              });
            } else if (error.response.status == 409) {
              const errorMessage = (this.apiError =
                "Vous avez déjà signalé cet utilisateur !");
              this.errorMessage = errorMessage;
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors du signalement`,
                text: `Erreur reporté : ${errorMessage}`,
              });
            }
          });
      } else {
        // notification d'erreur
        this.$notify({
          type: "warn",
          title: `Veuillez faire un signalement complet.`,
        });

        // montre les erreurs à l'écran
        this.$nextTick(() => {
          let domRect = document
            .querySelector(".error")
            .getBoundingClientRect();
          window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop
          );
        });
      }
    },
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
  }

  &__name {
        line-height: 35px;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.3rem;
        font-size: 1rem;
        text-align: center;
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

.profile-card-ctr__actions{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
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

// modalStructure
.overflow-hidden {
  overflow: hidden;
}

.modal {
  background: transparent;
}

.modal__actions {
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

// modal report user
.FormTextbox {
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid #c7c7c7;
  color: #606060;
  background-color: rgb(12, 19, 31);

  &::placeholder {
    color: #a7a7a7;
  }

  &:focus {
    outline: none;
    border-color: #b44ff6;
  }
}

// Ribbon
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
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#9bc90d 0%, #79a70a 100%);
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
  border-left: 3px solid #79a70a;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}

.ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #79a70a;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}
</style>
