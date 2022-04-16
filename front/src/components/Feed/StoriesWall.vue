<template>
    <section>
        <h2>Stories</h2>
        <StoryCard/>
    </section>
</template>
<script>
import StoryCard from "./StoryCard.vue";

export default {
  components: {
    StoryCard,
  },
  name: "AccountView",
};
</script>