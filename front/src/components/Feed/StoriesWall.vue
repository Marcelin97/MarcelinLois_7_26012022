<template>
  <section>
    <StoryCard
      v-for="(community, index) in filteredCommunities"
      :key="index"
      :community="community"
    />
  </section>
</template>
<script>
import StoryCard from "./StoryCard.vue";
import axiosInstance from "../../services/api";

export default {
  name: "Stories-Wall",
  components: {
    StoryCard,
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
    axiosInstance
      .get("/community/readAllCommunities")
      .then((response) => {
        this.communities = response.data.datas;
      })
      .catch((error) => {
        // console.log(error.response.status);
        if (error.response.status == 404) {
          const errorMessage = (this.apiError =
            "Il n'y pas encore de communauté(s) !");
          this.errorMessage = errorMessage;

          // notification d'erreur
          this.$notify({
            type: "info",
            title: `Information de l'api`,
            text: `${errorMessage}`,
          });
        }
      });
  },
};
</script>