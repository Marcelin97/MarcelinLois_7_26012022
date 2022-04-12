<template>
  <div>
    <!-- Header navigation -->
    <div class="container-header">
      <nav class="nav-header">
        <input checked id="home" type="radio" name="nav" />
        <input id="find" type="radio" name="nav" />
        <input id="notification" type="radio" name="nav" />

        <label class="home" for="home">
          <font-awesome-icon
            class="icon home uil uil-estate"
            :icon="['fas', 'home']"
          />
          <router-link class="text" to="/">Home</router-link>
        </label>
        <div class="indicator"></div>

        <label class="find" for="find">
          <font-awesome-icon class="icon find" :icon="['fas', 'user']" />
          <router-link class="text" to="/profil">Compte</router-link>
        </label>
        <div class="indicator"></div>

        <label class="notification" for="notification">
          <font-awesome-icon
            class="icon notification"
            :icon="['fas', 'bell']"
          />
          <span class="text">Notification</span>
        </label>
        <div class="indicator"></div>
      </nav>
    </div>
    <!-- Header navigation -->

    <!-- Menu left -->
    <div class="MenuContainer">
      <input class="HiddenCheckbox" id="menu" type="checkbox" name="menu" />
      <label class="MenuIcon" for="menu"></label>

      <h2 class="MenuHeader">Groupomania</h2>

      <nav class="menu">

        <div class="side-wrapper">
          <div class="side-title">MENU</div>
          <div class="side-menu">
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
              Home
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'book-open']" />
              News
            </a>
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
              Communauté
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'arrow-left']" />
              Posts
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'arrow-left']" />
              Utilisateurs
            </a>
          </div>
        </div>

        <!-- <div class="side-wrapper">
          <div class="side-title">MENU</div>
          <div class="side-menu">
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
              Home
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'book-open']" />
              News
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'arrow-left']" />
              Communauté
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'arrow-left']" />
              Posts
            </a>
            <a href="#">
              <font-awesome-icon class="icon-left" :icon="['fas', 'arrow-left']" />
              Utilisateurs
            </a>
          </div>
        </div> -->

    <div class="side-wrapper">
      <div class="side-title">YOUR FAVOURITE</div>
      <div class="side-menu">
        <a href="#">
          <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
          Foresto
        </a>
        <a href="#">
          <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
          Birds
        </a>
        <a href="#">
          <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
          Nature
        </a>
        <a href="#">
          <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
          Animals
        </a>
        <a href="#">
          <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
          Motobike
        </a>
        <a href="#">
          <font-awesome-icon class="icon-left" :icon="['fas', 'home']" />
          Dance
        </a>
      </div>
    </div>








      </nav>
    </div>
    <!-- Menu left -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.container-header {
  margin-top: 10px;
  height: auto;
  display: flex;
  justify-content: flex-end;
}
.nav-header {
  position: relative;
  display: flex;
  width: 240px;
  height: 70px;
  margin-right: 50px;
}

.indicator {
  position: absolute;
  bottom: 3px;
  left: 30px;
  margin-left: 8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #8de8fe;
  transition: all 1s;
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
}

.icon,
.text {
  color: #ccc;
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
input:nth-child(3):checked ~ label.notification .icon {
  opacity: 0;
}

input:nth-child(1):checked ~ label.home .text,
input:nth-child(2):checked ~ label.find .text,
input:nth-child(3):checked ~ label.notification .text {
  opacity: 1;
  color: #45c2f8;
}

input:nth-child(1):checked ~ .indicator {
  transform: translateX(0);
}

input:nth-child(2):checked ~ .indicator {
  transform: translateX(80px);
}

input:nth-child(3):checked ~ .indicator {
  transform: translateX(160px);
}

/* Menu left */
.MenuContainer {
  display: inline-block;
  margin: 20px;

  /* width: 260px;
 display: flex;
 flex-direction: column;
 transition: 0.3s;
 overflow: auto;
 flex-shrink: 0; */
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
  box-shadow: #999 0 12px 0;
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
  background: #8de8fe;
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
 font-size: 15px;
 color: #fff;
 font-weight: 600;
 text-align: center;
 /* height: 68px; */
 /* line-height: 68px; */
 letter-spacing: 4px;
 position: sticky;
 top: 0;
}

.menu {
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: -90%;
  position: absolute;
  top: 70px;
  width: 30%;
  transition: left 0.4s;
}

.side-wrapper {
  padding-top: 70px;
  padding-left: 30px;
}

.side-title {
  font-size: 15px;
  margin-bottom: 20px;
}

.side-menu {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  white-space: nowrap;
}

.side-menu a {
  text-decoration: none;
  color: #9c9cab;
  display: flex;
  align-items: center;
}

.icon-left{
  margin-right: 16px;
  width: 16px;
}
.side-menu a:hover {
  color: #fff;
}
.side-menu a:not(:last-child) {
  margin-bottom: 20px;
}

</style>