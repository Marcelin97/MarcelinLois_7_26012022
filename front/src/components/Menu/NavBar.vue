<template>
  <div class="container-header">
    <!-- Menu left -->
    <div class="MenuContainer">
      <input class="HiddenCheckbox" id="menu" type="checkbox" name="menu" />
      <label class="MenuIcon" for="menu"></label>

      <h2 class="MenuHeader">Groupomania</h2>

      <nav class="menu">
        <div class="side-wrapper">
          <div class="side-title">MENU</div>
          <div class="side-menu">
            <router-link to="/explore/users"
              ><font-awesome-icon class="icon-left" :icon="['fas', 'users']" />
              explorateur</router-link
            >
            <router-link to="/communities"
              ><font-awesome-icon class="icon-left" :icon="['fas', 'search']" />
              Communautés</router-link
            >
          </div>
        </div>

        <div class="side-wrapper">
          <div class="side-title">Filtres</div>
          <div class="side-menu">
            <a href="#">
              <font-awesome-icon
                class="icon-left"
                :icon="['fas', 'arrow-trend-up']"
              />
              Top communautés follow
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'heart']" />
              Like
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'clock']" />
              Recent
            </a>
          </div>
        </div>
        <div class="side-wrapper">
          <div class="side-title">Discover</div>
          <div class="side-menu">
            <a href="#">
              <font-awesome-icon
                class="icon-left"
                :icon="['fas', 'arrow-trend-up']"
              />
              Top communautés unfollow
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'heart']" />
              Like
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'clock']" />
              Recent
            </a>
          </div>
        </div>
      </nav>
    </div>
    <!-- Menu left -->

    <!-- Header navigation -->
    <div class="container-nav">
      <nav class="nav-header">
        <input checked id="home" type="radio" name="nav" />
        <input id="find" type="radio" name="nav" />
        <input id="notification" type="radio" name="nav" />
        <input id="messagerie" type="radio" name="nav" />

        <label class="home" for="home">
          <font-awesome-icon
            class="icon home uil uil-estate"
            :icon="['fas', 'home']"
          />
          <router-link class="text" to="/wall">Home</router-link>
        </label>

        <div class="dropdown">
          <!-- The trigger element -->
          <!-- <button class="press"> -->
          <label class="find" for="find">
            <font-awesome-icon class="icon find" :icon="['fas', 'user']" />
          </label>
          <!-- </button> -->

          <!-- The content -->
          <div class="dropdown__content">
            <router-link class="dropdown-text" to="/user">Profil</router-link>
            <router-link class="dropdown-text" to="/">Enregistré</router-link>
            <router-link class="dropdown-text" to="/user/parameter"
              >Paramètres</router-link
            >
            <hr class="line" />
            <button class="dropdown-text" @click="logout">Déconnexion</button>
          </div>
        </div>

        <label class="notification" for="notification">
          <font-awesome-icon
            class="icon notification bell"
            :icon="['fas', 'bell']"
          />
          <router-link class="text" to="#">Alerte</router-link>
        </label>

        <label class="messagerie" for="messagerie">
          <font-awesome-icon
            class="icon messagerie"
            :icon="['fas', 'paper-plane']"
          />
          <router-link class="text" to="#">Chat</router-link>
        </label>
      </nav>
    </div>
    <!-- Header navigation -->
  </div>
</template>

<script>
export default {
  name: "Nav-Bar",
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>





.dropdown {
  position: relative;
  display: grid;
  place-items: center;
  flex: 1 1 auto;
  width: auto;
}

/* Hide the dropdown's content by default */
.dropdown__content {
  display: none;

  /* Position it right below the trigger element */
  left: 0;
  padding-top: 4px;
  position: absolute;
  top: 100%;

  /* It should be on the top of other elements */
  background: rgba(var(--d87, 255, 255, 255), 1);
  z-index: 9999;

  /* Size */
  height: auto;
  width: 200px;
  border-radius: 6px;
  transition: 0.5s;

  .dropdown-text {
    text-align: left;
    border: none;
    cursor: pointer;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-left: 16px;
    padding-right: 16px;
    display: inline-block;
    transition: 0.5s;
    background: transparent;
    width: 100%;
    color: #142342;
    &:hover {
      text-decoration: line-through;
    }
  }
}
.dropdown:hover .dropdown__content::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 29px;
  width: 14px;
  height: 14px;
  background: #ffff;
  transform: rotate(45deg);
}
/* Show the content when hover on the container */
.dropdown:hover .dropdown__content {
  display: block;
}

.line {
  background-color: rgba(var(--b38, 219, 219, 219), 1);
  border: 0;
  height: 1px;
  margin: 0;
  width: 100%;
}

// Animation bell ring
.bell {
  animation-name: bell-ring;
  animation-duration: 1.5s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
}

@keyframes bell-ring {
  0% {
    transform: rotate(-8deg);
  }
  8% {
    transform: rotate(8deg);
  }
  16% {
    transform: rotate(-8deg);
  }
  24% {
    transform: rotate(8deg);
  }
  32% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(8deg);
  }
  48% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(0);
  }
}
// End Animation bell ring

.container-header {
  margin-top: 10px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
}

.container-nav {
  display: flex;
  justify-content: center;
}
.nav-header {
  position: relative;
  display: flex;
  width: 280px;
  height: 70px;
  @media only screen and (min-width: 768px) {
    margin-right: 20px;
  }
}

input {
  position: absolute;
  transform: scale(0);
}

label {
  position: relative;
  display: grid;
  place-items: center;
  flex: 1 1 auto;
  cursor: pointer;
  width: auto;
}

.icon,
.text {
  transition: all 0.15s;
}

.icon {
  font-size: 22px;
}

.text {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

input:nth-child(1):checked ~ label.home .icon,
input:nth-child(2):checked ~ label.find .icon,
input:nth-child(3):checked ~ label.notification .icon,
input:nth-child(4):checked ~ label.messagerie .icon {
  opacity: 0;
}

input:nth-child(1):checked ~ label.home .text,
input:nth-child(2):checked ~ label.find .text,
input:nth-child(3):checked ~ label.notification .text,
input:nth-child(4):checked ~ label.messagerie .text {
  opacity: 1;
}

/* Menu left */
.MenuContainer {
  z-index: 9999;
  display: inline-block;
  margin: 20px;
  width: 260px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  overflow: auto;
  flex-shrink: 0;
}

.HiddenCheckbox {
  display: none;
}

.HiddenCheckbox:checked ~ .MenuHeader {
  opacity: 1;
  transform: none;
}

.HiddenCheckbox:checked ~ .MenuIcon::before {
  box-shadow: transparent 0 0 0;
  transform: rotate(45deg) translate3d(6px, -3px, 0);
}
.HiddenCheckbox:checked ~ .MenuIcon::after {
  transform: rotate(-45deg) translate3d(6px, 3px, 0);
}

.HiddenCheckbox:checked ~ .menu {
  left: 0%;
}

/* hamburger menu */
.MenuIcon {
  cursor: pointer;
  display: block;
  float: left;
  height: 30px;
  position: relative;
  width: 30px;
  z-index: 2;
}

.MenuIcon::before {
  box-shadow: rgb(243, 243, 244) 0 12px 0;
  height: 6px;
  transform-origin: left top;
  width: 30px;
}

.MenuIcon::after {
  bottom: 0;
  height: 6px;
  transform-origin: left bottom;
  width: 30px;
}

.MenuIcon::before,
.MenuIcon::after {
  background-color: #f16b50;
  display: block;
  content: "";
  position: absolute;
  transition: box-shadow 0.2s linear, transform 0.4s 0.2s;
}

/* Nom de l'entreprise à coté du menu */
.MenuHeader {
  float: left;
  line-height: 30px;
  margin: 0 0 0 15px;
  opacity: 0;
  position: relative;
  transform: translate3d(0, -15px, 0);
  transition: transform 0.6s, opacity 0.5s;
  z-index: 2;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 4px;
  position: sticky;
  top: 0;
}

.menu {
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: -250%;
  position: absolute;
  top: 180px;
  margin-top: 20px;
  width: 30%;
  transition: left 0.4s;
  @media only screen and (min-width: 768px) {
    top: 75px;
  }
}

.side-wrapper {
  background-color: #f16b50;
  padding-top: 40px;
  padding-left: 30px;
  width: 320px;
}

.side-title {
  font-size: 15px;
  margin-bottom: 20px;
  background-color: #f16b50;
}

.side-menu {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  white-space: nowrap;
  background-color: #f16b50;
  margin-bottom: 20px;
}

.side-menu a {
  background-color: #f16b50;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    text-decoration: line-through;
    // color: #142342;
  }
}

.icon-left {
  margin-right: 26px;
  width: 16px;
}

.side-menu a:not(:last-child) {
  margin-bottom: 20px;
}

svg:not(:root).svg-inline--fa,
svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
  background-color: transparent;
}
</style>