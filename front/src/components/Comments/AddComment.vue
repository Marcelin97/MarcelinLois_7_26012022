<template>
  <section class="mt-3 py-4" aria-labelledby="comments-title">
    <h2 id="comments-title">Ajouter un commentaire</h2>

    <Form class="add-comments mt-4 row" @submit="onSubmit" :validation-schema="schema">
      <div class="form-group col-12">
        <label for="content" class="form-label">Contenu</label>
        <Field
          v-model="content"
          name="content"
          type="text"
          class="form-control form-control-lg"
          id="content"
          as="textarea"
          rows="3"
        />
        <p v-if="contentErrors" class="invalid-feedback">{{ contentErrors }}</p>
        <p :class="{'text-danger': contentLength > 160}">{{ contentLength }} / 160</p>
      </div>


      <div class="col-12 form-actions">
        <button type="submit" class="btn" >Envoyer !</button>
      </div>
    </Form>
  </section>

</template>

<script>
// import useVuelidate from "@vuelidate/core";
// import { helpers, minLength, maxLength } from "@vuelidate/validators";
// import { reactive, computed } from "vue";

export default {
  name: 'AddComment',

  data () {
    return {
      errors: false
    }
  },
  methods: {
    onSubmit (formData) {
      this.$emit('add-comment', formData)
    }
  }
}
</script>