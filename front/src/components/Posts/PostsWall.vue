<template>
    <section>
        <h2>Stories</h2>
        <PostCard/>
    </section>
</template>
<script>
import PostCard from "./PostCard.vue";

export default {
  components: {
    PostCard,
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