<template>
  <div>
    <!-- Feeds -->
    <div class="container">
      <!-- SidebarNavigation -->
      <SidebarNavigation class="container__sidebar" />

      <!-- Main -->
      <div class="container__main">
        <!-- Stories -->
        <StoriesWall />
        <!-- Input Box -->
        <InputBox />
        <!-- Posts -->
        <PostsWall />
      </div>
    </div>
  </div>
</template>

<script>
import PostsWall from "../Posts/PostsWall.vue";
import InputBox from "./InputBox.vue";
import StoriesWall from "./StoriesWall.vue";
import SidebarNavigation from "../Menu/SidebarNavigation.vue";

export default {
  name: "Feed-Wall",
  components: {
    PostsWall,
    InputBox,
    StoriesWall,
    SidebarNavigation,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @media only screen and (min-width: 576px) {
    flex-direction: inherit;
  }
}
.container__sidebar {
  width: 100%;
  @media only screen and (min-width: 576px) {
    width: 0%;
  }
}
.container__main {
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;
}
</style>