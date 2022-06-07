<template>
  <div id="app">
    <section>
      <h1>{{ title }}</h1>
      <div v-if="!beers.length" class="loading">Loading...</div>

      <div :key="beer" v-for="beer in beers" class="beer-contain">
      <!-- image de la communauté -->
        <div class="beer-img">
          <img :src="beer.img" height="350" />
        </div>

        <!-- information de la communauté  -->
        <div class="beer-info">
          <h2>{{ beer.name }}</h2>
          <p class="bright">{{ beer.tagline }}</p>
          <p><span class="bright">Description:</span> {{ beer.desc }}</p>
          <p><span class="bright">Tips:</span> {{ beer.tips }}</p>
          <h3 class="bright">Food Pairings</h3>

          <ul>
            <li :key="item" v-for="item in beer.food">
              {{ item }}
            </li>
          </ul>
          
        </div>

      </div>

    </section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
        title: 'Voici la liste de toutes les communautés',
      bottom: false,
      beers: [],
    };
  },
  watch: {
    bottom(newValue) {
      if (newValue) {
        this.addBeer();
      }
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.addBeer();
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addBeer() {
      axios.get("https://api.punkapi.com/v2/beers/random").then((response) => {
        let api = response.data[0];
        let apiInfo = {
          name: api.name,
          desc: api.description,
          img: api.image_url,
          tips: api.brewers_tips,
          tagline: api.tagline,
          food: api.food_pairing,
        };
        this.beers.push(apiInfo);
        if (this.bottomVisible()) {
          this.addBeer();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  font-family: "Archivo Narrow", sans-serif;
  background: #25859a;
}

h1,
h2,
h3,
h4 {
  font-family: "Fjalla One", sans-serif;
}

h1 {
  margin-top: 40px;
  color: white;
  text-align: center;
}

.loading {
  color: white;
  text-align: center;
  font-size: 20px;
}

.display {
  display: flex;
  justify-content: center;
  align-content: center;
}

#app {
  @extend .display;
  flex-direction: column;
}

.beer-contain {
  @extend .display;
  width: 50%;
  margin: 20px 24%;
  box-shadow: 0 2px 3px 1px rgba(30, 0, 0, 0.1);
}

.beer-img {
  @extend .display;
  padding: 30px;
  background: #ff6542;
  border: 1px solid #88498f;
  border-right: 1px solid #f44822;
}

.beer-info {
  background: #564154;
  color: white;
  padding: 30px;
  border: 1px solid #88498f;
  .bright {
    color: #fcd7cf;
    font-family: "Contrail One", sans-serif;
  }
}

h3 {
  margin-bottom: 5px;
}

ul {
  margin-top: 5px;
}
</style>