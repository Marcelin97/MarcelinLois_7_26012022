<template>
  <section class="mt-3 py-4" aria-labelledby="comments-title">
    <h2 id="comments-title">Ajouter un commentaire</h2>

    <Form class="add-comments mt-4 row" @submit="onSubmit">
      <div class="form-group col-12">
        <label for="content" class="form-label"></label>
        <input
          v-model="state.comment.content"
          @blur="v$.comment.content.$touch"
          :class="v$.comment.content.$error === true ? 'error' : 'dirty'"
          name="content"
          type="text"
          class="form-control form-control-lg"
          id="content"
          as="textarea"
          rows="3"
        />

        <!-- Error Message -->
        <template v-if="v$.comment.content.$dirty">
          <div
            class="input-errors"
            v-for="(error, index) of v$.comment.content.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </template>
        <!-- Error Message -->
      </div>

      <div class="col-12 form-actions">
        <button
          type="submit"
          class="btn"
          title="Commenter"
          text="Commenter"
          :placeholder="'Commenter en tant que' + ' ' + currentUser.username"
          @click="onAddComment(content)"
        >Commenter</button>
      </div>
    </Form>
  </section>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import roleMixin from "../../mixins/role.mixin";

export default {
  name: "Add-Comment",

  data() {
    return {
      currentUser: [],
      apiErrors: "",
    };
  },
  mixins: [roleMixin],
  setup() {
    const state = reactive({
      comment: {
        content: "",
      },
    });

    const rules = computed(() => ({
      comment: {
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
      },
    }));

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  validationConfig: {
    $lazy: true,
  },
  mounted() {
    this.currentUser = this.$store.state.user;
  },
  methods: {
    onAddComment(formData) {
      this.$emit("onAddComment", formData);
    },
  },
};
</script>