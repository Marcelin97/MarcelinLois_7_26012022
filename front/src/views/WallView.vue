<template>
  <!-- The Wall view -->
  <div>
    <div class="logo-home">
      <LogoHome />
    </div>
    <div>
      <!-- Feed -->
      <FeedWall />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FeedWall from "@/components/Feed/FeedWall.vue";
import LogoHome from "@/components/Logo.vue";

export default {
  name: "Wall-View",
  components: {
    FeedWall,
    LogoHome,
  },
};
</script>

<style lang="scss" scoped>
.logo-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>