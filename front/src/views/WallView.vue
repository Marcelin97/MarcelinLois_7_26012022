<template>
<!-- The Wall view -->
  <div>
    <!-- NavBar + Header -->
    <NavBar />
    <div>
      <!-- Feed -->
      <FeedWall />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Menu/NavBar.vue";
import FeedWall from "@/components/Feed/FeedWall.vue";

export default {
  name: "WallView",
  components: {
    NavBar,
    FeedWall,
  },
};
</script>
<style lang="scss" scoped>
NavBar{
    z-index: 999;
}
FeedWall{
  z-index: 1;
}
</style>