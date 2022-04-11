<template>
  <GoBack />
  <LoginForm msg="Content de te revoir" />
</template>

<script>
import LoginForm from "../components/Form/LoginForm.vue";
import GoBack from "../components/Base/GoBack.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
    GoBack,
  },
};
</script>