<template>
  <div class="form-input-box">
    <h2>Crée une communauté</h2>
    <!-- form structure-->
    <form id="form" @submit.prevent="createCommunityClick">
      <!-- add file -->
      <div class="container">
        <div class="fileUploadInput">
          <label>✨ Ajouter une image</label>
          <input
            accept=".jpeg,.jpg,png"
            @change="onChangeFileUpload"
            ref="image"
            class="image"
            type="file"
            id="image"
            @blur="v$.community.image.$touch"
            :class="v$.community.image.$error === true ? 'error' : 'dirty'"
          />
          <button>🔗</button>
        </div>
      </div>

      <input
        class="form-title"
        id="name"
        type="text"
        placeholder="TITRE"
        required
        autocomplete="off"
        v-model="state.community.title"
        blur="v$.community.title.$touch"
        :class="v$.community.title.$error === true ? 'error' : 'dirty'"
        minlength="3"
        maxlength="255"
        aria-label="Titre de votre communauté"
      />
      <!-- Error Message -->
      <template v-if="v$.community.title.$dirty">
        <div
          class="input-errors"
          v-for="(error, index) of v$.community.title.$errors"
          :key="index"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </template>
      <!-- Error Message -->
      <textarea
        id="message"
        type="text"
        placeholder="À PROPOS de..."
        autocomplete="off"
        v-model="state.community.about"
        @blur="v$.community.about.$touch"
        :class="v$.community.about.$error === true ? 'error' : 'dirty'"
        minlength="10"
        required
        aria-label="à propos de votre communauté"
      ></textarea>
      <!-- Error Message -->
      <template v-if="v$.community.about.$dirty">
        <div
          class="input-errors"
          v-for="(error, index) of v$.community.about.$errors"
          :key="index"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </template>
      <!-- Error Message -->
      <button
        class="btn"
        id="submit"
        type="submit"
        value="CRÉE!"
        title="Crée une communauté"
        aria-label="Crée une communauté"
      >
        CRÉE!
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import axiosInstance from "../../services/api";
// import communityApi from "../../api/community";

export default {
  name: "InputBoxCommunity",
  setup() {
    const state = reactive({
      community: {
        title: "",
        image: "",
        about: "",
      },
      apiError: "",
    });

    const rules = computed(() => ({
      community: {
        title: {
          required: helpers.withMessage(
            "Le titre de la communauté est obligatoire.",
            required
          ),
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
        },
        image: {
          required: helpers.withMessage("Une image est obligatoire.", required),
          $autoDirty: true,
          $lazy: true,
        },
        about: {
          required: helpers.withMessage(
            "Une description aidera à comprendre l'objet de votre communauté.",
            required
          ),
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
  methods: {
    onChangeFileUpload() {
      this.state.community.image = document.querySelector("#image").files[0];
      // console.log("image upload", this.state.community.image);
    },
    createCommunityClick() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        let bodyFormData = new FormData();
        bodyFormData.append("title", this.state.community.title);
        bodyFormData.append("about", this.state.community.about);
        bodyFormData.append("image", this.state.community.image);
        // for (let value of bodyFormData.values()) {
        //   console.log(value);
        // }

        axiosInstance
          .post("/community", bodyFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("community", response.data)
            this.$emit("create-community",response.data);

            // notification de succès
            this.$notify({
              type: "success",
              title: `Communauté crée`,
              text: `Bravo vous venez de créer une nouvelle communauté.`,
            });

            // force refresh page
            // this.$router.go(0);
          })
          .catch((error) => {
            // console.log(error.response);
            const errorMessage = (this.apiError = error.response.data.error);
            this.errorMessage = errorMessage;

            // error notification
            this.$notify({
              type: "error",
              title: `❌ Erreur lors de l'inscription`,
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
.form-input-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 20px rgb(66 50 98 / 35%);
  margin: 0 auto 2rem auto;
  padding: 2rem;
  border-radius: 0.8rem;
  max-width: 400px;
  @media only screen and (min-width: 768px) {
    max-width: 580px;
  }
}

h2 {
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.5rem;
  color: #95989a;
}

#form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// file
.container {
  margin: 1rem auto;
}

.fileUploadInput {
  display: grid;
  grid-gap: 10px;
  position: relative;
  z-index: 1;
}

.fileUploadInput label {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

.fileUploadInput input {
  position: relative;
  z-index: 1;
  padding: 0 gap(m);
  width: 100%;
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
.fileUploadInput button {
  z-index: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 50px;
  width: 50px;
  line-height: 0;
  user-select: none;
  border: none;
  background-color: #4e5166;
  border-radius: 0 0.4rem 0.4rem 0;
  font-size: 1rem;
  font-weight: 800;
}

// form
.form-title::placeholder,
textarea::placeholder {
  font-size: 0.875em;
  color: #95989a;
}

.form-title {
  font-size: 0.875em;
  width: 100%;
  max-width: 20rem;
  height: 50px;
  padding: 0px 15px 0px 15px;
  background: transparent;
  outline: none;
  border: solid 1px #4e5166;
  border-radius: 0.4em 0.4rem 0 0;
  border-bottom: none;
  transition: all 0.3s ease-in-out;
}

textarea {
  width: 100%;
  max-width: 20rem;
  height: 110px;
  max-height: 110px;
  padding: 15px;
  background: transparent;
  outline: none;
  color: #726659;
  font-size: 0.875em;
  border: solid 1px #4e5166;
  transition: all 0.3s ease-in-out;
}

button#submit {
  width: 100%;
  max-width: 20rem;
  margin: 10px;
  font-size: 0.875em;
}

// error if input is invalid
.dirty:focus {
  border-color: #8e8;
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
