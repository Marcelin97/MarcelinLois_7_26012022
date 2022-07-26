<template>
  <section class="container">
    <h1>{{ msg }}</h1>
    <p>
      Pour créer votre compte Groupomania, merci de remplir les champs suivants:
    </p>

    <!-- gestion erreur API avec axios -->
    <div v-if="this.state.apiError != ''" class="error-api">
      Il y a une erreur dans le formulaire <br />
      {{ this.state.apiError }}
    </div>
    <!-- gestion erreur API avec axios -->

    <form action="#" method="post" @submit.prevent="createAccount">
      <fieldset>
        <legend>Inscription</legend>

        <!-- Le nom d'utilisateur -->
        <div>
          <div class="wrapper">
            <label>
              <input type="text" placeholder="Nom d'utilisateur" v-model="state.user.username" ref="user.username"
                @blur="v$.user.username.$touch" :class="v$.user.username.$error === true ? 'error' : 'dirty'" />
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.username.$dirty">
              <div class="input-errors" v-for="(error, index) of v$.user.username.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>
        </div>

        <!-- L'email -->
        <div>
          <div class="wrapper">
            <label>
              <input type="email" placeholder="E-mail" v-model="state.user.email" ref="user.email"
                @blur="v$.user.email.$touch" :class="v$.user.email.$error === true ? 'error' : 'dirty'" />
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.email.$dirty">
              <div class="input-errors" v-for="(error, index) of v$.user.email.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>
        </div>

        <!-- Le mot de passe -->
        <div>
          <div class="wrapper">
            <label>
              <input type="password" placeholder="Mot de passe" v-model="state.user.password" ref="user.password"
                @blur="v$.user.password.$touch" :class="v$.user.password.$error === true ? 'error' : 'dirty'" />
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.password.$dirty">
              <div class="input-errors" v-for="(error, index) of v$.user.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>
        </div>
      </fieldset>

      <!-- bouton de soumission -->
      <div class="submit">
        <button type="submit" title="Créer mon compte" aria-label="Créer mon compte">
          <span class="btn" v-if="!this.v$.$error">Créer mon compte</span>
          <span class="btn" v-else>Création en cours...</span>
        </button>
        <!-- bouton de soumission -->
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
  </section>
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
import axiosInstance from "../../services/api";

export function strongPassword(value) {
  return (
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
      value
    ) && value.length >= 8
  );
}

export default {
  name: "SignupForm",
  components: {
    modalStructure,
  },
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      mode: "create",
      user: {
        email: "",
        password: "",
        username: "",
      },
      apiError: "",
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
    createAccount() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        // alert("Form successfully submitted.");
        axiosInstance
          .post("/auth/signup", this.state.user)
          .then((result) => {
            // console.log(result.data);
            this.state.user = result.data;
            // console.log(this.state.user);
            
            // open success modal
            this.$refs.signupUser.openModal();

            // and redirect to the login page
            setTimeout(
              function () {
                this.$router.push("/login");
              }.bind(this),
              3000,
              this
            );
          })
          .catch((error) => {
            // console.log(error.response.data.error.errors[0].message);
            const errorMessage = (this.state.apiError =
              error.response.data.error.errors[0].message);

            // error notification
            this.$notify({
              type: "error",
              title: `Erreur lors de l'inscription`,
              text: `Erreur reporté : ${errorMessage}`,
            });
          });
      } else {
        // error notification
        this.$notify({
          type: "warn",
          title: `📝 Veuillez remplir le formulaire correctement`,
        });

        // shows errors on screen
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
.error-api{
  color: #cc0033;
  text-align: center;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin: 2rem 0 0;
    font-weight: bold;
    letter-spacing: 0.3rem;
    font-size: 1.4rem;
    font-weight: bolder;
    line-height: 1.4rem;
    text-align: center;
    // margin: 4rem 1rem;
    border-bottom: 1px solid hsla(0deg, 0%, 100%, 0.1);
    padding-bottom: 3vh;
  }

  p {
    font-size: 0.8rem;
    font-weight: lighter;
    text-align: center;
    margin: 2rem 0;
    line-height: 1.5rem;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
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
  letter-spacing: 0.1rem;
  color: #ffff;
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
  background-color: black;

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
  background: #fdd;
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
</style>
