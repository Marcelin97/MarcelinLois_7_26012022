<template>
  <section>
      <!-- Dropdown button -->
    <div class="wrapper">
      <input type="checkbox" id="input" />
      <label for="input" class="button">
        <span class="text"> Paramètre </span>
        <span class="icon"></span>
      </label>
      <div class="menu">
        <ul>
          <li><a href="#">Signaler</a></li>
          <li><a href="#">S'abonner</a></li>
        </ul>
      </div>
    </div>
    <!-- Dropdown button -->

    <!-- Publication -->
    <div class="container">
      <div class="card">
        <h2>Post 1</h2>
        <h3>Community id</h3>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80"
            alt="Chambre verte avec grand miroir"
            class="pic"
          />
        </figure>
        <div class="container-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum hic
            suscipit soluta nobis laudantium, autem eum dolor adipisci tempora
            odit ratione vero assumenda nisi magni cupiditate cum. Pariatur,
            aperiam sapiente.
          </p>
          <div class="icons">
            <font-awesome-icon
              v-on:click="like()"
              counter
              value="1"
              position="top-right"
              class="icon icon-1"
              :icon="['fas', 'thumbs-down']"
            />{{ love }}
            <font-awesome-icon
              v-on:click="Dislike()"
              counter
              value="1"
              position="top-right"
              class="icon icon-2"
              :icon="['fas', 'heart']"
            />{{ dislike }}
            <font-awesome-icon class="icon icon-3" :icon="['fas', 'comment']" />
            <font-awesome-icon
              class="icon icon-4"
              :icon="['fas', 'bookmark']"
            />
          </div>
          <div class="author">
            <img
              src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
              alt=""
              class="profile-cover"
            />
            <h4>author</h4>
          </div>
        </div>
        <!-- Buttons -->
        <div class="buttons">
          <button class="btn">
            <router-link to="post/:id/update">update</router-link>
          </button>
          <router-link to=""><FollowBtn/></router-link>
          <router-link to="post/:id/delete"><DeleteBtn /></router-link>
        </div>
        <!-- Buttons -->
      </div>
    </div>
    <!-- Publication -->
  </section>
</template>

<script>
import DeleteBtn from "@/components/Base/DeleteBtn.vue";
import FollowBtn from "@/components/Base/FollowBtn.vue";

export default {
  components: {
    DeleteBtn,
    FollowBtn
  },
  data() {
    return {
      love: "",
      dislike: "",
    };
  },
  methods: {
    like() {
      this.love++;
      if (this.dislike != 0) this.dislike--;
    },
    Dislike() {
      this.dislike++;
      if (this.love != 0) this.love--;
    },
  },
};
</script>
<style lang="scss" scoped>
// buttons
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

$img-url: "https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80";

.container {
  //   width: 240px;
  //   height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px 25px;
}
.card {
  // overflow: hidden;
  margin-bottom: 5px;
  @media only screen and (min-width: 576px) {
    width: 530px;
  }
  h2 {
    //   background-color: transparent;
    width: 100%;
    font-size: 1.5rem;
    pointer-events: none;
    margin-bottom: 0.5rem;
  }
  h3 {
    margin-bottom: 0.5rem;
    width: 100%;
    font-size: 1.075rem;
  }
  .pic {
    width: 250px;
    height: auto;
    border-radius: 20px 4px;
    background-image: url($img-url);
    background-size: 100% 100%;
  }
  .container-text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    p {
      align-items: center;
      opacity: 0.7;
      font-size: 0.7rem;
      transition: all 0.2s ease;
    }
  }
  .icons {
    height: 64px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media only screen and (min-width: 576px) {
      top: 0.5rem;
    }
  }

  .author {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 70px;
    .profile-cover {
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      @media only screen and (min-width: 576px) {
        width: 64px;
        height: 64px;
      }
    }
    h4 {
      background-color: transparent;
      font-size: 0.8rem;
      pointer-events: none;
    }
  }
}

.icon {
  background: transparent;
  opacity: 0;
  font-size: 18px;
  will-change: transform;
  transform: scale(0.1);
  transition: all 0.2s ease;
}
</style>