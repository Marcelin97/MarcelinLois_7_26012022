<template>
  <div class="container">
    <h1>Créer mon compte</h1>
    <p>
      Pour créer votre compte Groupomania, merci de remplir les champs suivants:
    </p>
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <fieldset>
        <legend>Inscription</legend>
        <div>
          <div class="wrapper">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              required
              v-model="username"
            />
            <div class="validation">Required</div>
          </div>
          <div></div>
        </div>

        <div>
          <div class="wrapper">
            <input
              type="email"
              required
              v-model="email"
              placeholder="Entrer votre e-mail"
            />
            <div class="validation">Required</div>
          </div>
          <div></div>
        </div>

        <div>
          <div class="wrapper">
            <input
              type="password"
              required
              v-model="password"
              placeholder="Entrer votre mot de passe"
            />
            <div class="validation">Required</div>
          </div>

          <div v-if="passwordError" class="error">{{ passwordError }}</div>
        </div>
      </fieldset>
      <div class="terms">
        <div class="conditions">Accept terms and conditions</div>
        <label class="labelCheckbox">
          <input
            class="inputCheckbox"
            type="checkbox"
            v-model="terms"
            required
          />
          <span class="checkbox"></span>
        </label>
      </div>
      <div class="submit">
        <button @click="login"
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
  </div>
</template>
<script>
export default {
  setup(){
    let input =null;
// let input = ref(null);
return input
  },
  name: "SignupForm",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      terms: false,
      passwordError: " ",
    };
  },
  methods: {
    handleSubmit() {
      // console.log("form submitted");
      // * valid password
      this.passwordError =
        this.password.length > 5
          ? " "
          : "Entre 6 et 50 caractères"

          if (this.password.length > 5) {
            console.log("email:", this.email)
            console.log("email:", this.password)
            console.log("email:", this.terms)
            console.log("email:", this.username)
          }
    },
    login(){
      console.warn(this.form)
    }
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
    margin-bottom: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.1rem;
  }
  p {
    font-size: 0.8rem;
    font-weight: lighter;
    line-height: 1.5rem;
    letter-spacing: 0.1rem;
  }
}
form {
  max-width: 420px;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
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
  margin-top: 50px
}
input {
  width: 10 rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #585858;
  color: #8de8fe;
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
  animation: shake 0.1635s 0s 3;
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
  0%,
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
  align-items: center;
}
.conditions {
  margin-bottom: 10px;
}
.labelCheckbox {
  align-self: flex-end;
}
label,
input {
  cursor: pointer;
}

.inputCheckbox {
  appearance: none;
  border: none;
  background: transparent;
  position: relative;
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

// * Submit
.error{
  margin-top: 10px;
  color: #fd4444;
  font-size: 0.8em;
  font-weight: bold;
}
</style>