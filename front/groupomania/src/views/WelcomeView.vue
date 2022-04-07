<template>
  <section>
    <div class="load">
      <LogoHome />
    </div>
    <div class="home">
      <!-- <font-awesome-icon :icon="['fas', 'user-secret']"  /> -->
      <HelloWorld msg="Bienvenue sur Groupomania" />
    </div>
    <nav>
      <!-- <router-view/> -->
      <router-link class="nav" to="/account">Découvrir</router-link>
    </nav>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LogoHome from "@/components/Logo.vue";

export default {
  name: "WelcomeView",
  components: {
    HelloWorld,
    LogoHome,
  },
};
</script>

<style scoped lang="scss">
.load {
  margin-bottom: 5em;
}
.home{
  margin: 120px 30px;
}
nav {
  display: flex;
  justify-content: flex-end;
}
.nav {
  display: flex;
  align-items: center;
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
</style>
