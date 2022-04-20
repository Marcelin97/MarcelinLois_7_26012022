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
};
</script>

<style lang="scss" scoped>
h2{
  font-size: 1.4rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  line-height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>