<template>
  <nav class="navbar">
    <h1 class="navbar-logo">
      <img class="navbar-logo-icon" src="../../assets/img/icon.svg" alt="bonjour" />
      <span class="navbar-logo-text">Groupomania</span>
    </h1>
    <nav class="navbar-menu">
      <button type="button">
        <img src="../../assets/img/icon-settings.svg" alt="Paramètre du compte" title="Paramètre du compte" />
      </button>
      <button type="button">
        <img src="../../assets/img/icon-accounts.svg" alt="Utilisateurs" title="Utilisateurs"/>
      </button>
            <button type="button">
              <img src="../../assets/img/sign-out-svgrepo-com.svg" title="Déconnexion" alt="Déconnexion" />
            </button>
      <button type="button">
        <img class="burger-avatar" title="Mon compte" src="../../assets/img/avataaars.png" alt="Mon compte" />
      </button>
    </nav>
  </nav>
</template>

<script>
export default {
  name: "Nav-Bar",
  data() {
    return {
      mobileNav: false,
    };
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.burger {
  position: fixed;
  z-index: 3;
  top: 20px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.burger-avatar {
  width: 30px;
  height: 30px;
  transition: 0.4s;
}

button {
  border: 0;
  padding: 0;
  font-family: inherit;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.navbar {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  padding: 0 20px;
  background: #ffff;    
  color: #f9f9f9;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 120px;
}

.navbar-logo-icon {
  height: 28px;
}

@media only screen and (min-width: 400px) {
  .navbar-logo-icon {
    height: 24px;
  }
}

.navbar-logo-text {
  display: none;
  height: 19px;
}

@media only screen and (min-width: 400px) {
  .navbar-logo-text {
    display: block;
  }
}

.navbar-menu {
  display: flex;
  transition: 0.3s;
}

@media only screen and (min-width: 600px) {
  .navbar-menu {
    flex: 1 1 auto;
    justify-content: center;
    margin-right: 120px;
  }
}

.navbar-menu>button {
  position: relative;
  flex: 0 0 36px;
  display: grid;
  place-items: center;
  font-size: 28px;
  height: 72px;
  width: 36px;
}

.navbar-menu>button.active {
  opacity: 1;
}

.navbar-menu>button.active::after {
  content: "";
  display: block;
  position: absolute;
  top: 18px;
  left: 50%;
  translate: -50% 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #36b7ee;
}

@media only screen and (min-width: 600px) {
  .navbar-menu>button:last-child {
    position: absolute;
    right: 20px;
  }
}
</style>
