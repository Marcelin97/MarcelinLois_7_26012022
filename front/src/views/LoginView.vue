<template>
  <div>
    <GoBack />
    <LoginForm msg="Content de te revoir" />
  </div>
</template>

<script>
import LoginForm from "../components/Form/LoginForm.vue";
import GoBack from "../components/Base/GoBack.vue";

export default {
  name: "Login-View",
  components: {
    LoginForm,
    GoBack,
  },
};
</script>