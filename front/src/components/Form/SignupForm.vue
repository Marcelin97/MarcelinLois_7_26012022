<template>
  <section class="container">
    <h1>{{ msg }}</h1>
    <p>
      Pour créer votre compte Groupomania, merci de remplir les champs suivants:
    </p>
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <fieldset>
        <legend>Inscription</legend>
        <div>
          <div class="wrapper">
            <label>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                v-model="user.username"
              />
              <div class="validation">Required</div>
            </label>
          </div>
        </div>

        <div>
          <div class="wrapper">
            <label>
              <input
                type="email"
                v-model="user.email"
                placeholder="Entrer votre e-mail"
              />
              <div class="validation">Required</div>
            </label>
          </div>
          <div></div>
        </div>

        <div>
          <div class="wrapper">
            <label>
              <input
                type="password"
                v-model="user.password"
                placeholder="Entrer votre mot de passe"
              />
              <div class="validation">Required</div>
            </label>
          </div>

          <div v-if="passwordError" class="error">{{ passwordError }}</div>
        </div>
      </fieldset>

      <!-- Terms -->
      <div class="terms">
        <div class="conditions">I accept the terms and conditions.</div>
        <label class="labelCheckbox">
          <input
            class="inputCheckbox"
            type="checkbox"
            v-model="user.terms"
            true-value="yes"
            false-value="no"
            required
          />
          <span class="checkbox"></span>
        </label>
      </div>
      <!-- Terms -->

      <div class="submit">
        <button
          @click="login"
          class="btn"
          type="submit"
          title="Créer mon compte"
          value="Créer mon compte"
        >
          Créer mon compte
        </button>
      </div>
    </form>
    <p>Username: {{ username }}</p>
    <p>Email: {{ email }}</p>
    <p>Password: {{ password }}</p>
    <p>Terms: {{ terms }}</p>
  </section>
</template>
<script>
import axios from "axios"

export default {
  props: {
    msg: String,
  },
  setup() {
    let input = null;
    return input;
  },
  name: "SignupForm",
  data() {
    return {
      user: {
      email: "",
      password: "",
      username: "",
      terms: false,
      },

      passwordError: " ",
    };
  },
  methods: {
    handleSubmit() {
      // console.log("form submitted");
      // * valid password
      this.passwordError =
        this.user.password.length > 5 ? " " : "Entre 6 et 50 caractères";

      if (this.user.password.length > 5) {
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