<template>
  <div>
    <!-- NavBar + Header -->
    <NavBar />
    <div>
      <!-- Post ID -->
      <PostId />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Menu/NavBar.vue";
import PostId from "@/components/Posts/PostId.vue";

export default {
  name: "WallView",
  components: {
    NavBar,
    PostId,
  },
};
</script>
<style lang="scss" scoped>
NavBar{
    z-index: 999;
}

</style>