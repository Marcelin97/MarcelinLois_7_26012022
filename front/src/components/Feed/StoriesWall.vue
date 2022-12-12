<template>
  <section class="stories">
    <h2>Dernières communautés</h2>
    <div class="stories__card">
    
    <StoryCard
    class="card"
      v-for="(community, index) in communities"
      :key="index"
      :community="community"
    />
    </div>
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
.stories{
      display: flex;
      margin: 35px auto;
      flex-direction: column;
      width: 100%;

        &__card{
            display: flex;
            flex: 1;
          }
}

h2{
  flex-basis: 100%;
}

.card{
  display: flex;
  flex-direction: row;
}
</style>
