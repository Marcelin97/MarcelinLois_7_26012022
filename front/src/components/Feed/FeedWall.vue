<template>
  <div>
    <!-- Feeds -->
    <div>
      <!-- Stories -->
      <StoriesWall />
      <!-- Input Box -->
      <InputBox />
      <!-- Posts -->
      <PostsWall />
    </div>
  </div>
</template>

<script>
import PostsWall from "../Posts/PostsWall.vue";
import InputBox from "./InputBox.vue";
import StoriesWall from "./StoriesWall.vue";

export default {
  components: {
    PostsWall,
    InputBox,
    StoriesWall,
  },
};
</script>

<style lang="scss" scoped>

</style>