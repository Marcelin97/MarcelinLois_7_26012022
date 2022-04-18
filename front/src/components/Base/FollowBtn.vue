<template>
  <button class="btn-follow">
    <span class="background"></span>
    <!-- <span class="icon uil uil-instagram"></span> -->
    <font-awesome-icon class="icon" :icon="['fas', 'hashtag']" />
    <span class="content"> S'abonner </span>
  </button>
</template>

<script>
</script>

<style lang="scss" scoped>
button {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  display: flex;
  align-items: center;
  width: 10rem;
  height: 4rem;
  padding-left: 3.4rem;
  border-radius: 1rem;
  border: none;
  background: #ffffff;
  cursor: pointer;
}

.background {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: -230px;
  transform: translate(-3.5rem, -50%);
  width: 300px;
  height: 300px;
  background: #8f44fd;
  transition: 0.3s all;
}

.icon {
    background:transparent;
    stroke:black;
    stroke-width: 4px;
    fill: red;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  z-index: 2;
  transform: translate(0.75rem, -50%);
  font-size: 2rem;
  transition: 0.3s all;
}

.content {
  font-size: 1rem;
  background: transparent;
  color: black;
}

button:hover .background {
  border-radius: 50%;
  transform: translate(-2rem, -50%);
}

button:hover .icon {
  transform: translate(0, -50%);
  color: #ffffff;
}
</style>