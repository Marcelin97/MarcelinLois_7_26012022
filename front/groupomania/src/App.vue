<template>
<main>
  <header></header>
  <section>
    <transition name="fade">
        <router-view></router-view>
      </transition>
    <router-/>
  </section>
  <footer></footer>
</main>

</template>

<script>

export default {
  name: "App",
};
</script>

<style lang="scss">
*{
background-color: rgb(12, 19, 31);
}
  
</style>
