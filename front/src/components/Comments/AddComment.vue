<template>
  <div aria-labelledby="comments-title">
    <!-- Form create comment -->
    <form @submit.stop.prevent="onSubmit">
      <div class="form-content">
        <textarea
          aria-label="Ajouter un commentaire..."
          autocomplete="off"
          v-model="state.content"
          @blur="v$.content.$touch"
          :class="v$.content.$error === true ? 'error' : 'dirty'"
          name="content"
          type="text"
          class="form-content__input"
          id="content"
          rows="2"
          :placeholder="'Commenter en tant que' + ' ' + currentUser.username"
        />

        <!-- Error Message -->
        <template v-if="v$.content.$dirty">
          <div v-for="(error, index) of v$.content.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </template>
        <!-- Error Message -->
      </div>
      <div>
        <!-- BTN submit comment -->
        <button
          type="submit"
          class="btn-comment"
          title="Commenter"
          text="Commenter"
        >
          Publier
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "New-Comment",
  emits: ["add-comment"],
  data() {
    return {
      currentUser: [],
    };
  },
  setup() {
    const state = reactive({
      content: "",
    });

    const rules = computed(() => ({
      content: {
        $autoDirty: true,
        $lazy: true,
        minLength: helpers.withMessage(
          "Ce champ doit être long d'au moins 5",
          minLength(5)
        ),
        maxLength: helpers.withMessage(
          "La longueur maximale autorisée est de 255",
          maxLength(255)
        ),
      },
    }));

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  validationConfig: {
    $lazy: true,
  },
  mounted() {
    // I assign data to the user array
    this.currentUser = this.$store.state.user;
  },
  methods: {
    onSubmit() {
      this.$emit("add-comment", { content: this.state.content });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  border-top: 1px solid rgb(239, 239, 239);
  display: flex;
  flex-direction: row;
  margin: 0;
  padding-top: 0.5rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__input {
    width: 100%;
    border: none;
    resize: none;
  }
}

.btn-comment {
  opacity: 0.3;
  color: rgb(0, 149, 246);
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  text-overflow: ellipsis;
  width: auto;
  background: transparent;
}

// error if input is invalid
.dirty:focus {
  outline: none;
}

.error {
  background: #fdd;
  outline-color: #fd4444;
  opacity: 0.7;
}

.error:focus {
  outline-color: #f99;
}

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 0.5rem;
  line-height: 15px;
  margin: 5px 0 0;
  max-width: 15rem;

  @media only screen and (min-width: 576px) {
    max-width: 25rem;
  }
}
</style>
