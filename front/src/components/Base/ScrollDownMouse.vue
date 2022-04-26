<template>
  <div class="container-mouse">
    <div class="mouse"></div>
    <p>Scroll</p>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.container-mouse {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
background: transparent;
}
p {
  margin-top: 20px;
  letter-spacing: 5px;
  text-indent: -15px;
  animation: colorText 5s ease-out infinite;
}

.mouse {
  background: #4e5559
    linear-gradient(transparent 0%, transparent 50%, #ffffff 50%, #ffffff 100%);
  position: relative;
  width: 22px;
  height: 58px;
  background-size: 100% 100%;
  border-radius: 100px;
  background-size: 225%;
  animation: rock 5s ease-out infinite;
}
.mouse:before,
.mouse:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.mouse:before {
  width: 20px;
  height: 54px;
  background-color: #222a30;
  border-radius: 100px;
}
.mouse:after {
  background-color: #ffffff;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  animation: trackBallSlide 15s linear infinite;
}

@keyframes trackBallSlide {
  0% {
    opacity: 1;
    transform: scale(1) translateY(-20px);
  }
  6% {
    opacity: 1;
    transform: scale(0.9) translateY(5px);
  }
  14% {
    opacity: 0;
    transform: scale(0.4) translateY(40px);
  }
  15%,
  19% {
    opacity: 0;
    transform: scale(0.4) translateY(-20px);
  }
  28%,
  29.99% {
    opacity: 1;
    transform: scale(1) translateY(-20px);
  }
  30% {
    opacity: 1;
    transform: scale(1) translateY(-20px);
  }
  36% {
    opacity: 1;
    transform: scale(0.9) translateY(5px);
  }
  44% {
    opacity: 0;
    transform: scale(0.4) translateY(40px);
  }
  45%,
  49% {
    opacity: 0;
    transform: scale(0.4) translateY(-20px);
  }
  58%,
  59.99% {
    opacity: 1;
    transform: scale(1) translateY(-20px);
  }
  60% {
    opacity: 1;
    transform: scale(1) translateY(-20px);
  }
  66% {
    opacity: 1;
    transform: scale(0.9) translateY(5px);
  }
  74% {
    opacity: 0;
    transform: scale(0.4) translateY(40px);
  }
  75%,
  79% {
    opacity: 0;
    transform: scale(0.4) translateY(-20px);
  }
  88%,
  100% {
    opacity: 1;
    transform: scale(1) translateY(-20px);
  }
}

@keyframes rock {
  50% {
    transform: translateY(1rem);
  }
}

@keyframes colorText {
  21% {
    color: #4e5559;
  }
  30% {
    color: #ffffff;
  }
  51% {
    color: #4e5559;
  }
  60% {
    color: #ffffff;
  }
  81% {
    color: #4e5559;
  }
  90% {
    color: #ffffff;
  }
}
</style>