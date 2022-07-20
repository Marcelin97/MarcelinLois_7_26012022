<template>
  <HeaderNavigation />

  <section>
    <h1 v-if="communities.length">Explore des nouvelles communautés !</h1>
    <h1 v-else>Il n'y a pas encore de communauté.</h1>

    <!-- Input Box Communities -->
    <InputBoxCommunityVue />

    <!-- search bar -->
    <div class="search-bar">
      <input type="text" placeholder="Search" v-model="search" />
    </div>

    <!-- output component -->
    <div class="list-communities">
      <CommunityList
        v-for="(community, index) in filteredCommunities"
        :key="index"
        :community="community"
        :items="filteredArticles"
      />
    </div>
  </section>
</template>

<script>
import CommunityList from "../components/Community/communityList.vue";
import HeaderNavigation from "../components/Menu/HeaderNavigation.vue";
import InputBoxCommunityVue from "../components/Community/InputBoxCommunity.vue";
import axiosInstance from "../services/api";

export default {
  name: "CommunityView",
  components: {
    CommunityList,
    HeaderNavigation,
    InputBoxCommunityVue,
  },
  data() {
    return {
      // add communities array:
      communities: [],
      apiError: "",
      search: "",
    };
  },
  computed: {
    filteredCommunities() {
      return this.communities.filter((community) =>
        community.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.apiError = "";
    axiosInstance
      .get("/community/readAllCommunities")
      .then((response) => (this.communities = response.data.datas))
      .catch((error) => {
        // console.log(error.response.status);
        if (error.response.status == 404) {
          const errorMessage = (this.apiError =
            "Il n'y pas de communauté(s) !");
          this.errorMessage = errorMessage;

          // notification d'erreur
          this.$notify({
            type: "warn",
            title: `Pour information`,
            text: `${errorMessage}`,
          });
        }
      });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
  letter-spacing: 0.3rem;
  font-size: 1.4rem;
  line-height: 1.4rem;
  text-align: center;
  margin: 2rem auto;
  border-bottom: 1px solid hsla(0deg, 0%, 100%, 0.1);
  padding-bottom: 3vh;
  max-width: 350px;
}

.search-bar {
  height: 34px;
  display: flex;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2rem;

  input {
    width: 60%;
    height: 100%;
    border: none;
    background-color: rgb(23, 23, 23);
    border-radius: 8px;
    padding: 0 40px 0 16px;
    margin: 0 auto;
  }
}
</style>