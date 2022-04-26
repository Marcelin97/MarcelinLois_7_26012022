<template>
    <div class="blob">
  <div class="blob-animation">
  </div>
</div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style lang="scss" scoped>

.blob {
  position: absolute;
  top: 800px;
  left: 0;
  fill: #08708a;
  width: 50vmax;
  background: transparent;
//   z-index: -1;
  animation: move 10s ease-in-out infinite;
  transform-origin: 50% 50%;
}
.blob-animation{
  width: 200px;
  height: 200px;
  border-radius: 70% 40% 30% 80% / 55% 45% 60% 50%;
  background: #08708a;
}
@keyframes move {
  0%   { transform: scale(1)   translate(10px, -30px); }
  38%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
  40%  { transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg); }
  78%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
  80%  { transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg); }
  100% { transform: scale(1)   translate(10px, -30px); }
}
</style>