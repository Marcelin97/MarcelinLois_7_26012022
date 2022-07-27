<template>
  <!-- The Wall view -->
  <div>
    <!-- NavBar + Header -->
    <NavBar />
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
import NavBar from "@/components/Menu/NavBar.vue";
import FeedWall from "@/components/Feed/FeedWall.vue";
import LogoHome from "@/components/Logo.vue";

export default {
  name: "Wall-View",
  components: {
    NavBar,
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