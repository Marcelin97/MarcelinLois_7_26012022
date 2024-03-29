<template>
  <div class="card">
    <div>
      <h1>{{ msg }}</h1>

      <div class="container">
        <!-- Login form -->
        <form action="#" method="post" @submit.prevent="login">
          <!-- Email -->
          <div class="FormGroup">
            <label class="FormGroupLabel" for="email">E-mail</label>
            <div class="FormTextboxWrapper">
              <input
                id="email"
                autocomplete="email"
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

          <!-- Password -->
          <div class="FormGroup">
            <label class="FormGroupLabel" for="password">Pass</label>
            <div class="FormTextboxWrapper">
              <input
                id="password"
                autocomplete="current-password"
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
          <div v-if="this.state.apiErrors != ''" class="error-api">
            <p class="error-msg">{{ this.state.apiErrors }}</p>
          </div>
          <!-- gestion erreur API avec axios -->

          <!-- BTN submit -->
          <button
            type="submit"
            class="btn button"
            title="Connexion"
            value="Connexion"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>

    <!-- Redirect to the registration form -->
    <div class="signup">
      <p class="text-signup">Pas encore inscrit ?</p>
      <div class="actions">
        <!-- LINK REGISTRATION FORM -->
        <router-link
          class="nav btn button"
          to="/signup"
          aria-label="Créer un compte"
        >
          Créer un compte
        </router-link>
      </div>
    </div>
    <!-- Redirect to the registration form -->
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

// API requests
import axiosInstance from "../../services/api";

export default {
  name: "Login-Form",
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      user: {
        email: "",
        password: "",
      },
      apiErrors: "",
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
  methods: {
    // LOGIN
    login() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        axiosInstance
          .post("/auth/login", this.state.user)
          .then((result) => {
            // Store current_user
            this.$store.commit("logUser", result.data);

            // Success notification
            this.$notify({
              type: "success",
              title: `Connexion réussi !`,
              text: `Bienvenue`,
            });

            // Redirect to news feed
            this.$router.push("/wall");
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.state.apiErrors = "Utilisateur introuvable !";

              // Error notification
              this.$notify({
                type: "error",
                title: `Erreur lors de la connexion`,
                text: `Erreur reporté : ${this.state.apiErrors}`,
              });
            } else if (error.response.status === 401) {
              this.state.apiErrors = "Mot de passe invalide !";

              // Error notification
              this.$notify({
                type: "error",
                title: `Erreur lors de la connexion`,
                text: `Erreur reporté : ${this.state.apiErrors}`,
              });
            }
          });
      } else {
        // Error notification
        this.$notify({
          type: "warn",
          title: `Veuillez vous identifié correctement`,
        });

        // Shows errors on screen
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
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
}

h1 {
  margin: 2rem 0;
  letter-spacing: 0.3rem;
  font-size: 1.4rem;
  font-weight: bolder;
  line-height: 1.4rem;
  text-align: center;
  border-bottom: 1px solid #4e5166;
  padding-bottom: 3vh;
}

form {
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 1rem;
}

.FormGroup {
  margin-bottom: 1.75rem;
}

.FormGroupLabel {
  font-size: 0.95rem;
}

.FormTextboxWrapper {
  position: relative;
}

.FormTextbox {
  width: 14rem;
  height: 50px;
  line-height: 50px;
  border: none;
  border-bottom: 1px solid #4e5166;
  text-indent: 2rem;
  &:focus {
    outline: none;
    border-color: #ffd7d7;
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
  display: flex;
  align-self: center;
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
  color: #cc0033;
  text-align: center;
  font-size: 12px;
}

// action signupUser
.text-signup {
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  margin: 2rem 0;
  line-height: 1.5rem;
  border-bottom: 1px solid #4e5166;
  padding-bottom: 3vh;
}

.actions {
  display: flex;
  justify-content: center;
}
</style>
