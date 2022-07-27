<template>
  <GoBack />
  <SignupForm msg="Créer mon compte" />
</template>

<script>
import SignupForm from "@/components/Form/SignupForm.vue";
import GoBack from "@/components/Base/GoBack.vue";

export default {
  name: "Signup-View",
  components: {
    SignupForm,
    GoBack,
  },
};
</script>