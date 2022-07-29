<template>
  <aside>
    <nav class="menu">
      <ul class="menu-list">
        <li class="menu-item">
          <router-link class="menu-link underline" to="/explore/users">
            explorateur
          </router-link>
        </li>
        <li class="menu-item">
          <router-link class="menu-link underline" to="/communities">
            Communautés
          </router-link>
        </li>
        <li class="menu-item">
          <a class="menu-link underline" href="#">Portfolio</a>
        </li>
        <li class="menu-item">
          <a class="menu-link underline" href="#">Services</a>
        </li>
        <li class="menu-item">
          <a class="menu-link underline" href="#">Contact</a>
        </li>
        <li class="menu-item">
          <a class="menu-link underline" href="#" @click="logout"
            >Déconnexion</a
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
export default {
  setup() {},
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-list {
  background-image: url(../../assets/img/sidebarNavigation1.svg);
  background-repeat: no-repeat;
  margin: 0;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (min-width: 576px) {
    justify-content: flex-start;
    width: min-content;
    background-image: url(../../assets/img/sidebarNavigation.svg);
    background-repeat: no-repeat;
  }
}

.menu-link {
  @media only screen and (min-width: 576px) {
    font-size: 1.4rem;
    line-height: 1.4;
  }
}

.menu-link::after {
  position: absolute;
  top: 0;
  right: 100%;
  font-size: 0.75rem;
  letter-spacing: 0.056rem;
  padding: 0 0.25rem 0 0;
}

.menu-item {
  margin: 1rem;
  @for $i from 0 through 5 {
    &:nth-child(#{1 + $i}) {
      .menu-link::after {
        content: "0#{1 + $i}";
      }
    }
  }
}

.underline {
  position: relative;
}

.underline::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #ffd7d7;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) and (pointer: fine) {
  .underline:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>