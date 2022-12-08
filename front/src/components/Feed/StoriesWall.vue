<template>
  <section class="stories">
    <h2>Dernières communautés</h2>
    <StoryCard
      v-for="(community, index) in communities"
      :key="index"
      :community="community"
    />
  </section>
</template>
<script>
import StoryCard from "./StoryCard.vue";

import communitiesApi from "../../api/community";

export default {
  name: "Stories-Wall",
  components: {
    StoryCard,
  },
  data() {
    return {
      communities: [], // add communities array
      search: "",
    };
  },
  async mounted() {
    const getCommunities = await communitiesApi.getCommunities();
    this.communities = getCommunities;
  },
};
</script>

<style lang="scss" scoped>
.stories {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-x: auto;
  cursor: grabbing;
  margin-top: 30px;
}
</style>
