<template>
  <div>
    <div class="home">
      <HelloWorld msg="Bienvenue sur Groupomania" />
    </div>
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
          <img src="../assets/img/icon.svg" alt="Logo de l'entreprise" />
        </div>
      </div>
      <div class="login">
        <h1>Groupomania<span class="blinker">'</span></h1>
        <p>
          Créer un compte et retrouvez tous vos collègues,
          communautés, posts,...
        </p>
        <div class="actions">
          <router-link class="nav btn" to="/signup" aria-label="Aller sur la page d'inscription"
            >Créer un compte</router-link
          >
          <router-link class="nav btn-login btn" to="/login" aria-label="Aller sur la page de connexion"
            >Connexion</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home-View",
};
</script>

<style lang="scss" scoped>
.container {
  padding: 50px;
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
  margin-top: 2rem;
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
    font-weight: bolder;
    letter-spacing: 0.3rem;
    font-size: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    border-bottom: 1px solid #4e5166;
    padding-bottom: 3vh;
    span {
      font-size: 1.4rem;
    }
    @media only screen and (min-width: 576px) {
      display: flex;
      flex-direction: column;
    }
  }
  p {
    font-size: 0.8rem;
    font-weight: 700;
    text-align: center;
    margin: 2rem 0;
    line-height: 1.5rem;
    border-bottom: 1px solid #4e5166;
    padding-bottom: 3vh;
  }

  .blinker {
    animation: blink 2s infinite linear;
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
.btn-login {
  border: 2px solid #ffd7d7;
  background-color: transparent;
  transition: background-color 0.65s;
  &:hover {
    background-color: #ffd7d7;
  }
}

// animations
@keyframes blink {
  49.99% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
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
