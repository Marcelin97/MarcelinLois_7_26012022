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
  margin: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.3rem;
    font-size: 1.4rem;
    font-weight: bolder;
    line-height: 1.4rem;
    text-align: left;
    border-bottom: 1px solid hsla(0deg, 0%, 100%, 0.1);
    padding-bottom: 3vh;
    max-width: 440px;
  span {
    font-size: 1.4rem;
  }
}

p {
   font-size: 0.8rem;
    font-weight: lighter;
    text-align: left;
    margin: 2rem 0;
    line-height: 1.5rem;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    max-width: 330px;
    padding-bottom: 3vh;
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
