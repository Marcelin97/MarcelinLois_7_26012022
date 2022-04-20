<template>
  <section>
    <!-- Publication -->
    <div class="container">
      <!-- Dropdown button -->
      <div class="wrapper">
        <input type="checkbox" id="input" />
        <label for="input" class="button-dropdown">
          <span class="text"> Paramètre </span>
          <span class="icon-dropdown"></span>
        </label>
        <div class="menu">
          <ul>
            <li><a href="#">Signaler</a></li>
            <li><a href="#">S'abonner</a></li>
          </ul>
        </div>
      </div>
      <!-- Dropdown button -->
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
          <router-link to="/post/postId/comment"><font-awesome-icon class="icon icon-3" :icon="['fas', 'comment']" /></router-link>
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
      </div>
      <!-- Buttons -->
      <div class="buttons">
        <router-link class="btn" to="post/:id/update">update</router-link>
        <router-link to=""><FollowBtn /></router-link>
        <router-link to="post/:id/delete"><DeleteBtn /></router-link>
      </div>
      <!-- Buttons -->
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
    FollowBtn,
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
// Dropdown button
.wrapper {
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7rem;
}

.button-dropdown {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 80px;
  width: 230px;
  padding: 0 30px;
  border-radius: 10px;
  color: #f7f7f7;
  background: #322d3a;
}

.text {
  font-size: 19px;
  background: #322d3a;
}

.icon-dropdown {
  position: relative;
  width: 20px;
  height: 20px;
  background: #322d3a;
}

.icon-dropdown::before {
  top: 6px;
}
.icon-dropdown::after {
  top: 5px;
}
.icon-dropdown::before,
.icon-dropdown::after {
  content: " ";
  position: absolute;
  left: 11px;
  width: 3px;
  height: 10px;
  border-radius: 1px;
  background: #fff;
  transition: all 0.3s;
}

.icon-dropdown::before {
  transform: translate(-5px, 0) rotate(-45deg);
}

.icon-dropdown::after {
  transform: translate(0, 0) rotate(45deg);
}

input {
  position: absolute;
  transform: scale(0);
}

.menu {
  overflow: hidden;
  position: absolute;
  z-index: 1;
  top: 70px;
  left: 0;
  width: 100%;
  ul {
    width: 100%;
    margin: 0;
    padding: 24px 0 0;
    border-radius: 0 0 10px 10px;
    transform: translateY(-100%);
    list-style: none;
    transition: all 0.3s;
    li {
      display: flex;
      align-items: center;
      width: inherit;
      padding: 0 10px;
    }
  }
}

.menu li:not(:last-child) {
  margin-bottom: 6px;
}

.menu li > a {
  display: flex;
  align-items: center;
  width: inherit;
  height: 44px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 17px;
  color: #f7f7f7;
  cursor: pointer;
  transition: all 0.25s;
}

.menu li > a:hover {
  background: #312b3a;
}

input:checked ~ .menu ul {
  transform: translateY(0);
}

input:checked ~ .button-dropdown {
  background: #4461fd;
}

input:checked ~ .button-dropdown .icon-dropdown::before {
  transform: translate(-3px, 0) rotate(-45deg) scaleY(2);
}

input:checked ~ .button-dropdown .icon-dropdown::after {
  transform: translate(-3px, 0) rotate(45deg) scaleY(2);
}

// Publication

$img-url: "https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80";

.container {
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px 25px;
  width: auto;
}
.card {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  @media only screen and (min-width: 576px) {
    width: 530px;
  }
  h2 {
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

  figure {
    display: flex;
    justify-content: center;
    @media only screen and (min-width: 768px) {
      justify-content: flex-start;
    }
    .pic {
      width: 250px;
      height: auto;
      border-radius: 20px 4px;
      background-image: url($img-url);
      background-size: 100% 100%;
      @media only screen and (min-width: 576px) {
        width: 500px;
      }
    }
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

    .icons {
      height: 64px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @media only screen and (min-width: 576px) {
        top: 0.5rem;
      }
      .icon {
        margin-right: 1rem;
        background: transparent;
        font-size: 18px;
        will-change: transform;
        transition: all 0.2s ease;
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
}

// buttons
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 2rem;
    @media only screen and (min-width: 576px) {
    flex-direction: row;
  }
}
</style>