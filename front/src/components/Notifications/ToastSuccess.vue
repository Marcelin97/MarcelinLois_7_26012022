<template>
  <div class="container">
    <span>Tu suis désormais cette communauté</span>
    <button
      class="action"
      @click.stop="clicked"
    >BRAVO!</button>
  </div>
</template>
<script>
export default {
  methods: {
    clicked() {
      this.$emit("myClick");
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>