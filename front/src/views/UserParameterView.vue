<template>
  <section>
        <GoBack />
    <h1>Gestion du profil</h1>
    <UserParameter />
  </section>
</template>

<script>
import UserParameter from "@/components/Profil/UserParameter.vue";
import GoBack from "../components/Base/GoBack.vue";

export default {
  name: "ProfilSettings",
  components: {
    UserParameter,
    GoBack
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 10px;
  line-height: 35px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  text-align: right;
}
</style>