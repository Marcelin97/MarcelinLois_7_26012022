<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p>
      Pour créer votre compte Groupomania, merci de remplir les champs suivants:
    </p>

    <!-- gestion erreur API avec axios -->
    <div v-if="this.state.apiErrors != ''" class="error-api">
      Il y a une erreur dans le formulaire <br />
      {{ this.state.apiErrors }}
    </div>
    <!-- gestion erreur API avec axios -->

    <!-- Registration Form -->
    <form action="#" method="post" @submit.prevent="createAccount">
      <fieldset>
        <legend>Inscription</legend>

        <!-- Username -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                v-model="state.user.username"
                ref="user.username"
                @blur="v$.user.username.$touch"
                :class="v$.user.username.$error === true ? 'error' : 'dirty'"
              />
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.username.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.username.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>
        </div>

        <!-- Email -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="email"
                placeholder="E-mail"
                v-model="state.user.email"
                ref="user.email"
                @blur="v$.user.email.$touch"
                :class="v$.user.email.$error === true ? 'error' : 'dirty'"
              />
            </label>

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
        </div>

        <!-- Password -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="password"
                placeholder="Mot de passe"
                v-model="state.user.password"
                ref="user.password"
                @blur="v$.user.password.$touch"
                :class="v$.user.password.$error === true ? 'error' : 'dirty'"
              />
            </label>

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
        </div>
      </fieldset>

      <!-- BTN submit -->
      <div class="submit">
        <button
          type="submit"
          title="Créer mon compte"
          aria-label="Créer mon compte"
        >
          <span class="btn" v-if="!this.v$.$error">Créer mon compte</span>
          <span class="btn" v-else>Création en cours...</span>
        </button>
      </div>
    </form>

    <!-- success modal  -->
    <modalStructure ref="signupUser">
      <template v-slot:header>
        <h1>📝 Merci pour votre soumission!</h1>
      </template>

      <template v-slot:body>
        <p>
          Inscription réussi ! Connectez-vous pour accéder à votre compte avec
          vos identifiants..
        </p>
      </template>
    </modalStructure>
    <!-- success modal -->
  </div>
</template>

<script>
import modalStructure from "../Modal/ModalStructure.vue";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  minLength,
  email,
  maxLength,
  alphaNum,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

// API requests
import axiosInstance from "../../services/api";

// Check strong password in front application
export function strongPassword(value) {
  return (
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
      value
    ) && value.length >= 8
  );
}

export default {
  name: "Signup-Form",
  components: {
    modalStructure,
  },
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      user: {
        email: "",
        password: "",
        username: "",
      },
      apiErrors: [],
      showModal: false,
    });

    const rules = computed(() => ({
      user: {
        username: {
          required: helpers.withMessage(
            "Le nom d'utilisateur est obligatoire",
            required
          ),
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
          alphaNum,
        },
        email: {
          required: helpers.withMessage("L'/email est obligatoire", required),
          $autoDirty: true,
          $lazy: true,
          email,
          minLength: minLength(5),
          maxLength: maxLength(60),
        },
        password: {
          required: helpers.withMessage(
            "Le mot de passe est obligatoire",
            required
          ),
          $autoDirty: true,
          $lazy: true,
          password_validation: {
            $validator: strongPassword,
            $message:
              "Entre 8 et 16 caractères, Une minuscule au moins, Une majuscule au moins, Un chiffre au moins, Un caractère spécial au moins (@&/!$ ...)",
          },
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
    // CREATE ACCOUNT
    async createAccount() {
      const isFormCorrect = await this.v$.$validate(); // Checks all inputs

      if (isFormCorrect) { // if ANY fail validation
        axiosInstance
          .post("/auth/signup", this.state.user)
          .then(() => {
            // open success modal
            this.$refs.signupUser.openModal();

            // Redirect to the login page
            setTimeout(() => this.$router.push("/login"), 2500);
          })
          .catch((error) => {
            // console.log(error.response.data.error.errors[0].message);
            this.state.apiErrors = error.response.data.error.errors[0].message;

            // Error notification
            this.$notify({
              type: "error",
              title: `Erreur lors de l'inscription`,
              text: `Erreur reporté : ${this.apiErrors}`,
            });
          });
      } else {
        // Error notification
        this.$notify({
          type: "warn",
          title: `📝 Veuillez remplir le formulaire correctement`,
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.4rem;
    line-height: 1.4rem;
    letter-spacing: 0.3rem;
    font-weight: bolder;
    text-align: center;
    margin: 2rem 0 0;
    border-bottom: 1px solid #4e5166;
    padding-bottom: 3vh;
  }

  p {
    font-size: 0.8rem;
    font-weight: 700;
    text-align: center;
    margin: 2rem 0;
    line-height: 1.5rem;
    border-bottom: 1px solid #4e5166;
    padding-bottom: 3vh;
  }
}

form {
  margin: 20px auto;
  text-align: center;
  padding: 20px;
}

legend {
  line-height: 1.5rem;
}

fieldset {
  display: flex;
  flex-direction: column;
}

.wrapper {
  position: relative;
  margin-top: 30px;
}

input {
  width: 15rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.3rem;
  border: none;
  color: #ffff;
  background-color: #4e5166;

  @media only screen and (min-width: 400px) {
    width: 18rem;
  }

  @media only screen and (min-width: 768px) {
    width: 25rem;
  }
}

// action buttons
button {
  background: inherit;
  border: none;
}
.submit {
  margin-top: 30px;
}

// * error if input is invalid
.dirty {
  outline-color: rgb(255, 255, 255);
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  border-color: #fd4444;
  animation: shake 0.2s;
  animation-iteration-count: 3;
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
}

@keyframes shake {
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(8px);
  }

  75% {
    transform: translateX(-8px);
  }
}

// Api error message
.error-api {
  color: #cc0033;
  text-align: center;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}
</style>
