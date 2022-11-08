<template>
  <div class="header">
    <router-link to="/wall" class="logo">
      <img src="../../assets/img/icon.svg" alt="Logo de l'entreprise Groupomania" />
    </router-link>

    <input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
    <label for="menu-icon"></label>

    <nav class="nav">
      <ul>
        <li>
          <router-link to="/wall">Accueil</router-link>
        </li>
        <li>
          <router-link to="/user">Profil</router-link>
        </li>
        <li>
          <router-link to="/user/parameter">Paramètres</router-link>
        </li>
        <li>
          <button @click="logout">Déconnexion</button>
        </li>
      </ul>
    </nav>
  </div>
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
.header {
  display: flex;
  flex-basis: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  position: relative;
}

.logo img {
  height: 90px;
  width: auto;
  margin: 1rem;
}

.menu-icon {
  height: 30px;
  width: 30px;
  position: relative;
  z-index: 2;
  cursor: pointer;
  display: block;
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: absolute;
  left: -9999px;
}

.menu-icon:checked+label {
  position: relative;
}

.menu-icon:checked+label,
.menu-icon:not(:checked)+label {
  cursor: pointer;
  z-index: 10;
  margin: 3rem 3rem 3rem 0rem;
}

.menu-icon:checked+label:before,
.menu-icon:not(:checked)+label:before {
  content: "";
  display: block;
  width: 30px;
  height: 4px;
  z-index: 20;
  top: 0;
  left: 0;
  border-top: 3px solid #ffd7d7;
  border-bottom: 2px solid #ffd7d7;
  transition: border-width 10ms 150ms ease,
    top 100ms 160ms cubic-bezier(0.23, 1, 0.32, 1),
    height 100ms 160ms cubic-bezier(0.23, 1, 0.32, 1),
    background-color 20ms ease, transform 20ms cubic-bezier(0.23, 1, 0.32, 1);
}

.menu-icon:checked+label:after,
.menu-icon:not(:checked)+label:after {
  content: "";
  display: block;
  height: 2px;
  z-index: 20;
  top: 10px;
  right: 4px;
  background-color: #ffd7d7;
  margin-top: -1px;
  transition: width 10ms 175ms ease, right 10ms 175ms ease,
    margin-top 10ms ease, transform 20ms cubic-bezier(0.23, 1, 0.32, 1);
}

.menu-icon:checked+label:before {
  top: 10px;
  transform: rotate(45deg);
  height: 2px;
  background-color: #ffd7d7;
  border-width: 0;
  transition: border-width 10ms 34ms ease,
    top 10ms 30ms cubic-bezier(0.23, 1, 0.32, 1),
    height 10ms 30ms cubic-bezier(0.23, 1, 0.32, 1),
    background-color 20ms 50ms ease,
    transform 20ms 170ms cubic-bezier(0.23, 1, 0.32, 1);
}

.menu-icon:checked+label:after {
  width: 30px;
  margin-top: 0;
  right: 0;
  transform: rotate(-45deg);
  transition: width 10ms ease, right 10ms ease, margin-top 10ms 50ms ease,
    transform 20ms 170ms cubic-bezier(0.23, 1, 0.32, 1);
}

.nav {
  position: absolute;
  top: 24px;
  right: 28px;
  display: block;
  width: 70px;
  height: 70px;
  padding: 0;
  margin: 0;
  z-index: 9;
  overflow: hidden;
  opacity: 0.8;
  box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.3);
  background-color: #000;
  animation: border-transform 7s linear infinite;
  transition: top 35ms 110ms cubic-bezier(0.23, 1, 0.32, 1),
    right 35ms 110ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 25ms 110ms ease,
    width 65ms 40ms cubic-bezier(0.23, 1, 0.32, 1),
    height 65ms 40ms cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes border-transform {

  0%,
  100% {
    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  }

  14% {
    border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
  }

  28% {
    border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
  }

  42% {
    border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
  }

  56% {
    border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
  }

  70% {
    border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
  }

  84% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
  }
}

.menu-icon:checked~.nav {
  animation-play-state: paused;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 200%;
  height: 200%;
  transition: top 300ms 600ms cubic-bezier(0.23, 1, 0.32, 1),
    right 300ms 600ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms 600ms ease,
    width 700ms 900ms cubic-bezier(0.23, 1, 0.32, 1),
    height 700ms 900ms cubic-bezier(0.23, 1, 0.32, 1);
}

.nav ul {
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  z-index: 6;
  text-align: center;
  transform: translateY(-50%);
}

.nav ul li {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  margin: 10px 0;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 250ms linear;
}

.nav ul li:nth-child(1) {
  transition-delay: 200ms;
}

.nav ul li:nth-child(2) {
  transition-delay: 150ms;
}

.nav ul li:nth-child(3) {
  transition-delay: 100ms;
}

.nav ul li:nth-child(4) {
  transition-delay: 50ms;
}

.nav ul li a,
.nav ul li button {
  font-size: 7vh;
  text-transform: uppercase;
  line-height: 1.2;
  font-weight: 800;
  display: inline-block;
  position: relative;
  color: #95989a;
  transition: all 250ms linear;
}

.nav ul li button {
  color: #000;
  cursor: pointer;
  border: none;
  background: #ffd7d7;

  &:hover {
    background: #95989a;
  }
}

.nav ul li a:hover {
  color: #ffd7d7;
}

.nav ul li a:after {
  display: block;
  position: absolute;
  top: 50%;
  content: "";
  height: 2vh;
  margin-top: -1vh;
  width: 0;
  left: 0;
  background-color: #353746;
  opacity: 0.8;
  transition: width 250ms linear;
}

.nav ul li a:hover:after {
  width: 100%;
}

.menu-icon:checked~.nav ul li {
  pointer-events: auto;
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 350ms ease, transform 250ms ease;
}

.menu-icon:checked~.nav ul li:nth-child(1) {
  transition-delay: 1400ms;
}

.menu-icon:checked~.nav ul li:nth-child(2) {
  transition-delay: 1480ms;
}

.menu-icon:checked~.nav ul li:nth-child(3) {
  transition-delay: 1560ms;
}

.menu-icon:checked~.nav ul li:nth-child(4) {
  transition-delay: 1640ms;
}

@media screen and (max-width: 768px) {
  .nav {
    right: 30px;
  }

  .nav ul li a,
  .nav ul li button {
    font-size: 6vh;
  }
}
</style>
