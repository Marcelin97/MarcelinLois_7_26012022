<template>
  <nav>
    <GoBack />
  </nav>
  <div class="container">
    <div class="connect-wrap">
      <div class="extras">
        <span>🤟</span>
        <span>😂</span>
        <span>😘</span>
        <span>🤪</span>
        <span>🥳</span>
      </div>
      <div class="smiley">
        <img src="../assets/img/logo.svg" alt="" />
      </div>
    </div>
    <div class="login">
      <h1>Un seul identifiant</h1>
      <p>
        Avec votre compte Groupomania retrouvez tous vos collègues, communautés,
        posts,...
      </p>
      <div class="actions">
        <router-link class="nav btn" to="/signup"
          >Créer un compte</router-link
        >
        <router-link class="nav btn-login btn" to="/login"
          >Connexion</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import GoBack from "@/components/Base/GoBack.vue";

export default {
  name: "Account-View",
  components: {
    GoBack,
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.container {
  padding: 50px;
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
}

.connect-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease-in-out 0s;
  @media only screen and (min-width: 768px) {
    margin: 0 auto;
  }
}

.connect-wrap .extras {
  position: absolute;
  span {
    position: inherit;
    width: 30px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
  }
}

.connect-wrap .extras span:nth-child(1) {
  animation: emoji-1 6s infinite forwards;
}

.connect-wrap .extras span:nth-child(2) {
  animation: emoji-2 7s infinite forwards;
}

.connect-wrap .extras span:nth-child(3) {
  animation: emoji-3 8s infinite forwards;
}

.connect-wrap .extras span:nth-child(4) {
  animation: emoji-4 9s infinite forwards;
}

.connect-wrap .extras span:nth-child(5) {
  animation: emoji-5 7s infinite forwards;
}

img {
  height: 80px;
  line-height: 80px;
  animation: extra 2s forwards;
  @media only screen and (min-width: 576px) {
    height: 100px;
  }
}

.login {
  @media only screen and (min-width: 576px) {
    width: 420px;
    margin: 0 auto;
  }
  @media only screen and (min-width: 992px) {
    width: 600px;
  }
  h1 {
    margin: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.3rem;
    font-size: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    border-bottom: 1px solid hsla(0deg, 0%, 100%, 0.1);
    padding-bottom: 3vh;
    @media only screen and (min-width: 576px) {
      display: flex;
      flex-direction: column;
    }
  }
  p {
    font-size: 0.8rem;
    font-weight: lighter;
    text-align: center;
    margin: 2rem 0;
    line-height: 1.5rem;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    padding-bottom: 3vh;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 2rem;
  @media only screen and (min-width: 576px) {
    flex-direction: row;
  }
}
.nav {
  margin-bottom: 2rem;
}
.btn-login {
  color: #f7f7f7;
  border: 2px solid #fd2d01;
  background: transparent;
  transition: color, background 0.35s;
  &:hover {
    background: #ffd7d7;
    color: black;
  }
}

// animations
@keyframes emoji-1 {
  0% {
    transform: translate(0) scale(0);
  }
  30% {
    transform: translate(0) scale(0);
  }
  40% {
    transform: translate(-100px, 0) scale(1);
  }
  100% {
    transform: translate(-100px, 0) scale(1);
  }
}

@keyframes emoji-2 {
  0% {
    transform: translate(0) scale(0);
  }
  30% {
    transform: translate(0) scale(0);
  }
  50% {
    transform: translate(-80px, -50px) scale(1);
  }
  100% {
    transform: translate(-80px, -50px) scale(1);
  }
}

@keyframes emoji-3 {
  0% {
    transform: translate(0) scale(0);
  }
  30% {
    transform: translate(0) scale(0);
  }
  40% {
    transform: translate(-15px, -60px) scale(1);
  }
  100% {
    transform: translate(-15px, -60px) scale(1);
  }
}

@keyframes emoji-4 {
  0% {
    transform: translate(0) scale(0);
  }
  30% {
    transform: translate(0) scale(0);
  }
  50% {
    transform: translate(50px, -50px) scale(1);
  }
  100% {
    transform: translate(50px, -50px) scale(1);
  }
}

@keyframes emoji-5 {
  0% {
    transform: translate(0) scale(0);
  }
  30% {
    transform: translate(0) scale(0);
  }
  40% {
    transform: translate(70px, 10px) scale(1);
  }
  100% {
    transform: translate(70px, 10px) scale(1);
  }
}

@keyframes extra {
  0% {
    transform: scale(0);
  }
  40% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
