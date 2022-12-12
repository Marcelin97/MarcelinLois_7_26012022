<template>
  <div>
    <div class="wrapper">
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
          <div class="profile-card-name">
            {{ user.username }}
          </div>

          <!-- Profil statistics -->
          <div class="profile-card-inf">
            <!-- Publications -->
            <div v-if="user.posts != 0" class="profile-card-inf__item">
              <div class="profile-card-inf__title">
                {{ user.posts.length }}
              </div>
              <div class="profile-card-inf__txt">Publications</div>
            </div>

            <!-- Commentaires -->
            <div v-if="user.comments != 0" class="profile-card-inf__item">
              <div class="profile-card-inf__title">
                {{ user.comments.length }}
              </div>
              <div class="profile-card-inf__txt">Commentaires</div>
            </div>

            <!-- Communautés crées -->
            <div v-if="user.community != 0" class="profile-card-inf__item">
              <div class="profile-card-inf__title">
                {{ user.community.length }}
              </div>
              <div class="profile-card-inf__txt">Communautés crées</div>
            </div>
          </div>
        </div>

        <!-- button actions -->
        <div class="profile-card-ctr">
          <div v-if="userLoggedIn == false" class="profile-card-ctr__actions">
            <!-- button report user -->
            <button type="button" class="btn" @click="$refs.reportUser.openModal()" text="Signaler ce compte"
              aria-label="Signaler ce compte">
              Signaler...
            </button>
          </div>

          <div v-else class="profile-card-ctr__actions">
            <!-- update profile -->
            <button type="button" class="btn" @click="$refs.updateUser.openModal()" text="Modifier ce compte"
            aria-label="Aller sur la page pour modifier son profile">
              Modifier mon profil
            </button>

            <!-- export data -->
            <button type="button" class="btn btn-export" @click="exportDataClick" text="Exporter mes données"
              aria-label="Exporter mes données">
              Exporter mes données
            </button>

            <!-- button delete account -->
            <button type="button" class="btn btn-delete" @click="$refs.deleteAccount.openModal()"
              text="Supprimer mon compte" aria-label="Supprimer mon compte">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal update account -->
    <modalStructure ref="updateUser">
      <template v-slot:header>
        <h1>Modifier mon profil</h1>
      </template>
    
      <template v-slot:body>
              <form action="#" method="put" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="first-name">Prénom</label>
                  <input id="first-name" type="text" v-model="state.userUpdate.firstName" @blur="v$.userUpdate.firstName.$touch"
                    :class="v$.userUpdate.firstName.$error === true ? 'error' : 'dirty'" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.firstName.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.firstName.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <div class="form-group">
                  <label for="last-name">Nom de famille</label>
                  <input id="last-name" type="text" v-model="state.userUpdate.lastName" @blur="v$.userUpdate.lastName.$touch"
                    :class="v$.userUpdate.lastName.$error === true ? 'error' : 'dirty'" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.lastName.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.lastName.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <div class="form-group">
                  <label for="birthday">Date de naissance</label>
                  <input id="birthday" type="date" v-model="state.userUpdate.birthday" @blur="v$.userUpdate.birthday.$touch"
                    :class="v$.userUpdate.birthday.$error === true ? 'error' : 'dirty'" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.birthday.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.birthday.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <div class="form-group">
                  <label for="username">Nom d'utilisateur</label>
                  <input id="username" type="text" v-model="state.userUpdate.username" @blur="v$.userUpdate.username.$touch"
                    :class="v$.userUpdate.username.$error === true ? 'error' : 'dirty'" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.username.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.username.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input id="email" type="email" v-model="state.userUpdate.email" @blur="v$.userUpdate.email.$touch"
                    :class="v$.userUpdate.email.$error === true ? 'error' : 'dirty'" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.email.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.email.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <div class="form-group">
                  <label for="newPassword">Nouveau mot de passe</label>
                  <input id="newPassword" type="newPassword" v-model="state.userUpdate.newPassword" @blur="v$.userUpdate.newPassword.$touch"
                    :class="v$.userUpdate.newPassword.$error === true ? 'error' : 'dirty'" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.newPassword.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.newPassword.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <div class="form-group fileUploadInput">
                  <label for="userImage">Photo de profil</label>
                  <input class="input-file" v-on="state.userUpdate.userImage" id="userImage" type="file" accept=".jpeg,.jpg,png"
                    @change="onChangeFileUpload" ref="file" />
              
                  <!-- Error Message -->
                  <template v-if="v$.userUpdate.userImage.$dirty">
                    <div class="input-errors" v-for="(error, index) of v$.userUpdate.userImage.$errors" :key="index">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </template>
                  <!-- Error Message -->
                </div>
              
                <!-- button submit -->
                <div class="button-container">
                  <button 
                  aria-label="Modifier"
                title="Modifier"
                  type="submit" 
                  class="btn"
                  @click.stop.prevent="onUpdateUser"
                  >
                  Modifier
                </button>
                </div>
              </form>
      </template>
    
      <template v-slot:footer>
        <div class="modal__actions">
          <button class="btn" text="Annuler" type="button" aria-label="Annuler la modification"
            @click="$refs.updateUser.closeModal()">
            Annuler
          </button>
        </div>
      </template>
    </modalStructure>

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
          <button class="btn" text="Annuler" type="button" aria-label="Annuler la suppression"
            @click="$refs.deleteAccount.closeModal()">
            Annuler
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
          <form action="#" method="post" @submit.prevent.stop="reportAccountClick">
            <div class="FormGroup">
              <label class="FormGroupLabel" for="">Pourquoi signalez-vous ce compte ?</label>
              <div class="FormTextboxWrapper">
                <textarea cols="50" rows="5" required class="FormTextbox" type="text"
                  placeholder="Explique nous les raisons de ce signalement." v-model="state.user.content"
                  @blur="v$.user.content.$touch" :class="v$.user.content.$error === true ? 'error' : 'dirty'" />
              </div>

              <!-- Error Message -->
              <template v-if="v$.user.content.$dirty">
                <div v-for="(error, index) of v$.user.content.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </template>
              <!-- Error Message -->
            </div>

            <button type="submit" class="btn button" title="Signaler" text="Signaler" value="Signaler"
              aria-label="Signaler un utilisateur">
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
  </div>
</template>
<script>
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";

import usersApi from "../../api/users";
import axiosInstance from "../../services/api";

import useVuelidate from "@vuelidate/core";
import { helpers, minLength, email, maxLength, alphaNum } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export function strongPassword(value) {
  return (
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
      value
    ) && value.length >= 8
  );
}

export default {
  name: "User-profile",
  props: ["user", "userLoggedIn"],
  emits: ["update-user",],
  setup() {
    const state = reactive({
      user: {
        content: "",
      },
      test: "",
      userUpdate: {
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        newPassword: "",
        username: "",
        userImage: "",
      },
    });

    const rules = computed(() => ({
      user: {
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
      userUpdate: {
        firstName: {
          $autoDirty: true,
          $lazy: true,
        },
        lastName: {
          $autoDirty: true,
          $lazy: true,
        },
        birthday: {
          $autoDirty: true,
          $lazy: true,
        },
        username: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
          alphaNum,
        },
        email: {
          $autoDirty: true,
          $lazy: true,
          email,
          minLength: minLength(5),
          maxLength: maxLength(60),
        },
        newPassword: {
          // $autoDirty: true,
          $lazy: true,
          password_validation: {
            $validator: strongPassword,
            $message:
              "Entre 8 et 16 caractères, Une minuscule au moins, Une majuscule au moins, Un chiffre au moins, Un caractère spécial au moins (@&/!$ ...)",
          },
        },
        userImage: {
          $autoDirty: true,
          $lazy: true,
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
    };
  },
  mounted() {
    this.state.userUpdate = this.$store.state.user;
  },
  methods: {
    onChangeFileUpload() {
      this.state.userUpdate.userImage = document.querySelector("#userImage").files[0];
    },
    async onUpdateUser() {
      let bodyFormData = new FormData();
      if (this.state.userUpdate.userImage)
        bodyFormData.append("image", this.state.userUpdate.userImage);

      for (let key of [
        "firstName",
        "lastName",
        "birthday",
        "email",
        "newPassword",
        "username",
      ]) {
        const param = this.state.userUpdate[key];
        // console.log(param, key);
        if (param) {
          bodyFormData.append(key, param);
        }
      }

      axiosInstance
        .patch("/auth/update", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {

          this.$emit("update-user", result.data);
          // console.log("result: ", result.data);
          this.$store.commit("updateUser", result.data);

          
          // close report user modal
          this.$refs.updateUser.closeModal();

          // success notification
          this.$notify({
            type: "success",
            title: `Profil mise à jour`,
            text: `Vous allez être redirigé vers votre profil.`,
          });

          // // redirect to user page
          // this.$router.push("/user");
        })
        .catch((err) => {
          this.apiErrors = err.response;

          // notification error message
          this.$notify({
            type: "error",
            title: `Erreur lors de la mise à jour de l'utilisateur'`,
            text: `Erreur reporté : ${this.apiErrors}`,
            duration: 30000,
          });
        });
    },
    async exportDataClick() {
      try {
        const response = await usersApi.exportMyData();
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.txt");
        document.body.appendChild(fileLink);

        fileLink.click();

        this.$notify({
          type: "success",
          text: "Le téléchargement commence.",
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
    async deleteAccountClick() {
      if (
        window.confirm(
          "Attention, vous êtes sur le point de supprimer votre compte. Cette action est irréversible. Souhaitez-vous tout de même continuer ?"
        )
      ) {
        try {
          await usersApi.deleteUser();
          await this.$store.commit("logout");
          await this.$router.push("/");
        } catch (error) {
          this.apiErrors = error.response;

          // notification d'erreur
          this.$notify({
            duration: 2500,
            type: "error",
            title: `Erreur lors de la suppression du compte`,
            text: `Erreur reporté : ${this.apiErrors}`,
          });
        }
      }
    },
    reportAccountClick() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        axiosInstance
          .post(`/auth/report/${this.user.id}`, this.state.user)
          .then(() => {
            // notification de succès
            this.$notify({
              type: "success",
              title: `Signalement envoyé !`,
            });
            // close report user modal
            this.$refs.reportUser.closeModal();
          })
          .catch((error) => {
            // console.log(error.response.status);
            if (error.response.status === 404) {
              this.apiErrors = "Utilisateur introuvable !";
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors du signalement`,
                text: `Erreur reporté : ${this.apiErrors}`,
              });
            } else if (error.response.status === 409) {
              // close report user modal
              this.$refs.reportUser.closeModal();

              this.apiErrors = "Vous avez déjà signalé cet utilisateur !";
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors du signalement`,
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

.profile-card-name {
  line-height: 35px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1rem;
  text-align: center;
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

  .btn {
    margin: 0rem;
  }
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
