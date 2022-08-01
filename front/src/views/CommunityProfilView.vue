<template>
  <section>
    <h1>{{ this.community.title }}</h1>
    <CommunityProfile :community="community" />

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
      const response = await communitiesApi.readTargetCommunity(
        this.communityId
      );
      // console.log("Target Community", response);
      this.community = response.data.datas;
    } catch (error) {
      console.log(error);

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
}
</style>