<template>
  <!-- CONTAINER OF CARDS DRAGS HORIZONTAL -->
  <div class="container-cards">
    <div>
      <div class="cards scroll-container">
        <div class="card">
          <div>
            <img
              src="https://img.discogs.com/Sfz2Jim0byBu1JAA7lKX2kuR7Jk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-1472585-1612815883-2680.jpeg.jpg"
              alt=""
              class="img-card-drag"
            />
          </div>
          <br />
          <p>
            <strong>Communauté 1</strong>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  z-index: 1;
  margin: 20px;
  display: flex;
  background-color: transparent;
  max-width: 100%;
  padding: 1em;
}

.card {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  margin-right: 1em;
  padding: 10px;
  flex: 1 0 10em;
}

.img-card-drag {
  height: 160px;
  width: 160px;
  border-radius: 10px;
}

/* SCROLL CONTAINER */
.scroll-container {
  overflow: scroll;
  height: 250px;
  width: auto;
  overflow-y: hidden;
  transition: 1s;
}
.scroll-container::-webkit-scrollbar {
  width: 18px;
  cursor: pointer;
}
/* Track */
.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 18px;
}
/* Handle */
.scroll-container::-webkit-scrollbar-thumb {
  background: #f16b50;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease-out;
  // -webkit-appearance: none;
}
.scroll-container::-webkit-scrollbar-thumb::hover {
  transform: rotate(45deg);
}
</style>