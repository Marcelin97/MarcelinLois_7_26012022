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
                  v-model.trim="user.email"
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
            </div>

            <div class="FormGroup">
              <label class="FormGroupLabel" for="">Pass</label>
              <div class="FormTextboxWrapper">
                <input
                  class="FormTextbox"
                  type="password"
                  placeholder="Mot de passe"
                  v-model.trim="user.password"
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
            </div>

            <!-- gestion erreur avec axios -->
            <div
              class="form-row error-msg"
              v-if="mode == 'login' && status == 'error_login'"
            >
              Adresse mail et/ou mot de passe invalide
            </div>

            <!-- gestion erreur de l'API -->
            <div
              class="typo__p"
              v-if="mode == 'login' && status == 'error_login'"
            >
              <h3 class="error-msg">Erreur de l'API</h3>
              <p class="error-msg">{{ apiError }}</p>
            </div>

            <button
              @click="login"
              class="btn button"
              :class="{ disable: !emptyFields }"
            >
              <span v-if="status == 'loading'">Connexion en cours...</span>
              <span v-else>Connexion</span>
            </button>
          </form>
        </div>
      </div>

      <div class="signup">
        <p class="text-signup">Pas encore inscrit ?</p>
        <div class="actions">
          <router-link class="nav btn button" to="/signup">
            Créer un compte
          </router-link>
        </div>
      </div>
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

export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
  data() {
    return {
      mode: "login",
      v$: useVuelidate(),
      // submitStatus: null,
      apiError: null,
      user: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
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
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/wall");
      return;
    }
  },
  computed: {
    emptyFields: function () {
      if (this.user.email != "" && this.user.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", this.user);
        await this.$router.push("/user");
      } catch (error) {
        this.apiError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
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

// btn disabled
.disable {
  color: rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  cursor: default;
}

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}
</style>

