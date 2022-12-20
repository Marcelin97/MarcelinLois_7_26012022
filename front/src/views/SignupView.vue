<template>
  <div>
    <nav>
      <!-- output component -->
      <GoBack />
    </nav>

    <!-- output component -->
    <SignupForm msg="Créer mon compte" />
  </div>
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
