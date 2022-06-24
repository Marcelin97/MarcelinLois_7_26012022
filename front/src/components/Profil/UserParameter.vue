<template>
  <section>
    <div class="container">
      <h1 class="title">Modifier mon profil</h1>

      <form @submit.prevent="updateAccountClick">
        <div class="form-group">
          <label for="first-name">Prénom</label>
          <input
            id="first-name"
            type="text"
            v-model="state.user.firstName"
            @blur="v$.user.firstName.$touch"
            :class="v$.user.firstName.$error === true ? 'error' : 'dirty'"
          />

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
          <!-- Error Message -->
        </div>

        <div class="form-group">
          <label for="last-name">Nom de famille</label>
          <input
            id="last-name"
            type="text"
            v-model="state.user.lastName"
            @blur="v$.user.lastName.$touch"
            :class="v$.user.lastName.$error === true ? 'error' : 'dirty'"
          />

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
          <!-- Error Message -->
        </div>

        <div class="form-group">
          <label for="birthday">Date de naissance</label>
          <input
            id="birthday"
            type="date"
            v-model="state.user.birthday"
            @blur="v$.user.birthday.$touch"
            :class="v$.user.birthday.$error === true ? 'error' : 'dirty'"
          />

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
          <!-- Error Message -->
        </div>

        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            v-model="state.user.username"
            @blur="v$.user.username.$touch"
            :class="v$.user.username.$error === true ? 'error' : 'dirty'"
          />

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

        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            id="email"
            type="email"
            v-model="state.user.email"
            @blur="v$.user.email.$touch"
            :class="v$.user.email.$error === true ? 'error' : 'dirty'"
          />

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

        <div class="form-group">
          <label for="newPassword">Mot de passe</label>
          <input
            id="newPassword"
            type="password"
            v-model="state.user.newPassword"
            @blur="v$.user.newPassword.$touch"
            :class="v$.user.newPassword.$error === true ? 'error' : 'dirty'"
          />

          <!-- Error Message -->
          <template v-if="v$.user.newPassword.$dirty">
            <div
              class="input-errors"
              v-for="(error, index) of v$.user.newPassword.$errors"
              :key="index"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </template>
          <!-- Error Message -->
        </div>

        <div class="form-group">
          <label for="userImage">Photo de profil</label>
          <input
            id="userImage"
            type="file"
            v-on:change="onChangeFileUpload()"
            ref="file"
            @blur="v$.user.userImage.$touch"
          />

          <!-- Error Message -->
          <!-- <template v-if="v$.user.userImage.$dirty">
            <div
              class="input-errors"
              v-for="(error, index) of v$.user.userImage.$errors"
              :key="index"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </template> -->
          <!-- Error Message -->
        </div>

        <div class="button-container">
          <button type="submit" class="button">
            Enregister les modifications
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
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

import usersApi from "../../api/users";

export function strongPassword(value) {
  return (
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
      value
    ) && value.length >= 8
  );
}

export default {
  name: "UpdateForm",
  setup() {
    const state = reactive({
      mode: "create",
      user: {
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        newPassword: "",
        username: "",
        userImage: "",
      },
      apiError: "",
    });

    const rules = computed(() => ({
      user: {
        firstName: {
          required: helpers.withMessage("Le prénom est obligatoire", required),
          $autoDirty: true,
          $lazy: true,
        },
        lastName: {
          required: helpers.withMessage("Le nom est obligatoire", required),
          $autoDirty: true,
          $lazy: true,
        },
        birthday: {
          required: helpers.withMessage(
            "La date d'anniversaire est obligatoire",
            required
          ),
          $autoDirty: true,
          $lazy: true,
        },
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
        newPassword: {
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
    async onChangeFileUpload() {
     this.userImage = this.$refs.file.files[0];
    },
    async updateAccountClick() {
      var bodyFormData = new FormData();
      bodyFormData.append("firstName", this.firstName);
      bodyFormData.append("lastName", this.lastName);
      bodyFormData.append("birthday", this.birthday);
      bodyFormData.append("email", this.email);
      bodyFormData.append("newPassword", this.newPassword);
      bodyFormData.append("username", this.username);
      bodyFormData.append("imageUrl", this.userImage);

      if (
        window.confirm(
          "Attention, vous êtes sur le point de modifier votre compte. Souhaitez-vous tout de même continuer ?"
        )
      ) {
        try {
          await usersApi.updateAccount(bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
          await this.$store.commit("logout");
          await this.$store.commit("setStatus", "logout");
          await this.$router.push("/");
        } catch (e) {
          console.error(e.data);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
}

.title {
  font-size: 1.4rem;
  font-weight: bolder;
  line-height: 1.4rem;
  color: #8de8fe;
  padding-bottom: 11px;
  border-bottom: 1px solid #d7dbdf;
}

form {
  padding: 20px;
}

.form-group {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  label {
    color: #374151;
    margin-bottom: 10px;
  }
}

input {
  width: 15rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #585858;
  color: #8de8fe;
  background-color: rgb(12, 19, 31);

  @media only screen and (min-width: 768px) {
    width: 25rem;
  }
}

label,
input {
  cursor: pointer;
}

.button {
  margin-top: 1rem;
  background: lighten(rgb(23, 23, 23), 1%);
  border: none;
  font-size: 12px;
  padding: 0.6rem 0.6rem;
  border-radius: 0.8rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: inset -3px -3px 3px rgba(white, 0.025),
    inset 3px 3px 5px rgba(black, 0.075), -3px -3px 5px rgba(white, 0.025),
    3px 3px 5px rgba(black, 0.05);
  &:hover {
    background: darken(rgb(12, 19, 31), 1%);
    box-shadow: inset -5px -5px 5px rgba(white, 0.01),
      inset 5px 5px 5px rgba(black, 0.1), -5px -5px 5px rgba(white, 0.015),
      5px 5px 5px rgba(black, 0.05);
  }
}

@media only screen and (min-width: 1024px) {
  .button-container {
    text-align: right;
  }

  .button {
    width: auto;
  }
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
</style>