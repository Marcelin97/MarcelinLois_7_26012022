<template>
  <section class="container">
    <h1>{{ msg }}</h1>

    <div class="container-update">
      <h2 class="title">Modifier la communauté</h2>

      <form @submit.prevent="updateAccountClick" enctype="multipart/form-data">
        <div class="form-group">
          <label for="title">Nouveau titre de la communauté</label>
          <input
            id="title"
            type="text"
            v-model="state.community.title"
            @blur="v$.community.title.$touch"
            :class="v$.community.title.$error === true ? 'error' : 'dirty'"
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
        </div>

        <div class="form-group">
          <label for="about">Nouvelle description de la communauté</label>
          <input
            id="about"
            type="text"
            v-model="state.community.about"
            @blur="v$.community.about.$touch"
            :class="v$.community.about.$error === true ? 'error' : 'dirty'"
          />

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

        <div class="form-group">
          <label for="communityImage">Nouvelle photo de la communauté</label>
          <input
            class="input-file"
            v-on="state.community.communityImage"
            id="communityImage"
            type="file"
            accept=".jpeg,.jpg,png"
            @change="onChangeFileUpload"
            ref="file"
          />

          <!-- Error Message -->
          <template v-if="v$.community.communityImage.$dirty">
            <div
              class="input-errors"
              v-for="(error, index) of v$.community.communityImage.$errors"
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
import { minLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axiosInstance from "../../services/api";

export default {
  name: "Update-Profile",
  props: {
    msg: String,
  },
  data() {
    return {
      community: [],
      communityId: "",
    };
  },
  setup() {
    const state = reactive({
      community: {
        title: "",
        about: "",
        communityImage: "",
      },
      apiError: "",
    });

    const rules = computed(() => ({
      community: {
        title: {
          $autoDirty: true,
          $lazy: true,
        },
        about: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
        },

        communityImage: {
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
    this.communityId = this.$route.params.id;
  },
  methods: {
    onChangeFileUpload() {
      this.state.community.communityImage =
        document.querySelector("#communityImage").files[0];
    },
    updateAccountClick() {
      var bodyFormData = new FormData();
      bodyFormData.append("title", this.state.community.title);
      bodyFormData.append("about", this.state.community.about);
      bodyFormData.append("image", this.state.community.communityImage);
      // for (let value of bodyFormData.values()) {
      //   console.log(value);
      // }

      axiosInstance
        .patch(`/community/updateCommunity/${this.communityId}`, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log("result: ", result);
          // alert("Vos modifications sont enregistrées");

          // notification de succès
          this.$notify({
            type: "success",
            title: `Communauté mise à jour`,
            text: `Vous allez être redirigé vers la communauté.`,
          });

          // redirect to the community page
          this.$router.push(`/communities/profil/${this.communityId}`); 
        })
        .catch((err) => {
          console.log(err);
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
    margin: 2rem 0 0;
    border-bottom: 1px solid #95989a;
    padding-bottom: 3vh;
  }
}

.container-update {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 1.3rem;
  line-height: 1.3rem;
  font-weight: lighter;
  text-align: center;
  margin: 2rem 0 0;
  border-bottom: 1px solid #95989a;
  padding-bottom: 3vh;
}

form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
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

  @media only screen and (min-width: 576px) {
    width: 25rem;
  }
}

label,
input {
  cursor: pointer;
}

.input-file {
  border: none;
  background: transparent;
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