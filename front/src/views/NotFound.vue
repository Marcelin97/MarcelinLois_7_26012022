<template>
  <center>
    <h1>Cette page n'existe pas !</h1>
    <p>
      <router-link to="/wall">Retour sur le fil d'actualité ?</router-link>
    </p>
  </center>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
center {
  margin: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
</style>