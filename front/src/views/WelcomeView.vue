<template>
  <section>
    <div class="load">
      <LogoHome />
    </div>
    <div class="home">
      <HelloWorld msg="Bienvenue sur Groupomania" />
    </div>

    <nav>
      <!-- <router-view/> -->
      <router-link class="btn button" to="/account">Découvrir</router-link>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.load {
  margin-bottom: 5em;
}
.home {
  margin: 120px 30px;
}
nav {
  display: flex;
  justify-content: flex-end;
}
</style>
