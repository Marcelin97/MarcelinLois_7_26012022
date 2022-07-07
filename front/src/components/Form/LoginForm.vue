<template>
  <section class="card">
    <div>
      <div>
        <h1>{{ msg }}</h1>

        <div class="container">
          <form action="#" method="post" @submit.prevent="login">
            <div class="FormGroup">
              <label class="FormGroupLabel" for="">User</label>
              <div class="FormTextboxWrapper">
                <input
                  class="FormTextbox"
                  type="text"
                  placeholder="E-mail"
                  v-model="state.user.email"
                  @blur="v$.user.email.$touch"
                  :class="v$.user.email.$error === true ? 'error' : 'dirty'"
                />
                <span class="FormTextboxIcon">
                  <font-awesome-icon :icon="['fas', 'user']" />
                </span>
              </div>

              <!-- Error Message -->
              <template v-if="v$.user.email.$dirty">
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.user.email.$errors"
                  :key="index"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </template>
              <!-- Error Message -->
            </div>

            <div class="FormGroup">
              <label class="FormGroupLabel" for="">Pass</label>
              <div class="FormTextboxWrapper">
                <input
                  class="FormTextbox"
                  type="password"
                  placeholder="Mot de passe"
                  v-model="state.user.password"
                  @blur="v$.user.password.$touch"
                  :class="v$.user.password.$error === true ? 'error' : 'dirty'"
                />
                <span class="FormTextboxIcon">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </span>
              </div>

              <!-- Error Message -->
              <template v-if="v$.user.password.$dirty">
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.user.password.$errors"
                  :key="index"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </template>
              <!-- Error Message -->
            </div>

            <!-- gestion erreur API avec axios -->
            <div class="error-api" v-if="status == 'error_login'">
              <p class="error-msg">{{ apiError }}</p>
            </div>
            <!-- gestion erreur API avec axios -->

            <!-- bouton de soumission -->
            <button
              type="submit"
              class="btn button"
              title="Connexion"
              value="Connexion"
            >
              <span v-if="status == 'loading'">Connexion en cours...</span>
              <span v-else>Connexion</span>
            </button>
            <!-- bouton de soumission -->
          </form>
        </div>
      </div>

      <!-- redirection sur la page création d'un compte -->
      <div class="signup">
        <p class="text-signup">Pas encore inscrit ?</p>
        <div class="actions">
          <router-link class="nav btn button" to="/signup">
            Créer un compte
          </router-link>
        </div>
      </div>
      <!-- redirection sur la page création d'un compte -->
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axiosInstance from "../../services/api";

export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      mode: "login",
      user: {
        email: "",
        password: "",
      },
      apiError: "",
    });

    const rules = computed(() => ({
      user: {
        email: {
          required: helpers.withMessage("L'/email est obligatoire", required),
          $autoDirty: true,
          $lazy: true,
          email: helpers.withMessage(
            "Ceci n'est pas une adresse e-mail valable",
            email
          ),
          minLength: helpers.withMessage(
            "Ce champ doit être long d'au moins 5",
            minLength(5)
          ),
          maxLength: helpers.withMessage(
            "La longueur maximale autorisée est de 60",
            maxLength(60)
          ),
        },
        password: {
          required: helpers.withMessage(
            "Le mot de passe est obligatoire",
            required
          ),
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
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    login() {
      this.apiError = "";

      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        this.$store.commit("setStatus", "loading");
        axiosInstance
          .post("/auth/login", this.state.user)
          .then((result) => {
            // notification de succès
            this.$notify({
              type: "success",
              title: `Connexion réussi !`,
              text: `Vous allez être redirigé vers votre profil.`,
            });
            this.$store.commit("logUser", result.data);
            this.$store.commit("setStatus", "connected");

            // redirection sur la page utilisateur
            setTimeout(
              function () {
                this.$router.push("/user");
              }.bind(this),
              2000,
              this
            );
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("setStatus", "error_login");
            if (error.response.status == 404) {
              const errorMessage = (this.apiError =
                "Utilisateur introuvable !");
              this.errorMessage = errorMessage;
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors de la connexion`,
                text: `Erreur reporté : ${errorMessage}`,
              });
            } else if (error.response.status == 401) {
              const errorMessage = (this.apiError = "Mot de passe invalide !");
              this.errorMessage = errorMessage;
              // notification d'erreur
              this.$notify({
                type: "error",
                title: `Erreur lors de la connexion`,
                text: `Erreur reporté : ${errorMessage}`,
              });
            }
          });
      } else {
        // notification d'erreur
        this.$notify({
          type: "warn",
          title: `Veuillez vous identifié correctement`,
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
section div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
  div {
    flex-direction: column;
  }
}
.container {
  width: auto;
  padding: 0.1rem;
  border-radius: 0.5rem;
  background: #ffffff;
}

h1 {
  font-size: 1.4rem;
  font-weight: bolder;
  margin: 4rem 1rem;
  line-height: 1.5rem;
  text-align: center;
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: rgb(12, 19, 31);
}
.FormGroup {
  margin-bottom: 1.75rem;
}

.FormGroupLabel {
  font-size: 0.95rem;
  color: #8de8fe;
}

.FormTextboxWrapper {
  position: relative;
}

.FormTextbox {
  width: 14rem;
  height: 50px;
  line-height: 50px;
  border: 0;
  border-bottom: 1px solid #c7c7c7;
  color: #606060;
  text-indent: 2rem;
  background-color: rgb(12, 19, 31);
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
    border-color: #b44ff6;
  }
  @media only screen and (min-width: 768px) {
    width: 25rem;
  }
}

.FormTextboxIcon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

button {
  margin-bottom: 1.75rem;
  display: flex;
  align-self: center;
}
.text-signup {
  margin: 2rem;
}

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 0.6rem;
  line-height: 15px;
  margin: 5px 0 0;
}

.error-api {
  padding: 1rem;
}
</style>