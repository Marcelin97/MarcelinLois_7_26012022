<template>
  <section class="stories">
    <StoryCard
      v-for="(community, index) in communities"
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
      communities: [], // add communities array
      apiErrors: "",
      search: "",
    };
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
          const errorMessage = (this.apiErrors =
            "Il n'y pas encore de communauté(s) !");
          this.errorMessage = errorMessage;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.stories {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  overflow-x: auto;
  cursor: grabbing;
  justify-content: space-evenly;
}
</style>