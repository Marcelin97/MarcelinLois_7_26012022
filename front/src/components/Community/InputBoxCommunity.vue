<template>
  <section class="form-input-box">
    <form
      @submit.prevent="createCommunityClick"
      class="community-form"
    >
      <!-- Post form header -->
      <div class="community-form-header">
        <div>
          <span>Crée une communauté</span>
        </div>
      </div>

      <!-- post form content -->
      <div class="community-form-content">
        <div class="community-form-top">
          <div class="community-form-file">
            <div>
              <div class="wrapper">
                <div class="split">
                  <div class="button">
                    <font-awesome-icon class="icon" :icon="['fas', 'upload']" />
                    Ajoute une image
                  </div>

                  <button class="split-button">
                    <font-awesome-icon
                      class="icon close btn-fas"
                      :icon="['fas', 'xmark']"
                    />
                  </button>

                  <div class="menu">
                    <button class="button">
                      <font-awesome-icon
                        class="icon close btn-fas"
                        :icon="['fas', 'file']"
                      />
                      <div>
                        <input
                          accept=".jpeg,.jpg,png"
                          @change="onChangeFileUpload"
                          ref="image"
                          class="image"
                          type="file"
                          id="image"
                          @blur="v$.community.image.$touch"
                          :class="
                            v$.community.image.$error === true
                              ? 'error'
                              : 'dirty'
                          "
                        />
                        <label class="community-form-label" for="image"></label>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="community-form-title">
            <textarea
              v-model="state.community.title"
              blur="v$.community.title.$touch"
              :class="v$.community.title.$error === true ? 'error' : 'dirty'"
              required
              minlength="3"
              maxlength="255"
              name="title"
              id="title"
              cols="30"
              rows="10"
              aria-label="Titre de votre communauté"
              placeholder="Titre de votre communauté ici..."
            ></textarea>
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
          </div>
        </div>
        <div class="holes-lower"></div>

        <div class="community-form-body">
          <div class="community-form-body-text">
            <textarea
              v-model="state.community.about"
              @blur="v$.community.about.$touch"
              :class="v$.community.about.$error === true ? 'error' : 'dirty'"
              name="about"
              id="about"
              rows="10"
              minlength="20"
              required
              aria-label="à propos de votre communauté"
              placeholder="Écrivez quelque chose à propos de votre communauté ici..."
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
          </div>
        </div>
      </div>

      <!-- post form footer -->
      <div>
        <button
          title="Crée une communauté"
          class="btn-form-new-community"
          type="submit"
          aria-label="Crée une communauté"
        >
          Crée une communauté
        </button>
      </div>
    </form>
  </section>
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
            "Le titre de la communauté est obligatoire",
            required
          ),
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
        },
        image: {
          required: helpers.withMessage("Une image est obligatoire", required),
          $autoDirty: true,
          $lazy: true,
        },
        about: {
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
      console.log("image upload", this.state.community.image);
    },
    createCommunityClick() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        var bodyFormData = new FormData();
        bodyFormData.append("title", this.state.community.title);
        bodyFormData.append("about", this.state.community.about);
        bodyFormData.append("image", this.state.community.image);
        // for (let value of bodyFormData.values()) {
        //   console.log(value);
        // }

        axiosInstance
          .post(
            "/community", bodyFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((result) => {
            console.log(result.data);

            // notification de succès
            this.$notify({
              type: "success",
              title: `Profil mise à jour`,
              text: `Vous allez être redirigé vers votre profil.`,
            });

            // force refresh page
            setTimeout(
              function () {
                this.$router.go(0)
              }.bind(this),
              1000,
              this
            );

            
          })
          .catch((err) => {
            console.log(err);
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

      // try {
      //   const response = await communityApi.createCommunity(formData);
      //   console.log(response)
      // } catch (error) {
      //   console.log(error)
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input-box {
  display: flex;
  justify-content: center;
}
.community-form {
  width: 280px;
  @media only screen and (min-width: 576px) {
    width: 380px;
  }
  @media only screen and (min-width: 768px) {
    width: 480px;
  }
}

.community-form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
}

// post form contents
.community-form-content {
  overflow: auto;
  // height: calc(100vh - var(-56px) - var(-72px));
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: rgb(23, 23, 23);
  overflow-wrap: break-word;
  overflow-wrap: anywhere;
}

.community-form-top {
  padding: 1rem 1rem;
  background: transparent;
}

.community-form-file {
  margin-bottom: 0.5rem;
}

.community-form-label {
  background: transparent;
  border: #3d3d3d;
  border-width: 2px;
  display: flex;
  flex-wrap: wrap;
}

.wrapper {
  position: relative;
  perspective: 1000px;
}

.split {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  border: 0;
  font-size: 0.875rem;
  background: #17181b;
  cursor: pointer;
}

.split-button {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: inherit;
  padding: 0;
  border: 0;
  font-size: 0.75rem;
  background: #08708a;
  color: #f7f7f7;
}

.button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 12rem;
  height: 3rem;
  padding-left: 1rem;
  border: 0;
  font-family: Poppins;
  text-align: left;
  background: transparent;
  outline: none;
}

.btn-fas {
  background: transparent;
}
.menu {
  position: absolute;
  z-index: 1;
  top: 3.5rem;
  right: 0;
  display: block;
  width: 100%;
  padding: 0.25rem 0 1rem;
  background: #08708a;
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
  transform: rotate3d(1, 0, 0, -90deg);
  transform-origin: 0% 0%;
  transition-property: transform, opacity, visibility;
  transition-duration: 0.35s;
}
.file {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.wrapper:hover .menu {
  visibility: visible;
  opacity: 1;
  transform: rotate3d(0, 0, 0, 0);
}

.wrapper:hover .close {
  transform: rotate(-45deg);
}

.community-form-title {
  overflow: hidden;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  textarea {
    min-height: 46px;
    max-height: 46px;
    font-weight: 700;
    font-size: 1.075rem;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    resize: none;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    //   white-space: nowrap;
    flex-basis: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
}
.holes-lower {
  position: relative;
  margin: 0.3rem;
  border-bottom: 1px dashed #292929;
  background: transparent;
}

.community-form-body {
  padding: 1rem 1rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  .community-form-body-text {
    background: transparent;
    textarea {
      min-height: 27px;
      max-height: 100px;
      height: 100% !important;
      background: transparent;
      border: none;
      outline: none;
      padding: 0.5rem;
      margin: 0;
      resize: none;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  }
}

.btn-form-new-community {
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
</style>
