<template>
  <div id="Clouds">
    <img
      src="../assets/img/logo.svg"
      class="logo"
      alt="Logo de l'entreprise"
      aria-label="Logo de l'entreprise"
    />
  </div>
</template>

<script>
export default {
  name: "LogoHome",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Clouds {
  position: absolute;
  margin: auto;
  user-select: none;
}

.logo {
  height: 10vmin;
  animation: floating 3s infinite ease-in-out;
}

@keyframes floating {
  from {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
  to {
    transform: translateY(-0px);
  }
}
</style>
