<template>
  <section>
    <h1>Gestion du profil</h1>

    <SettingsUser />
  </section>
</template>

<script>
import SettingsUser from "@/components/Profil/SettingsUser.vue";

export default {
  name: "ProfilSettings",
  components: {
    SettingsUser,
  },
};
</script>
