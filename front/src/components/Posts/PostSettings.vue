<template>
  <section class="container">
    <h1>{{ msg }}</h1>

    <div class="container-update">
      <h2 class="title">Modifier la publication</h2>

      <form @submit.prevent="updateAccountClick" enctype="multipart/form-data">
        <div class="form-group">
          <label for="title">Nouveau titre de la publication</label>
          <input
            placeholder="TITRE"
            autocomplete="off"
            minlength="3"
            maxlength="255"
            aria-label="Titre de votre post"
            id="title"
            type="text"
            v-model="state.post.title"
            @blur="v$.post.title.$touch"
            :class="v$.post.title.$error === true ? 'error' : 'dirty'"
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
        </div>

        <div class="form-group">
          <label for="content">Nouvelle description de la publication</label>
          <input
            id="content"
            type="text"
            placeholder="À PROPOS de..."
            minlength="2"
            maxlength="400"
            aria-label="description de votre publication"
            v-model="state.post.content"
            @blur="v$.post.content.$touch"
            :class="v$.post.content.$error === true ? 'error' : 'dirty'"
          />

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
        </div>

        <div class="form-group">
          <label for="PostImage">Nouvelle photo de la publication</label>
          <input
            class="input-file"
            v-on="state.post.image"
            id="image"
            type="file"
            accept=".jpeg,.jpg,png"
            @change="onChangeFileUpload"
            ref="file"
          />

          <!-- Error Message -->
          <template v-if="v$.post.image.$dirty">
            <div
              class="input-errors"
              v-for="(error, index) of v$.post.image.$errors"
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
import { minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axiosInstance from "../../services/api";

export default {
  name: "Update-Profile",
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      post: {
        title: "",
        image: "",
        content: "",
      },
    });

    const rules = computed(() => ({
      post: {
        title: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
        },
        image: {
          $autoDirty: true,
          $lazy: true,
        },
        content: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(2),
          maxLength: maxLength(400),
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
      postId: "",
      apiError: "",
    };
  },
  mounted() {
    this.postId = this.$route.params.id;
  },
  methods: {
    onChangeFileUpload() {
      this.state.post.image = document.querySelector("#postImage").files[0];
    },
    updateAccountClick() {
      var bodyFormData = new FormData();
      if (this.state.post.image)
        bodyFormData.append("image", this.state.post.image);

      for (let key of ["title", "content"]) {
        const param = this.state.post[key];
        console.log(param, key);
        if (param) {
          bodyFormData.append(key, param);
        }
      }

      axiosInstance
        .patch(`/posts/${this.postId}/update`, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log("result: ", result.data);
          // alert("Vos modifications sont enregistrées");

          // notification de succès
          this.$notify({
            type: "success",
            title: `Post mis à jour`,
            text: `Vous allez être redirigé vers le fil d'actualité.`,
          });

          // redirect to the feed
          this.$router.push("/wall");
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