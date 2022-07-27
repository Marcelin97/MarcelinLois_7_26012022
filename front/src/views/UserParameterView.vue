<template>
  <GoBack />
  <UserParameter msg="Gestion du profil" />
</template>

<script>
import UserParameter from "@/components/Profil/UserParameter.vue";
import GoBack from "@/components/Base/GoBack.vue";

export default {
  name: "Profil-Settings",
  components: {
    UserParameter,
    GoBack,
  },
};
</script>