<template>
  <div class="animation-btn">
    <button>
      <span class="paper-wrapper">
        <span class="paper"></span>
      </span>

      <span class="shredded-wrapper">
        <span class="shredded"></span>
      </span>

      <span class="lid"></span>

      <span class="can">
        <span class="filler"></span>
      </span>
    </button>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
// delete button
.animation-btn :hover {
  .paper,
  .shredded {
    background: #8de8fe;
    animation: move 2.25s linear infinite;
  }
  .filler {
    animation: fill 4.5s infinite;
  }
}
button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 4rem;
  border-radius: 0.8rem;
  border: none;
  // background: #08708a;
  cursor: pointer;
}

.can {
  overflow: hidden;
  position: relative;
  transform: translateY(3px);
  width: 20px;
  height: 22px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 2px solid #ffffff;
}

.lid {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 2px;
  background: #ffffff;
}

@keyframes move {
  0% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(88px);
  }
  100% {
    transform: translateY(88px);
  }
}

.paper-wrapper,
.shredded-wrapper {
  overflow: hidden;
  position: absolute;
  top: -20px;
  left: 50%;
  margin-left: -5px;
  width: 10px;
  height: 64px;
  display: flex;
}

.paper-wrapper {
  height: 40px;
}

.shredded-wrapper {
  top: 24px;
  height: 20px;
  justify-content: center;
}

.paper,
.shredded {
  display: block;
  background: transparent;
  height: 10px;
  // animation: move 2.25s linear infinite;
}

.paper {
  width: 10px;
}

.shredded {
  margin-top: -30px;
  width: 2px;
}

.shredded::before,
.shredded::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  width: inherit;
  height: inherit;
  background: inherit;
}

.shredded::before {
  left: -4px;
}

.shredded::after {
  right: -4px;
}

@keyframes fill {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-50%);
  }
  70% {
    transform: translateY(-50%);
  }
  90% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.filler {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -32px;
  width: 64px;
  height: 120%;
  background: #8de8fe;
  // animation: fill 4.5s infinite;
}
</style>