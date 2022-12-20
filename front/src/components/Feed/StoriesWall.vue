<template>
  <section class="stories">
    <h2>Dernières communautés</h2>
    <div class="stories__card">
      <StoryCard
        id="scroll-div"
        ref="scrollDiv"
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
.stories {
  display: flex;
  margin: 35px auto;
  flex-direction: column;
  justify-content: center;
  // width: 100%;

  &__card {
    display: flex;
    // overflow-x: auto;
  }
  h2 {
    text-align: center;
  }
}

h2 {
  flex-basis: 100%;
}

.card {
  display: flex;
  flex-direction: row;
}
</style>
