<template>
  <div>
    <div class="container-header">
      <nav id="navbar">
        <div class="nav-right">
          <ul id="navbar-items">
            <li class="navbar-item no-mob">
              <a class="navbar-item-inner" href="#"
                ><span>Home</span></a
              >
            </li>
            <li class="navbar-item no-mob">
              <a class="navbar-item-inner" href="#"
                ><span>Messsagerie</span></a
              >
            </li>
            <li class="navbar-item no-mob">
              <a class="navbar-item-inner" href="#"
                ><span>Notifications</span></a
              >
            </li>
            <li class="navbar-item">
              <a class="navbar-item-inner" href="#"
                ><span
                  ><font-awesome-icon
                    class="icon"
                    :icon="['fas', 'user']" /></span
              ></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="MenuContainer">
      <input class="HiddenCheckbox" id="menu" type="checkbox" name="menu" />
      <label class="MenuIcon" for="menu"></label>
      <h2 class="MenuHeader">Groupomania</h2>

      <nav class="Menu">
        <!-- <ul class="Menu-list">
      <li class="Menu-item"><a class="Menu-link" href="https://codepen.io/rthor" target="_blank">Visit Profile</a></li>
      <li class="Menu-item"><a class="Menu-link" href="http://rthor.is" target="_blank">Read Blog</a></li>
      <li class="Menu-item"><a class="Menu-link" href="https://github.com/rthor" target="_blank">Checkout Code</a></li>
    </ul> -->
        <div class="side-wrapper">
          <div class="side-title">MENU</div>
          <div class="side-menu">
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'home']" />
              Home
            </a>
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'book-open']" />
              News
            </a>
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
              Communauté
            </a>
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
              Posts
            </a>
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
              Utilisateurs
            </a>
          </div>
        </div>

        <div class="side-wrapper">
          <div class="side-title">Groupomania</div>
          <div class="side-menu">
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
              Hot
            </a>
            <a href="#">
              <font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" />
              Top Likes
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.container-header{
    display: flex;
    flex-direction: column;
}

#navbar {
  top: 0;
  width: 100%;
  height: 5rem;
  /* background-color: var(--bc); */
  /* display: grid;
  grid-template-columns: 1fr 30% 35% 1fr; */
  position: fixed;
  /* z-index: 500; */
}

.nav-right {
  height: 100%;
  grid-column: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* Navbar Items */
#navbar-items {
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.navbar-items {
  padding: 0;
  margin: 0.5em 0 2em 0;
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.no-desk {
  display: none;
}
.navbar-item {
  margin: 0 0.75em;
  line-height: 0;
  color: var(--white);
  font-size: 1.22rem;
  font-weight: 300;
  cursor: pointer;
}
.navbar-item-inner {
  margin: 0;
  text-decoration: none;
  color: var(--white);
  transition: color 0.3s;
}
.navbar-item-inner:hover {
  color: var(--primary);
}
.navbar-item-inner::after {
  border-bottom: 2px solid var(--primary);
  content: "";
  display: block;
  position: relative;
  left: 0;
  top: 6px;
  transition: width 0.3s;
  width: 0;
}
.navbar-item-inner:hover::after {
  width: 102%;
}

.HiddenCheckbox {
  display: none;
}

.MenuContainer {
  display: inline-block;
  margin: 20px;
}

.MenuHeader {
  color: #999;
  /* display: inline-block; */
  float: left;
  font-weight: 100;
  line-height: 30px;
  margin: 0 0 0 15px;
  opacity: 0;
  position: relative;
  transform: translate3d(0, -15px, 0);
  transition: transform 0.6s, opacity 0.5s;
  z-index: 2;
}

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

/* // * Hamburger changement detat */
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

/* // * Rend le menu visible */
.HiddenCheckbox:checked ~ .Menu {
  left: 0;
}

/* // * list menu */
.Menu {
  /* background: yellow; */
  bottom: 0;
  left: -90%;
  position: absolute;
  top: 70px;
  width: 50%;
  transition: left 0.4s;
}

.side-title {
  font-family: "DM Sans", sans-serif;
  color: #5c5e6e;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 20px;
}

.side-wrapper {
  padding: 30px;
}

.side-menu {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  white-space: nowrap;
}
.side-menu svg {
  margin-right: 16px;
  width: 16px;
}
.side-menu a {
  text-decoration: none;
  color: #9c9cab;
  display: flex;
  align-items: center;
}
.side-menu a:hover {
  color: #fff;
}
.side-menu a:not(:last-child) {
  margin-bottom: 20px;
}
/* // * list menu */
</style>