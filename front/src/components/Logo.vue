<template>
  <div id="Clouds">
    <img src="../assets/img/logo.svg" class="logo" alt="" />
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
  filter: drop-shadow(0 10px 5px rgb(12, 19, 31));
  animation: floating 3s infinite ease-in-out;
  border-radius: 50%;
}

.logo {
  height: 10vmin;
  border-radius: 50%;
}

@keyframes floating {
  from {
    transform: translateY(-10px);
  }
  65% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>
