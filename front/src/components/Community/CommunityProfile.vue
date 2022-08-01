<template>
  <div class="wrapper">
    <div class="profile-card js-profile-card">
      <!-- Profil image -->
      <div>
        <div class="profile-card__img">
          <img
            v-if="community.icon"
            :src="`http://localhost:3000${community.icon}`"
            :alt="'Avatar de ' + community.icon"
            aria-label="Photo de la communauté"
          />
          <!-- <img v-else src="../../assets/img/avataaars.png" alt="Avatar par défaut" aria-label="Avatar par défaut" /> -->
        </div>
      </div>

      <!-- Profil informations -->
      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">
          {{ community.title }}
        </div>

        <!-- Profil statistics -->
        <div class="profile-card-inf">
          {{ community.about }}
        </div>
      </div>

      <!-- button actions -->
      <div class="profile-card-ctr">
        <div class="profile-card-ctr__actions">
          <!-- button delete account -->
          <button
            type="button"
            class="btn btn-delete"
            @click="$refs.deleteAccount.openModal()"
            text="Supprimer mon compte"
          >
            Supprimer la communauté
          </button>

          <!-- update profile -->
          <router-link class="btn" to="/user/parameter">
            Modifier la communauté
          </router-link>

          <!-- update profile -->
          <router-link class="btn" to="/user/parameter">
            Ajouter un modérateur
          </router-link>

          <router-link class="btn" to="/user/parameter">
            Supprimer un modérateur
          </router-link>
        </div>

        <div class="profile-card-ctr__actions">
          <!-- export data -->
          <button
            type="button"
            class="btn btn-export"
            @click="exportDataClick"
            text="Exporter mes données"
          >
            s'abonner
          </button>
          <button
            type="button"
            class="btn btn-export"
            @click="exportDataClick"
            text="Exporter mes données"
          >
            se désabonner
          </button>

          <!-- button report user -->
          <button
            type="button"
            class="btn"
            @click="$refs.reportUser.openModal()"
            text="Signaler ce compte"
          >
            Signaler...
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
      <h1>Supprimer la communauté</h1>
    </template>

    <template v-slot:body>
      <p>
        Attention, vous êtes sur le point de supprimer cette communauté. Cette
        action est irréversible. Souhaitez-vous tout de même continuer ?'
      </p>
    </template>

    <template v-slot:footer>
      <div class="modal__actions">
        <button
          class="btn"
          text="Annuler"
          @click="$refs.modalName.closeModal()"
        >
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
            <label class="FormGroupLabel" for=""
              >Pourquoi signalez-vous ce compte ?</label
            >
            <div class="FormTextboxWrapper">
              <textarea
                cols="50"
                rows="5"
                required
                class="FormTextbox"
                type="text"
                placeholder="Explique nous les raisons de ce signalement."
                v-model="state.community.content"
                @blur="v$.community.content.$touch"
                :class="v$.community.content.$error === true ? 'error' : 'dirty'"
              />
            </div>

            <!-- Error Message -->
            <template v-if="v$.community.content.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.community.content.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>

          <button
            type="submit"
            class="btn button"
            title="Signaler"
            text="Signaler"
            value="Signaler"
          >
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
</template>
<script>
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";
import communitiesApi from "../../api/community";
import axiosInstance from "../../services/api";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  // required,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "Community-profile",
  props: ["community"],
  setup() {
    const state = reactive({
      community: {
        content: "",
      },
    });

    const rules = computed(() => ({
      community: {
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
    modalStructure,
    deleteBtn,
  },
  data() {
    return {
      apiErrors: "",
      communityId: "",
    };
  },
  methods: {
    async deleteAccountClick() {
      this.communityId = this.$route.params.id;

      if (
        window.confirm(
          "Attention, vous êtes sur le point de supprimer cette communauté. Cette action est irréversible. Souhaitez-vous tout de même continuer ?"
        )
      ) {
        try {
          await communitiesApi.deleteCommunity(this.communityId);
          // notification success
          this.$notify({
            type: "success",
            title: `Suppression`,
            text: `La communauté est supprimer`,
            duration: 30000,
          });
          await this.$router.push("/communities");
        } catch (error) {
          console.error(error.data);

          const errorMessage = (this.apiErrors = error.response);
          this.errorMessage = errorMessage;

          // notification error message
          this.$notify({
            type: "error",
            title: `Erreur lors du changement de la communauté`,
            text: `Erreur reporté : ${errorMessage}`,
            duration: 30000,
          });
        }
      }
    },
      reportAccountClick() {
              this.communityId = this.$route.params.id;

      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        axiosInstance
          .post(`/community/${this.communityId}/report`, this.state.community)
          .then(() => {
            // notification de succès
            this.$notify({
              type: "success",
              title: `Signalement envoyé !`,
              text: `Vous allez être redirigé sur la communauté`,
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
                "Communauté introuvable !");
                this.errorMessage = errorMessage;
              
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors du signalement`,
                text: `Erreur reporté : ${errorMessage}`,
              });
            } else if (error.response) {
              const errorMessage = (this.apiErrors = error.response);
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

.profile-card-ctr__actions {
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
</style>