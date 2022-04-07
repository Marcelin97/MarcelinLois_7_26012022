<template>
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
        <router-link class="nav" to="/account">Créer un compte</router-link>
        <router-link class="nav" to="/account">Connexion</router-link>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 576px) {
    flex-direction: row;
    font-size: 2rem;
  }
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-right: 2rem;
  max-width: 200px;
  min-width: 200px;
  padding: 0 1.5rem;
  border-radius: 2rem;
  font-size: 1rem;
  color: #0c131f;
  min-height: 3rem;
  background-color: #8de8fe;
  transition: background 0.25s;
  &:hover {
    background-color: #62c5de;
  }
}
.container {
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 576px) {
    flex-direction: row;
  }
}

.login {
  @media only screen and (min-width: 576px) {
    width: 420px;
    margin-left: 90px;
  }
  h1 {
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    padding-bottom: 3vh;
    font-size: 1.4rem;
    font-weight: bolder;
    margin: 2rem 0;
    line-height: 2rem;
    letter-spacing: 0.1rem;
    @media only screen and (min-width: 576px) {
      display: flex;
      flex-direction: column;
    }
  }
  p {
    line-height: 1.5rem;
    letter-spacing: 0.1rem;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    padding-bottom: 3vh;
  }
}
.connect-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  // position: fixed;
  transition: all 0.4s ease-in-out 0s;
  @media only screen and (min-width: 576px) {
    margin-left: 100px;
  }
}

.connect-wrap .extras {
  position: absolute;
  span {
    position: inherit;
  }
}

.connect-wrap .extras span {
  width: 30px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background-color: #8de8fe;
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
  animation: extra 4s forwards;
  @media only screen and (min-width: 576px) {
    height: 100px;
  }
}

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
