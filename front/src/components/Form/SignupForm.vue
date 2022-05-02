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
              />
              <div class="validation">Required</div>
            </label>

                      <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.user.firstName.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

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
              />
              <div class="validation">Required</div>
            </label>

                      <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.user.lastName.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>

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
              />
              <div class="validation">Required</div>
            </label>

                  <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.user.birthday.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>

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
              />
              <div class="validation">Required</div>
            </label>

                  <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.user.username.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>

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
                @change="v$.user.email.$touch"
                ref="user.email"
              />
              <div class="validation">Required</div>
            </label>

                  <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.user.email.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>

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
              />
              <div class="validation">Required</div>
            </label>

                  <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.user.password.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>

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
          />
          <span class="checkbox"></span>
        </label>

              <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.user.terms.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>

      </div>
      <!-- Terms -->

      <div class="submit">
        <button
          @click="login"
          class="btn"
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

export function validName(name) {
  let validNamePattern = new RegExp("/^[a-z0-9]+$/i");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
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
      // v$: useVuelidate(),
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
    // const alpha = helpers.regex(/^[a-zA-Z]*$/);

    return {
      user: {
        firstName: {required},
        lastName: { required },
        birthday: { required },
        username: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(25),
          // name_validation: {
          //   $validator: validName,
          //   $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
          // }
        },
        email: {
          required,
          email,
          minLength: minLength(5),
          maxLength: maxLength(60),
        },
        password: { required, minLength: minLength(8) },
        terms: { required },
      },
    };
  },
  methods: {
    async handleSubmit() {
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return;
      // actually submit form

      this.v$.$validate();

      if (!this.v$.$error) {
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
  border: 1px solid #585858;
  color: #8de8fe;
  @media only screen and (min-width: 768px) {
    width: 25rem;
  }
}
input:valid {
  border-color: #8de8fe;
}
input:invalid {
  border-color: #fd4444;
}
input:invalid ~ .validation {
  opacity: 1;
  transform: translateY(0);
}
input:invalid ~ .validation,
input:invalid {
  opacity: 1;
  transform: translateY(0);
  animation: shake 0.1635s;
}
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
.error {
  margin-top: 10px;
  color: #fd4444;
  font-size: 0.8em;
  font-weight: bold;
}

// * Submit
.submit {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>