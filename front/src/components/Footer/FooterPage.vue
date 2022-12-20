<template>
  <div class="footer">
    <img src="../../assets/img/patternpad.svg" alt="Patternpad" />

    <div class="footer-container">
      <div class="footer2">© 2022</div>
    </div>
    <div class="link">
      <!-- LINK TO NEWS FEED -->
      <router-link class="footer_link" to="/wall" aria-label="Groupomania">
        Groupomania
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: -10px;
}

.footer-container {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer2 {
  letter-spacing: 4px;
  cursor: default;

  @media screen and (min-width: 479px) {
    line-height: 24px;
  }
}

.link {
  font-size: 0.8rem;
  line-height: 3rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
