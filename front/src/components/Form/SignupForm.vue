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
              />
              <div class="validation">Required</div>
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.firstName.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.firstName.$silentErrors"
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
              />
              <div class="validation">Required</div>
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.lastName.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.lastName.$silentErrors"
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
              />
              <div class="validation">Required</div>
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.birthday.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.birthday.$silentErrors"
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
              />
              <div class="validation">Required</div>
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.username.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.username.$silentErrors"
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
              />
              <div class="validation">Required</div>
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.email.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.email.$silentErrors"
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
              />
              <div class="validation">Required</div>
            </label>

            <!-- Error Message -->
            <template v-if="v$.user.password.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.user.password.$silentErrors"
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
        <div class="conditions">I accept the terms and conditions.</div>
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
          />
          <span class="checkbox"></span>
        </label>

        <!-- Error Message -->
        <template v-if="v$.user.terms.$dirty">
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.terms.$silentErrors"
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
          class="btn disable"
          type="submit"
          title="Créer mon compte"
          value="Créer mon compte"
          :disabled="v$.user.$invalid"
        >
          Créer mon compte
        </button>
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

// export function validName(value) {
//   let validNamePattern = new RegExp("/^[a-z0-9]+$/i");
//   if (validNamePattern.test(value)) {
//     return true;
//   }
//   return false;
// }

export function isEmailAvailable(value) {
  if (value === "") return true;

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(value.length > 5);
  //   }, 500);
  // });
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
          // name_validation: {
          //   $validator: validName,
          //   $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
          // }
        },
        email: {
          required,
          $autoDirty: true,
          $lazy: true,
          email,
          minLength: minLength(5),
          maxLength: maxLength(60),
          // email_validation: {
          //   $validator: isEmailAvailable,
          //   $message:
          //     "E-mail déjà utilisé et qui doit avoir un minimum de 5 caractères.",
          // },
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
  methods: {
    // status(validation) {
    //   return {
    //     error: validation.$error,
    //     dirty: validation.$dirty,
    //   };
    // },
    async handleSubmit() {
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return;
      // actually submit form

      if (this.v$.$error) {
        // 5. Focus the input with the error
        // this.$refs[input].focus();

        // 6. Break out of the loop
        // break;
      } else {
              alert("Form successfully submitted");
        axios
          .post(process.env.VUE_APP_API_URL + "/api/auth/signup", this.user)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    login() {
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
  // margin-bottom: 50px;
  display: flex;
  flex-direction: column;
}
.wrapper {
  position: relative;
  margin-top: 50px;
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
// input:valid {
//   border-color: #8de8fe;
// }
// input:invalid {
//   border-color: #fd4444;
// }
// input:invalid ~ .validation {
//   opacity: 1;
//   transform: translateY(0);
// }
// input:invalid ~ .validation,
// input:invalid {
//   opacity: 1;
//   transform: translateY(0);
//   animation: shake 0.1635s;
// }
.validation {
  position: absolute;
  bottom: 3rem;
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
  border-color: #5a5;
  background: #efe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  border-color: red;
  background: #fdd;
  animation: shake 0.1635s;
}

.error:focus {
  outline-color: #f99;
}

// * Submit
.submit {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>