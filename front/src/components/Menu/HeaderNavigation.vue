<template>
  <!-- Navigation -->
  <nav class="navbar">
    <h1 class="navbar-logo">
      <!-- Logo of the company -->
      <!-- LINK BACK TO THE HOME -->
      <router-link class="link-home" to="/wall" aria-label="Groupomania"
        ><img
          class="navbar-logo-icon"
          src="../../assets/img/icon.svg"
          alt="Logo Groupomania"
        />
        <!-- Name of the company -->
        <span class="navbar-logo-text">Groupomania</span>
      </router-link>
    </h1>
    <!-- Navigation menu -->
    <nav class="navbar-menu">
      <!-- LINK TO NEWS FEED -->
      <router-link
        class="link"
        type="button"
        to="/wall"
        aria-label="Fil d'actualité"
      >
        <img
          src="../../assets/img/home.svg"
          alt="Fil d'actualité"
          title="Fil d'actualité"
        />
      </router-link>
      <!-- LINK TO COMMUNITIES -->
      <router-link
        class="link"
        type="button"
        to="/communities"
        aria-label="Communautés"
      >
        <img
          src="../../assets/img/community.svg"
          alt="Communautés"
          title="Communautés"
        />
      </router-link>
      <!-- LINK TO USERS -->
      <router-link
        class="link"
        type="button"
        to="/explore/users"
        aria-label="Utilisateurs"
      >
        <img
          src="../../assets/img/icon-account.svg"
          alt="Utilisateurs"
          title="Utilisateurs"
        />
      </router-link>
      <!-- LINK LOGOUT -->
      <button type="button" @click="logout" aria-label="déconnexion">
        <img
          src="../../assets/img/sign-out.svg"
          title="Déconnexion"
          alt="Déconnexion"
        />
      </button>
      <!-- LINK TO MY ACCOUNT -->
      <router-link
        class="link"
        type="button"
        to="/user"
        aria-label="Mon compte"
      >
        <img
          class="burger-avatar"
          title="Mon compte"
          src="../../assets/img/avataaars.png"
          alt="Mon compte"
        />
      </router-link>
    </nav>
  </nav>
</template>

<script>
export default {
  name: "Nav-Bar",
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
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

.navbar-menu > .link,
.navbar-menu > button {
  position: relative;
  flex: 0 0 36px;
  display: grid;
  place-items: center;
  font-size: 28px;
  height: 72px;
  width: 36px;
}

@media only screen and (min-width: 600px) {
  .navbar-menu > .link:last-child {
    position: absolute;
    right: 20px;
  }
}

.burger-avatar {
  width: 30px;
  height: 30px;
  transition: 0.4s;
}

.link-home {
  display: flex;
  align-items: center;
}

.link,
button {
  border: 0;
  padding: 0;
  font-family: inherit;
  background: transparent;
  color: inherit;
  cursor: pointer;

  img {
    height: 1.7rem;
    width: auto;
  }
}
</style>
