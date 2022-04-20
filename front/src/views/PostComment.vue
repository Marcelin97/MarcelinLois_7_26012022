<template>
<section>
  <nav>
    <GoBack />
  </nav>
  <div>
      <h2>Commentaires</h2>
      <div class="typing-indicator">
  <span></span>
  <span></span>
  <span></span>
</div>
  </div>
</section> 
</template>

<script>
import GoBack from "../components/Base/GoBack.vue";

export default {
    setup() {
        
    },
      components: {
    GoBack,
  },
}
</script>

<style lang="scss" scoped>
.typing-indicator {
  width: auto;
   padding: 20px;
   display: flex;

  span {
    height: 5px;
    width: 5px;
    margin: 0 1px;
    background-color: #9E9EA1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s blink infinite ($i * .3333s);
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

@keyframes bulge {
  50% {
    transform: scale(1.05);
  }
}

// vertically center demo 
html {
  display: table;
  height: 100%;
  width: 100%;
}

body {
  display: table-cell;
  vertical-align: middle;
}
</style>