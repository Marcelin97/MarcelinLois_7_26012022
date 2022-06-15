    <template>
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
      <div class="indicator"></div>

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
          <router-link class="dropdown-text" to="/user/parameter">Paramètres</router-link>
          <hr class="line" />
          <button class="dropdown-text logout" @click="logout">Déconnexion</button>
        </div>
      </div>
      <div class="indicator"></div>

      <label class="notification" for="notification">
        <font-awesome-icon
          class="icon notification bell"
          :icon="['fas', 'bell']"
        />
        <router-link class="text" to="#">Alerte</router-link>
      </label>
      <div class="indicator"></div>

      <label class="messagerie" for="messagerie">
        <font-awesome-icon
          class="icon messagerie"
          :icon="['fas', 'paper-plane']"
        />
        <router-link class="text" to="#">Chat</router-link>
      </label>
      <div class="indicator"></div>
    </nav>
  </div>
  <!-- Header navigation -->
</template>

<script>
export default {
  name: "HeaderNavigation",
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
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
  cursor: pointer;
  width: auto;
}

/* Hide the dropdown's content by default */
.dropdown__content {
  display: none;

  /* Position it right below the trigger element */
  left: 0;
  // padding-top: 4px;
  position: absolute;
  top: 100%;

  /* It should be on the top of other elements */
  background: white;
  z-index: 9999;

  /* Size */
  height: auto;
  width: 200px;

  // border-radius: 6px;
  transition: 0.5s;
  .dropdown-text {
    padding-bottom: 8px;
    padding-top: 8px;
    padding-left: 16px;
    padding-right: 16px;
    display: inline-block;
    transition: 0.5s;
    background: transparent;
    width: 100%;
    color: #00376b;
    &:hover {
      background: rgb(221, 220, 220);
      cursor: pointer;
    }
  }
  .logout{
    background:#00376b;
    font-weight: bold;
    border: none;
    color: #8de8fe;
        &:hover {
      background: red;
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
  z-index: -1;
}
/* Show the content when hover on the container */
.dropdown:hover .dropdown__content {
  display: block;
}

.line {
  background-color: #8de8fe;
  border: 0;
  height: 2px;
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

.container-nav {
  display: flex;
  justify-content: center;
}
.nav-header {
  position: relative;
  display: flex;
  width: 280px;
  height: 70px;
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
  width: auto;
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
input:nth-child(3):checked ~ label.notification .icon,
input:nth-child(4):checked ~ label.messagerie .icon {
  opacity: 0;
}

input:nth-child(1):checked ~ label.home .text,
input:nth-child(2):checked ~ label.find .text,
input:nth-child(3):checked ~ label.notification .text,
input:nth-child(4):checked ~ label.messagerie .text {
  opacity: 1;
  color: #45c2f8;
}

input:nth-child(1):checked ~ .indicator {
  transform: translateX(0);
}

input:nth-child(2):checked ~ .indicator {
  transform: translateX(70px);
}

input:nth-child(3):checked ~ .indicator {
  transform: translateX(130px);
}

input:nth-child(4):checked ~ .indicator {
  transform: translateX(210px);
}
</style>