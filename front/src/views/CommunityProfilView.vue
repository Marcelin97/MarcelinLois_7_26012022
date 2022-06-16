<template>
  <HeaderNavigation />
  <section>
    <h1>Ma communauté</h1>
    <CommunityProfil />
  </section>
</template>

<script>
import HeaderNavigation from "../components/Menu/HeaderNavigation.vue";
import CommunityProfil from "../components/Community/CommunityProfil.vue";

export default {
  name: "CommunityProfilView",
  components: {
    HeaderNavigation,
    CommunityProfil,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  justify-content: center;
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