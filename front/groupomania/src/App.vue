<template>
<main>
  <header></header>
  <section>
    <router-view/>
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
