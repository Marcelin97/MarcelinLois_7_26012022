<template>
  <section>
    <!-- If there are communities -->
    <h1 v-if="communities.length != 0">Explore des nouvelles communautés !</h1>
    <!-- If there are no communities-->
    <h1 v-else>
      Il n'y a pas de communautés pour le moment. Crée une communauté.
    </h1>

    <!-- Input Box Communities -->
    <InputBoxCommunityVue @create-community="createCommunity" />

    <!-- search bar -->
    <div class="search-bar">
      <input
        type="text"
        placeholder="Recherche une communauté"
        v-model="search"
      />
    </div>

    <!-- output component -->
    <div class="list-communities">
      <CommunityList
        v-for="(community, index) in filteredCommunities"
        :key="index"
        :community="community"
      />
    </div>
  </section>
</template>

<script>
import CommunityList from "../components/Community/communityList.vue";
import InputBoxCommunityVue from "../components/Community/InputBoxCommunity.vue";

// Communities request
import communitiesApi from "../api/community";

export default {
  name: "Communities-View",
  components: {
    CommunityList,
    InputBoxCommunityVue,
  },
  data() {
    return {
      communities: [], // add communities array
      apiErrors: "",
      search: "",
    };
  },
  computed: {
    // Search Bar
    filteredCommunities() {
      return this.communities.filter((community) =>
        community.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async mounted() {
    // I'm creating a query to retrieve all communities informations.
    const getCommunities = await communitiesApi.getCommunities();
    // I assign the datas to communities array
    this.communities = getCommunities;
  },
  methods: {
    // I retrieve my event (@create-community in InputBoxCommunityVue) with my data to create a community
    createCommunity(data) {
      // I push my data to the communities array
      this.communities.unshift(data.datas);
    },
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
  text-align: center;
}

.search-bar {
  height: 34px;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2rem;

  input {
    width: 15rem;
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 0.4rem;
    margin-bottom: 0.3rem;
    border: none;
    outline: none;
    background: #4e5166;
    color: #e2dedb;

    @media only screen and (min-width: 400px) {
      width: 18rem;
    }

    @media only screen and (min-width: 768px) {
      width: 25rem;
    }
  }
}

input::placeholder {
  color: #ffff;
  opacity: 0.7;
}
</style>
