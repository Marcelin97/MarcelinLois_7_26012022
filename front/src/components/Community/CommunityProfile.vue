<template>
  <div>
    <div class="container-community">
      <div class="community-profile-card">
        <!-- Profil image -->
        <div>
          <div class="community-profile-card__img">
            <img
              v-if="community.icon"
              :src="`http://localhost:3000${community.icon}`"
              :alt="'Avatar de ' + community.icon"
              aria-label="Photo de la communauté"
            />
          </div>
        </div>

        <!-- Profil informations -->
        <div class="community-profile-card__info">
          <!-- Profil statistics -->
          <div class="community-profile-card__about">
            {{ community.about }}
          </div>
        </div>

        <!-- button actions -->
        <div class="community-profile-actions">
          <div class="community-profile-actions__btn">
            <!-- button delete account -->
            <button
              v-if="canAdmin(this.communityRead.userId)"
              type="button"
              class="btn btn-delete"
              aria-label="Supprimer ma communauté"
              @click="$refs.deleteAccount.openModal()"
              text="Supprimer mon compte"
            >
              Supprimer
            </button>

            <!-- update profile -->
            <router-link
              v-if="canAdmin(this.communityRead.userId)"
              aria-label="Modifier cette communauté"
              :communityId="communityId"
              class="btn"
              :to="'/communities/profil/' + community.id + '/settings'"
            >
              Modifier
            </router-link>

            <!-- v-if="canModerate(this.communityRead.userId, this.communityId)" -->
            <!-- button moderator community-->
            <button
              v-if="canAdmin(this.communityRead.userId)"
              type="button"
              class="btn"
              aria-label="Ajouter un modérateur"
              @click="$refs.moderatorCommunity.openModal()"
              text="Ajouter un modérateur"
            >
              Ajouter un modérateur
            </button>
            <!-- button report user -->
            <button
              v-if="canAdmin(this.communityRead.userId)"
              type="button"
              class="btn"
              aria-label="Supprimer un modérateur"
              @click="$refs.deleteModeratorClick.openModal()"
              text="Supprimer un modérateur"
            >
              Supprimer un modérateur
            </button>
          </div>

          <div class="community-profile-actions__btn">
            <!-- export data -->
            <button
              type="button"
              class="btn btn-export"
              aria-label="S'abonner"
              @click="followCommunityClick"
              text="S'abonner"
            >
              S'abonner
            </button>

            <button
              type="button"
              class="btn btn-export"
              aria-label="Se désabonner"
              @click="unfollowCommunityClick"
              text="Se désabonner"
            >
              Se désabonner
            </button>

            <!-- button report user -->
            <button
              type="button"
              class="btn"
              aria-label="Signaler cette communauté"
              @click="$refs.reportCommunity.openModal()"
              text="Signaler ce compte"
              v-if="!isOwner"
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
          Attention, vous êtes sur le point de supprimer cette communauté.
          <br />
          Cette action est irréversible. Souhaitez-vous tout de même continuer
          ?'
        </p>
      </template>

      <template v-slot:footer>
        <div class="modal__actions">
          <button
            class="btn"
            text="Annuler"
            aria-label="Annuler la supression"
            @click="$refs.deleteAccount.closeModal()"
          >
            Annuler
          </button>
          <deleteBtn @click="deleteCommunityClick" />
        </div>
      </template>
    </modalStructure>

    <!-- modal report community -->
    <modalStructure ref="reportCommunity">
      <template v-slot:header>
        <h1>Signaler cette communauté</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="post" @submit.prevent="reportAccountClick">
            <div class="FormGroup">
              <label class="FormGroupLabel" for=""
                >Pourquoi signalez-vous cette communauté ?</label
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
                  :class="
                    v$.community.content.$error === true ? 'error' : 'dirty'
                  "
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
              aria-label="Signaler cette communauté"
            >
              Confirmer signalement
            </button>
          </form>
        </div>
      </template>

      <template v-slot:footer>
        <!-- gestion erreur API avec axios -->
        <div class="error-api">
          <p class="error-msg">{{ apiErrors }}</p>
        </div>
        <!-- gestion erreur API avec axios -->
      </template>
    </modalStructure>

    <!-- modal add moderator -->
    <modalStructure ref="moderatorCommunity">
      <template v-slot:header>
        <h1>Ajouter un modérateur pour cette communauté</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="post" @submit.prevent="addModeratorClick">
            <div>
              <select class="vue-select" v-model="state.user.id">
                <option class="selected-option" selected disabled value="">
                  {{ placeholder }}
                </option>
                <option
                  class="dropdown-options--cell"
                  v-for="(user, index) in users"
                  :user="user"
                  :key="index"
                >
                  {{ user.id }} - {{ user.username }}
                </option>
              </select>
              <div>Modérateur choisi: {{ state.user.id }}</div>
            </div>

            <button
              type="submit"
              class="btn button"
              title="Ajouter modérateur"
              text="Ajouter modérateur"
              aria-label="Ajouter un modérateur"
            >
              Ajouter
            </button>
          </form>
        </div>
      </template>

      <template v-slot:footer>
        <!-- gestion erreur API avec axios -->
        <div class="error-api">
          <p class="error-msg">{{ apiErrors }}</p>
        </div>
        <!-- gestion erreur API avec axios -->
      </template>
    </modalStructure>

    <!-- modal delete moderator -->
    <modalStructure ref="deleteModeratorClick">
      <template v-slot:header>
        <h1>Supprimer un modérateur pour cette communauté</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="post" @submit.prevent="deleteModeratorClick">
            <div>
              <select class="vue-select" v-model="state.user.id">
                <option class="selected-option" selected disabled value="">
                  {{ placeholder }}
                </option>
                <option
                  class="dropdown-options--cell"
                  v-for="(user, index) in users"
                  :user="user"
                  :key="index"
                >
                  {{ user.id }} - {{ user.username }}
                </option>
              </select>
              <div>Modérateur supprimé: {{ state.user.id }}</div>
            </div>

            <button
              type="submit"
              class="btn button"
              title="Supprimer un modérateur"
              text="Supprimer un modérateur"
              aria-label="Supprimer un modérateur"
            >
              Supprimer
            </button>
          </form>
        </div>
      </template>

      <template v-slot:footer>
        <!-- gestion erreur API avec axios -->
        <div class="error-api">
          <p class="error-msg">{{ apiErrors }}</p>
        </div>
        <!-- gestion erreur API avec axios -->
      </template>
    </modalStructure>
  </div>
</template>
<script>
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";

import communitiesApi from "../../api/community";
import usersApi from "../../api/users";
import axiosInstance from "../../services/api";

import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import roleMixin from "../../mixins/role.mixin";

export default {
  name: "Community-profile",
  props: ["community"],
  setup() {
    const state = reactive({
      community: {
        content: "",
      },
      user: {
        id: "",
      },
    });

    const rules = computed(() => ({
      community: {
        content: {
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
      user: [],
      apiErrors: "",
      communityId: "",
      users: [],
      communityRead: {
        id: 0,
        about: "",
        icon: "",
        userId: 0,
        CommunityModerators: [],
      },
      selectValue: "",
      placeholder: "Choisi un modérateur",
    };
  },
  mixins: [roleMixin],
  computed: {
    isOwner() {
      return this.community.userId === this.$store.state.user.id;
    },
  },
  async created() {
    this.user = this.$store.state.user;
    this.communityId = this.$route.params.id;

    // I'm creating a query to retrieve all users informations.
    try {
      const response = await usersApi.getUsers();
      this.users = response;
    } catch (error) {
      if (error.response.status === 404) {
        this.apiErrors = "Utilisateurs introuvable !";

        // notification d'erreur
        this.$notify({
          type: "error",
          title: `Erreur de l'api`,
          text: `Erreur reporté : ${this.apiErrors}`,
        });
      }
    }

    // I'm creating a query to retrieve target community informations.
    try {
      const getCommunity = await communitiesApi.readTargetCommunity(
        `${this.communityId}`
      );
      this.communityRead = getCommunity.data.datas;
    } catch (error) {
      if (error.response.status === 404) {
        this.apiErrors = "Il n'y a pas encore de communauté !";
      } else {
        this.apiErrors = error.data.error;
      }

      // notification error message
      this.$notify({
        type: "error",
        title: `Accès refusé:`,
        text: `${this.apiErrors}`,
        duration: 3000,
      });
    }
  },
  methods: {
    async deleteCommunityClick() {
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

          // redirect to the community page to create new one
          this.$router.push("/wall");
        } catch (error) {
          this.apiErrors = error.data.error;

          // notification error message
          this.$notify({
            type: "error",
            title: `Accès refusé:`,
            text: `${this.apiErrors}`,
            duration: 3000,
          });
        }
      }
    },
    reportAccountClick() {
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
              text: `Merci, votre rapport a été envoyé.`,
            });
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.apiErrors = "Communauté introuvable !";

              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors de l'envoi du rapport`,
                text: `Erreur reporté : ${this.apiErrors}`,
              });
            } else if (error.response) {
              this.apiErrors = error.response;
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors de l'envoi du rapport`,
                text: `Erreur reporté : ${this.apiErrors}`,
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
    async followCommunityClick() {
      try {
        await communitiesApi.followCommunity(this.communityId);

        // notification success
        this.$notify({
          type: "success",
          text: "Vous suivez cette communauté",
        });
      } catch (error) {
        this.apiErrors = error.response;

        // notification d'erreur
        this.$notify({
          duration: 2500,
          type: "error",
          title: `Erreur lors du téléchargement des données`,
          text: `Erreur reporté : ${this.apiErrors}`,
        });
      }
    },
    async unfollowCommunityClick() {
      try {
        await communitiesApi.unfollowCommunity(this.communityId);

        // notification success
        this.$notify({
          type: "success",
          text: "Vous ne suivez plus cette communauté",
        });
      } catch (error) {
        this.apiErrors = error.response;

        // notification d'erreur
        this.$notify({
          duration: 2500,
          type: "error",
          title: `Erreur lors du téléchargement des données`,
          text: `Erreur reporté : ${this.apiErrors}`,
        });
      }
    },
    async addModeratorClick() {
      try {
        axiosInstance
          .post(`/community/${this.communityId}/moderator`, this.state.user)
          .then(() => {
            // notification de succès
            this.$notify({
              type: "success",
              title: "Modérateur",
              text: "Vous venez d'ajouter un nouveau modérateur",
            });
          })
          .catch((error) => {
            if (error.response.status === 500) {
              // console.log(error.response.data.error);
              this.apiErrors =
                "Vous n'êtes pas autorisé à gérer les rôles de communauté !";

              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors de l'ajoute du modérateur`,
                text: `Erreur reporté : ${this.apiErrors}`,
              });
            } else if (error.response) {
              this.apiErrors = error.response;

              // error notification
              this.$notify({
                type: "error",
                title: `Erreur lors de l'ajoute du modérateur`,
                text: `Erreur reporté : ${this.apiErrors}`,
              });
            }
          });
      } catch (error) {
        this.apiErrors = error.response.data.error;

        // notification d'erreur
        this.$notify({
          duration: 2500,
          type: "error",
          title: `Erreur lors de l'ajoute du modérateur`,
          text: `Erreur reporté : ${this.apiErrors}`,
        });
      }
    },
    async deleteModeratorClick() {
      try {
        axiosInstance
          .delete(
            `/community/${this.communityId}/moderator/delete`,
            this.state.user
          )
          .then(() => {
            // notification de succès
            this.$notify({
              type: "success",
              title: "Modérateur supprimer",
              text: "Vous venez de supprimer un modérateur",
            });
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.apiErrors =
                "Vous n'êtes pas autorisé à gérer les rôles de communauté !";

              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors de la suppression du modérateur`,
                text: `Erreur reporté : ${this.apiErrors}`,
              });
            } else if (error.response) {
              this.state.apiErrors = error.response;

              // error notification
              this.$notify({
                type: "error",
                title: `Erreur lors de la suppression du modérateur`,
                text: `Erreur reporté : ${this.apiErrors}`,
              });
            }
          });
      } catch (error) {
        this.apiErrors = error.response.data.error;

        // notification d'erreur
        this.$notify({
          duration: 2500,
          type: "error",
          title: `Erreur lors de l'ajoute du modérateur`,
          text: `Erreur reporté : ${this.apiErrors}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-community {
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

.community-profile-card {
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

  &__info {
    margin-top: -35px;
    text-align: center;
    padding: 0 20px;
    transition: all 0.3s;
  }

  &__about {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 2rem 0 0;
    background: transparent;
    word-break: break-all;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 40%;
}
.community-profile-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  border-radius: 0.8rem;

  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
  &__btn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
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
  align-items: center;
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

// modal moderatorCommunity
@mixin ellipsis() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vue-select {
  width: 100%;
  height: 2rem;
  background-color: #fff;
  margin: 45px auto;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
  border: none;
  transition: all 200ms linear;

  .selected-option {
    @include ellipsis();
    display: inline-block;
    padding: 15px 50px 15px 15px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    transition: all 200ms linear;

    &:hover {
      color: red;
    }
  }
}

.dropdown-options-container {
  overflow-y: scroll;
  height: 150px;
}

.dropdown-options--cell {
  padding: 15px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
}

// error if input is invalid
.dirty {
  border-color: #8de8fe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  background: #fdd;
  border-color: #fd4444;
  opacity: 0.7;
}

.error:focus {
  outline-color: #f99;
}

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
  max-width: 15rem;
  @media only screen and (min-width: 576px) {
    max-width: 25rem;
  }
}
</style>
