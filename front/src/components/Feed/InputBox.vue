<template>
  <div class="container">
    <div class="form-input-box">
      <h2>Publication</h2>

      <!-- form structure-->
      <form
        id="form"
        @submit.prevent="createPostClick"
        enctype="multipart/form-data"
      >
        <!-- add file -->
        <div class="container__file">
          <div class="fileUploadInput">
            <label>✨ Ajouter une image</label>
            <input
              accept=".jpeg,.jpg,.png"
              @change="onChangeFileUpload"
              ref="image"
              class="image"
              type="file"
              id="image"
              @blur="v$.post.image.$touch"
              :class="v$.post.image.$error === true ? 'error' : 'dirty'"
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
          v-model="state.post.title"
          blur="v$.post.title.$touch"
          :class="v$.post.title.$error === true ? 'error' : 'dirty'"
          minlength="3"
          maxlength="255"
          aria-label="Titre de votre post"
        />

        <!-- Error Message -->
        <template v-if="v$.post.title.$dirty">
          <div
            class="input-errors"
            v-for="(error, index) of v$.post.title.$errors"
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
          v-model="state.post.content"
          @blur="v$.post.content.$touch"
          :class="v$.post.content.$error === true ? 'error' : 'dirty'"
          minlength="2"
          maxlength="400"
          required
          aria-label="description de votre publication"
        ></textarea>

        <!-- Error Message -->
        <template v-if="v$.post.content.$dirty">
          <div
            class="input-errors"
            v-for="(error, index) of v$.post.content.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </template>
        <!-- Error Message -->

        <div class="select">
          <select v-model="state.community.id">
            <option selected disabled value="">
              {{ placeholder }}
            </option>
            <option
              v-for="(community, index) in communities"
              :community="community"
              :key="index"
            >
              {{ community.id }} - {{ community.title }}
            </option>
          </select>
        </div>
        <!-- <div class="select__choice">Communauté choisi: {{ state.community.id }}</div> -->

        <!-- Error Message -->
        <template v-if="v$.community.id.$dirty">
          <div
            class="input-errors"
            v-for="(error, index) of v$.community.id.$errors"
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
          title="Crée un post"
          aria-label="Crée un post"
        >
          CRÉE!
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, required, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import axiosInstance from "../../services/api";

export default {
  name: "InputBox-Post",
  setup() {
    const state = reactive({
      post: {
        title: "",
        image: "",
        content: "",
      },
      community: {
        id: "",
      },
    });

    const rules = computed(() => ({
      post: {
        title: {
          required: helpers.withMessage(
            "Le titre du post est obligatoire.",
            required
          ),
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
        },
        image: {
          // required: helpers.withMessage("Une image est obligatoire.", required),
          $autoDirty: true,
          $lazy: true,
        },
        content: {
          required: helpers.withMessage(
            "Un text aidera à comprendre votre publication.",
            required
          ),
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(2),
          maxLength: maxLength(400),
        },
      },
      community: {
        id: {
          required: helpers.withMessage(
            "Votre publication doit appartenir à une communauté.",
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
  data() {
    return {
      apiErrors: "",
      communities: [], // add communities  array
      selectValue: "",
      placeholder: "Choisi une communauté",
    };
  },
  created() {
    axiosInstance
      .get("/community/readAllCommunities")
      .then((response) => {
        this.communities = response.data.datas;
        // console.log(this.communities)
      })
      .catch((error) => {
        if (error.response.status == 404) {
          const errorMessage = (this.apiErrors = "Communauté introuvable !");
          this.errorMessage = errorMessage;
        }
      });
  },
  methods: {
    onChangeFileUpload() {
      this.state.post.image = document.querySelector("#image").files[0];
      // console.log("image upload", this.state.post.image);
    },
    createPostClick() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if no errors
        var bodyFormData = new FormData();
        bodyFormData.append("title", this.state.post.title);
        bodyFormData.append("content", this.state.post.content);
        bodyFormData.append("image", this.state.post.image);
        bodyFormData.append("communityId", this.state.community.id);
        // for (let value of bodyFormData.values()) {
        //   console.log(value);
        // }

        axiosInstance
          .post("/posts", bodyFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            // notification de succès
            this.$notify({
              type: "success",
              title: `Publication crée`,
              text: `Initialisation...`,
            });

            // force refresh page
            setTimeout(
              function () {
                this.$router.go(0);
              }.bind(this),
              1000,
              this
            );
          })
          .catch((error) => {
            console.log(error.response);
            const errorMessage = (this.apiErrors = error.response.data.error);
            this.errorMessage = errorMessage;

            // error notification
            this.$notify({
              type: "error",
              title: `❌ Erreur lors de la publication`,
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
.container {
  &__file {
    margin: 1rem auto;
  }
}
.form-input-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 20px rgb(66 50 98 / 35%);
  margin: 0 auto 2rem auto;
  padding: 2rem;
  border-radius: 0.8rem;
  @media only screen and (min-width: 768px) {
    width: 580px;
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

// File
.fileUploadInput {
  display: grid;
  grid-gap: 10px;
  position: relative;
  z-index: 1;
  margin: 1rem 0;
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

/* <select> styles */
select {
  appearance: none;
  border: 0;
  outline: 0;
  width: 20rem;
  height: 3rem;
  padding: 0 4em 0 1em;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  background-color: #34495e;
  cursor: pointer;
  /* <option> colors */
  option {
    color: inherit;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
}

/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  border-radius: 0.25em;
  overflow: hidden;
  margin: 1rem 0 0.5rem 0;
}

/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background-color: #34495e;
  transition: 0.25s all ease;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
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
