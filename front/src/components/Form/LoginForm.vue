<template>
  <section class="card">
    <div>
      <div>
        <h1>{{ msg }}</h1>
        <div class="container">
          <form action="#" method="post" @submit.prevent="handleSubmit">

            <div class="FormGroup">
              <label class="FormGroupLabel" for="">User</label>
              <div class="FormTextboxWrapper">
                <input
                  class="FormTextbox"
                  type="text"
                  placeholder="E-mail"
                  v-model.trim="v$.user.email.$model"
                />
                <span class="FormTextboxIcon">
                  <font-awesome-icon :icon="['fas', 'user']" />
                </span>
              </div>
            </div>

            <div class="FormGroup">
              <label class="FormGroupLabel" for="">Pass</label>
              <div class="FormTextboxWrapper">
                <input
                  class="FormTextbox"
                  type="password"
                  placeholder="Mot de passe"
                  v-model.trim="v$.user.password.$model"
                />
                <span class="FormTextboxIcon">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </span>
              </div>
            </div>

            <button class="btn button">Login</button>

          </form>
        </div>
      </div>
      <div class="signup">
        <p class="text-signup">Pas encore inscrit ?</p>
        <div class="actions">
          <router-link class="nav btn button" to="/signup"
            >Créer un compte</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";


export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
    data() {
    return {
      // v$: useVuelidate(),
      // submitStatus: null,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleSubmit(){
      const response = await axios.post(process.env.VUE_APP_API_URL + "/api/auth/login", this.user)
    }
  }
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
</style>

