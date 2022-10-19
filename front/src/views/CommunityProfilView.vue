<template>
  <section>
    <h1>{{ this.community.title }}</h1>
    <CommunityProfile :community="community" :communityId = "communityId"/>

    <!-- gestion erreur API avec axios -->
    <div v-if="apiErrors" class="error-api">
      <p v-for="(apiError, i) in apiErrors" :key="i" class="error-msg">
        {{ apiError.message }}
      </p>
    </div>
    <!-- gestion erreur API avec axios -->
  </section>
</template>

<script>
import CommunityProfile from "../components/Community/CommunityProfile.vue";
import communitiesApi from "../api/community";

export default {
  name: "CommunityProfile-View",
  components: {
    CommunityProfile,
  },
  data() {
    return {
      community: [],
      communityId: "",
      apiErrors: false,
    };
  },
  async mounted() {
    this.communityId = this.$route.params.id;

    try {
      const response = await communitiesApi.readTargetCommunity(this.communityId);
      this.community = response.data.datas;
    } catch (error) {
      const errorMessage = (this.apiErrors = error.response);
      this.errorMessage = errorMessage;

      // notification error message
      this.$notify({
        type: "error",
        title: `Erreur lors du changement de la communauté`,
        text: `Erreur reporté : ${errorMessage}`,
        duration: 30000,
      });
    }
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
  text-align: center;

      font-size: 1.4rem;
    line-height: 1.4rem;
    letter-spacing: 0.3rem;
    font-weight: bolder;
    text-align: center;
    margin: 2rem 0 0;
    padding-bottom: 3vh;
}
</style>