<template>
  <div class="hello">
    <h1>{{ msg }}<span class="blinker">'</span></h1>
    <p>
      Une seule application pour votre entreprise pour vous comme pour vos
      salariés
    </p>
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
  font-size: 3em;
  font-style: extra-bold;
  margin-bottom: 1em;
  span {
    font-size: 1.3em;
  }
}
p{
  font-size: 1rem;
  font-weight: 700;
  // text-transform: uppercase;
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
