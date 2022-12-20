<template>
  <!-- The Wall view -->
  <div>
    <div>
      <!-- output component -->
      <FeedWall />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FeedWall from "@/components/Feed/FeedWall.vue";

export default {
  name: "Wall-View",
  components: {
    FeedWall,
  },
};
</script>
