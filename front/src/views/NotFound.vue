<template>
  <center>
    <h1>Cette page n'existe pas !</h1>
    <p>
      <!-- LINK TO NEWS FEED -->
      <router-link to="/wall" aria-label="Retour sur le fil d'actualité"
        >Retour sur le fil d'actualité ?</router-link
      >
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
