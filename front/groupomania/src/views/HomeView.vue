<template>
  <section>
    <div class="load">
      <LoaderHome />
    </div>
    <div class="home">
      <!-- <font-awesome-icon :icon="['fas', 'user-secret']"  /> -->
      <HelloWorld msg="Bienvenue sur Groupomania" />
    </div>
    <nav>
      <router-link class="nav" to="/about">Découvrir</router-link>
      <router-view />
    </nav>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LoaderHome from "@/components/Loader.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    LoaderHome,
  },
};
</script>

<style scoped lang="scss">
.load {
  margin-bottom: 5em;
}
nav{ 
  display:flex;
  justify-content:flex-end;
}
.nav {
  display:flex;
align-items:center;
    padding: 0 1.5rem;
    border-radius: 2rem;
    font-size: 1rem;
    color: #0c131f;
    min-height: 3rem;
    background-color: #8de8fe;
    transition: background .25s;
    &:hover{
      background-color: #62c5de;
    }
}
</style>
