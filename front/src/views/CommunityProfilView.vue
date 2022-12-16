<template>
  <section>
    <h1>{{ this.community.title }}</h1>

    <!-- output component -->
    <CommunityProfile :hasFollow="true" @delete-community="deleteCommunity" @unfollow-community="unfollowCommunity" @follow-community="followCommunity" :community="community" :communityId="communityId" />

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

// Communities requests
import communitiesApi from "../api/community";

export default {
  name: "CommunityProfile-View",
  components: {
    CommunityProfile,
  },
  data() {
    return {
      community: [], // add communities array
      communityId: "",
      apiErrors: "",
    };
  },
  async mounted() {
    // I get my route parameter
    this.communityId = this.$route.params.id;

    // I'm creating a query to retrieve target community information.
      const getCommunities = await communitiesApi.readTargetCommunity(this.communityId);
      // I assign data to the community array
      this.community = getCommunities.data.datas;
  },
  methods: {
    followCommunity(communityId) {
      this.community.id == communityId;
    },
    unfollowCommunity(communityId) {
      this.community.id == communityId;
    },
    deleteCommunity(communityId) {
      this.community.id == communityId;
    },
  }
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

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
  max-width: 15rem;
}
</style>
