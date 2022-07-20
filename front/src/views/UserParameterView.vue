<template>
  <GoBack />
  <section>
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
    GoBack,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  // margin-top: 30px;
  // text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1.4rem;
  font-weight: bolder;
  line-height: 1.4rem;
  text-align: center;
  margin: 2rem auto;
  border-bottom: 1px solid hsla(0deg, 0%, 100%, 0.1);
  padding-bottom: 3vh;
  max-width: 320px;
}
</style>