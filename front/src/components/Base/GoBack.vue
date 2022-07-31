<template>
  <span class="go-back">
    <button @click="goBack">
      <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
    </button>
  </span>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.go-back {
  position: absolute;
}

button {
  border: 0;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    .icon {
      animation: move 0.6s infinite ease-in-out;
    }
  }
}

button .icon {
  font-size: 2rem;
}

@keyframes move {
  50% {
    transform: translateX(2px);
  }
}
</style>