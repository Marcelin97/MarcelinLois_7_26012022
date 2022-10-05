<template>
  <section class="container">
    <h1>{{ msg }}</h1>

    <div class="container-update">
      <h2 class="title">Modifier mon profil</h2>

      <form @submit.prevent="updateAccountClick" enctype="multipart/form-data">
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
          <label for="newPassword">Nouveau mot de passe</label>
          <input
            id="newPassword"
            type="newPassword"
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

        <div class="form-group fileUploadInput">
          <label for="userImage">Photo de profil</label>
          <input
            class="input-file"
            v-on="state.user.userImage"
            id="userImage"
            type="file"
            accept=".jpeg,.jpg,png"
            @change="onChangeFileUpload"
            ref="file"
          />

          <!-- Error Message -->
          <template v-if="v$.user.userImage.$dirty">
            <div
              class="input-errors"
              v-for="(error, index) of v$.user.userImage.$errors"
              :key="index"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </template>
          <!-- Error Message -->
        </div>

        <!-- button submit -->
        <div class="button-container">
          <button type="submit" class="btn">Modifier</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { minLength, email, maxLength, alphaNum } from "@vuelidate/validators";
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
  name: "Update-Profile",
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      test: "",
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
          $autoDirty: true,
          $lazy: true,
        },
        lastName: {
          $autoDirty: true,
          $lazy: true,
        },
        birthday: {
          $autoDirty: true,
          $lazy: true,
        },
        username: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
          alphaNum,
        },
        email: {
          $autoDirty: true,
          $lazy: true,
          email,
          minLength: minLength(5),
          maxLength: maxLength(60),
        },
        newPassword: {
          // $autoDirty: true,
          $lazy: true,
          password_validation: {
            $validator: strongPassword,
            $message:
              "Entre 8 et 16 caractères, Une minuscule au moins, Une majuscule au moins, Un chiffre au moins, Un caractère spécial au moins (@&/!$ ...)",
          },
        },
        userImage: {
          $autoDirty: true,
          $lazy: true,
        },
      },
    }));

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  validationConfig: {
    $lazy: true,
  },
  mounted() {
    this.state.user = this.$store.state.user;
  },
  methods: {
    onChangeFileUpload() {
      this.state.user.userImage = document.querySelector("#userImage").files[0];
    },
    updateAccountClick() {
      var bodyFormData = new FormData();
      if (this.state.user.userImage)
        bodyFormData.append("image", this.state.user.userImage);


      for (let key of [
        "firstName",
        "lastName",
        "birthday",
        "email",
        "newPassword",
        "username",
      ]) {
        const param = this.state.user[key];
        console.log(param, key);
        if (param) {
          bodyFormData.append(key, param);
        }
      }

      axiosInstance
        .patch("/auth/update", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log("result: ", result.data);
          this.$store.commit("updateUser", result.data);
          // alert("Vos modifications sont enregistrées");

          // success notification
          this.$notify({
            type: "success",
            title: `Profil mise à jour`,
            text: `Vous allez être redirigé vers votre profil.`,
          });

          // redirect to user page
          this.$router.push("/user");
        })
        .catch((err) => {
          console.log(err);

          const errorMessage = (this.apiErrors = err.response);
          this.errorMessage = errorMessage;

          // notification error message
          this.$notify({
            type: "error",
            title: `Erreur lors de la mise à jour de l'utilisateur'`,
            text: `Erreur reporté : ${errorMessage}`,
            duration: 30000,
          });
        });
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
    margin: 1rem 0 0 0;
  }
}

.container-update {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 0.8rem;
  text-align: center;
  margin: 1rem 0;
  line-height: 1.5rem;
  color: #95989a;
}

form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 1rem;
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

  @media only screen and (min-width: 576px) {
    width: 25rem;
  }
}

label,
input {
  cursor: pointer;
}

// file
.fileUploadInput {
  display: grid;
  grid-gap: 10px;
  position: relative;
  z-index: 1;
}

.fileUploadInput label {
  display: flex;
  align-items: center;
}

.fileUploadInput input {
  position: relative;
  z-index: 1;
  height: 50px;
  border: 1px solid #4e5166;
  border-radius: 0.4rem;
  color: #95989a;
}
.fileUploadInput input[type="file"] {
  padding: 0 gap(m);
}
.fileUploadInput input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
  margin-left: 10px;
  padding: 0;
  height: 50px;
  width: 0px;
}

// submit button
.button-container {
  margin-top: 2rem;
}
// error if input is invalid
.dirty {
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
  max-width: 15rem;
  @media only screen and (min-width: 576px) {
    max-width: 25rem;
  }
}
</style>