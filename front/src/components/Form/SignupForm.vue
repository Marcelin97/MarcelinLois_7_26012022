<template>
  <section class="container">
    <h1>{{ msg }}</h1>
    <p>
      Pour créer votre compte Groupomania, merci de remplir les champs suivants:
    </p>
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <fieldset>
        <legend>Inscription</legend>

        <!-- Le prénom -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="text"
                placeholder="Prénom"
                v-model.trim="v$.user.firstName.$model"
                ref="user.firstName"
                @blur="v$.user.firstName.$touch"
                :class="v$.user.firstName.$error === true ? 'error' : 'dirty'"
              />
              <!-- <div class="validation">Required</div> -->
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.firstName.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.firstName.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
          </div>
        </div>

        <!-- Le nom de famille -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="text"
                placeholder="Nom de famille"
                v-model.trim="v$.user.lastName.$model"
                ref="user.lastName"
                @blur="v$.user.lastName.$touch"
                :class="v$.user.lastName.$error === true ? 'error' : 'dirty'"
              />
              <!-- <div class="validation">Required</div> -->
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.lastName.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.lastName.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
          </div>
        </div>

        <!-- La date de naissance -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="date"
                placeholder="Date de naissance"
                v-model="v$.user.birthday.$model"
                ref="user.birthday"
                @blur="v$.user.birthday.$touch"
                :class="v$.user.birthday.$error === true ? 'error' : 'dirty'"
              />
              <!-- <div class="validation">Required</div> -->
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.birthday.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.birthday.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
          </div>
        </div>

        <!-- Le nom d'utilisateur -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                v-model.trim="v$.user.username.$model"
                ref="user.username"
                @blur="v$.user.username.$touch"
                :class="v$.user.username.$error === true ? 'error' : 'dirty'"
              />
              <!-- <div class="validation">Required</div> -->
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
          </div>
        </div>

        <!-- L'email -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="email"
                placeholder="E-mail"
                v-model.trim="v$.user.email.$model"
                ref="user.email"
                @blur="v$.user.email.$touch"
                :class="v$.user.email.$error === true ? 'error' : 'dirty'"
              />
              <!-- <div class="validation">Required</div> -->
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
          </div>
        </div>

        <!-- Le mot de passe -->
        <div>
          <div class="wrapper">
            <label>
              <input
                type="password"
                placeholder="Mot de passe"
                v-model="v$.user.password.$model"
                ref="user.password"
                @blur="v$.user.password.$touch"
                :class="v$.user.password.$error === true ? 'error' : 'dirty'"
              />
              <!-- <div class="validation">Required</div> -->
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
          </div>
        </div>
      </fieldset>

      <!-- Terms -->
      <div class="terms">
        <div class="conditions">J'accepte les termes et conditions.</div>
        <label class="labelCheckbox">
          <input
            class="inputCheckbox"
            type="checkbox"
            v-model="v$.user.terms.$model"
            true-value="yes"
            false-value="no"
            required
            ref="user.terms"
            @blur="v$.user.terms.$touch"
            :class="v$.user.terms.$error === true ? 'error' : 'dirty'"
          />
          <span class="checkbox"></span>
        </label>

        <!-- Error Message -->
        <template v-if="v$.user.terms.$dirty">
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.terms.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </template>
      </div>
      <!-- Terms -->

      <div class="submit">
        <button
          @click="login"
          class="btn"
          type="submit"
          title="Créer mon compte"
          value="Créer mon compte"
          :class="{'disable' :!validatedFields}"
        >
          Créer mon compte
        </button>

        <!-- success modal  -->

        <div class="row" v-if="submitStatus === 'OK'">
          <div class="modalbox success">
            <div class="modalContent">
              <div class="icon">
                <font-awesome-icon class="icon" :icon="['fas', 'check']" />
              </div>
              <h3 class="modal-header">Merci pour votre soumission!</h3>
              <p>
                Inscription réussi ! Connectez-vous pour accéder à votre
                compte<br />avec vos identifiants..
              </p>
              <span class="change">-- Bienvenue --</span>
            </div>
          </div>
          <!--/.success-->
        </div>

        <!-- <p class="typo__p" v-if="submitStatus === 'ERROR'">
          Veuillez remplir le formulaire correctement.
        </p> -->
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  maxLength,
  // helpers
} from "@vuelidate/validators";

// export function isUsernameAvailable(value) {
//   if (value === "") return true;
//   return new Promise(() => {
//     return axios
//       .get(process.env.VUE_APP_API_URL + "/api/auth/signup", this.user)
//       .then((response) => {
//         if (response.data.user.username) {
//           return true;
//         }
//       })
//       .catch((error) => {
//         if (
//           error.response.data.user.username[0] ==
//           "The username has already been taken."
//         ) {
//           return false;
//         }
//         return true;
//       });
//   });
// }

export function validName(value) {
  return /^[a-z0-9]+$/i.test(value);
}

export function strongPassword(value) {
  return (
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
      value
    ) &&
    // /[0-9]/.test(password) && //checks for 0-9
    // /\W|_/.test(password) && //checks for special char
    value.length >= 8
  );
}

// export function checkIsValid(val, event) {
//   if (val.$error) {
//     event.target.classList.add("form__input-shake");
//     setTimeout(() => {
//       event.target.classList.remove("form__input-shake");
//     }, 600);
//   }
// }

export default {
  name: "SignupForm",
  props: {
    msg: String,
  },
  setup() {
    let input = null;
    return input, { v$: useVuelidate() };
  },
  validationConfig: {
    $lazy: true,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitStatus: null,
      user: {
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        password: "",
        username: "",
        terms: false,
      },
    };
  },
  validations() {
    return {
      user: {
        firstName: { required, $autoDirty: true, $lazy: true },
        lastName: { required, $autoDirty: true, $lazy: true },
        birthday: { required, $autoDirty: true, $lazy: true },
        username: {
          required,
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
          // username_validation: {
          //   $validator: isUsernameAvailable,
          //   $message: "E-mail déjà utilisé",
          // },
          name_validation: {
            $validator: validName,
            $message: "Username can only contain numbers and letters",
          },
        },
        email: {
          required,
          $autoDirty: true,
          $lazy: true,
          email,
          minLength: minLength(5),
          maxLength: maxLength(60),
        },
        password: {
          required,
          $autoDirty: true,
          $lazy: true,
          // minLength: minLength(8),
          password_validation: {
            $validator: strongPassword,
            $message:
              "Entre 8 et 16 caractères, Une minuscule au moins, Une majuscule au moins, Un chiffre au moins, Un caractère spécial au moins (@&/!$ ...)",
            // $message: "Une minuscule au moins",
            // $message: "Une majuscule au moins",
            // $message: "Un chiffre au moins",
            // $message: "Un caractère spécial au moins (@&/!$ ...)",
          },
        },
        terms: { required, $autoDirty: true, $lazy: true },
      },
    };
  },
  computed: {
    validatedFields: function (){
      if(this.user.email != "" && this.user.firstName != "" && this.user.lastName != "" && this.user.birthday != "" && this.user.password != "" && this.user.username != "" && this.user.terms != true){
        return true;
      }else{
        return false;
      }
    }
  },
  methods: {
    async handleSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
        alert("Form failed validation");
        // change de status of the message
        // this.submitStatus = "ERROR";

        //
        this.$nextTick(() => {
          let domRect = document
            .querySelector(".error")
            .getBoundingClientRect();
          window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop
          );
        });
        // return;
      } else {
        // actually submit form
        // alert("Form successfully submitted");
        this.submitStatus = "OK";
        axios
          .post(process.env.VUE_APP_API_URL + "/api/auth/signup", this.user)
          .then((response) => {
            console.log(response);
            setTimeout(
              function () {
                this.$router.push("/login");
              }.bind(this),
              10000,
              this
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    login() {
      this.v$.$touch();
      console.warn(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 1.4rem;
    font-weight: bolder;
    margin: 4rem 1rem;
    line-height: 1.5rem;
    text-align: center;
  }

  p {
    font-size: 0.8rem;
    font-weight: lighter;
    line-height: 1.5rem;
    text-align: center;
  }
}

form {
  max-width: 420px;
  margin: 20px auto;
  text-align: left;
  padding: 20px;
}

legend {
  // margin-bottom: 50px;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
  color: #8de8fe;
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
  border: 1px solid #585858;
  color: #8de8fe;

  @media only screen and (min-width: 768px) {
    width: 25rem;
  }
}

.validation {
  position: absolute;
  bottom: 4rem;
  display: flex;
  align-items: center;
  height: 1.5rem;
  padding: 0 0.5rem;
  opacity: 0;
  transform: translateY(0.75rem);
  border-radius: 1.5rem;
  background: #fd4444;
  color: #f9f9f9;
  transition: all 0.35s;
}

.validation::after {
  content: "";
  position: absolute;
  left: 15px;
  bottom: -2px;
  width: 4px;
  height: 4px;
  transform: rotate(45deg);
  background: inherit;
}

// * CheckBox
.terms {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.conditions {
  margin-bottom: 15px;
}

label,
input {
  cursor: pointer;
}

.inputCheckbox {
  appearance: none;
  border: none;
  background: transparent;
  position: absolute;
  transform: scale(0);
}

.checkbox {
  display: block;
  width: 30px;
  height: 30px;
  border: 5px solid #e7e7e7;
  transition: all 0.35s;
}

input:checked ~ .checkbox {
  transform: rotate(45deg);
  width: 15px;
  border-color: #8de8fe;
  border-top-color: transparent;
  border-left-color: transparent;
}

// * error if input is invalid

.dirty {
  // border-color: #5a5;
  // background: #efe;
  border-color: #8de8fe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  background: #fdd;
  border-color: #fd4444;
  opacity: 0.7;
  animation: shake 0.2s;
  animation-iteration-count: 3;
}

.error:focus {
  outline-color: #f99;
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

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}

// * Submit
.submit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-basis: 100%;
}

// btn disabled
.disable {
      color:  rgba(255,255,255,0.3);
      background-color: rgba(255,255,255,0.1);
      cursor: default;
}

// success modal
.modalbox.success {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  padding: 50px 25px 15px;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  text-align: center;
}

.modalbox.success .icon {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  margin: 0 auto;
  background: #4caf50;
  height: 100px;
  width: 100px;
  border-radius: 25%;
}

.modalbox.success .icon span {
  position: absolute;
  font-size: 4em;
  color: #fff;
  text-align: center;
  padding-top: 20px;
}

/* Modal Content */
.modalContent {
  background-color: white;
  margin: auto;
  box-shadow: 0px 0px 5px #0ba710;
  padding: 20px;
  width: auto;
  border-top: 10px solid #4caf50;
  border-radius: 15px;
  overflow: auto;

  .modal-header {
    background-color: transparent;
    color: black;
    font-size: 20px;
    letter-spacing: 1px;
    margin-top: 30px;
  }

  p {
    background-color: transparent;
    color: black;
    margin-top: 30px;
  }

  .change {
    font-size: 10px;
    margin-top: 10px;
    color: #ccc;
    background-color: transparent;
  }
}
</style>
