<template>
  <HeaderNavigation />
  <h1>Bienvenue sur la page des communautés</h1>
  <InputBoxCommunityVue />

  <!-- search bar -->
  <div class="search-bar">
    <input type="text" placeholder="Search" v-model="search" />
  </div>

  <!-- output component -->
  <CommunityList
    v-for="(community, index) in filteredCommunities"
    :key="index"
    :community="community"
    :items="filteredArticles"
  />
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
      // add users array:
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
        console.log(error);
        // if (error.response.status == 404) {
        //   const errorMessage = (this.apiError = "Utilisateur introuvable !");
        //   this.errorMessage = errorMessage;
        //   // notification d'erreur
        //   this.$notify({
        //     type: "error",
        //     title: `Erreur lors de la connexion`,
        //     text: `Erreur reporté : ${errorMessage}`,
        //   });
        // }
      });
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

.search-bar {
  height: 34px;
  display: flex;
  width: 90%;
  margin: 0 auto;

  input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgb(23, 23, 23);
    border-radius: 8px;
    padding: 0 40px 0 16px;
  }
}
</style>