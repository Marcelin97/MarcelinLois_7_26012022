<template>
  <HeaderNavigation />
  <h1>Bienvenue sur la page des communautés</h1>
  <InputBoxCommunityVue />
  <CommunityList />
</template>
<script>
import CommunityList from "../components/Community/communityList.vue";
import HeaderNavigation from "../components/Menu/HeaderNavigation.vue";
import InputBoxCommunityVue from "../components/Community/InputBoxCommunity.vue";

export default {
  name: "CommunityView",
  components: {
    CommunityList,
    HeaderNavigation,
    InputBoxCommunityVue,
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
  margin-bottom: 5rem;
  margin-right: 1rem;
  text-align: right;
}
</style>