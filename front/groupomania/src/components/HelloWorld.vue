<template>
  <div class="hello">
    <h1>{{ msg }}<span class="blinker">'</span></h1>
    <p>Une seule application pour votre entreprise.</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 1.4rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
  // text-transform: uppercase;
  span {
    font-size: 1.4rem;
    color: #8de8fe;
  }
}

p {
  font-size: 0.8rem;
  font-weight: lighter;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
}

.blinker {
  animation: blink 2s infinite linear;
}

@keyframes blink {
  49.99% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
