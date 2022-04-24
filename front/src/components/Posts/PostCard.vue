<template>
  <section>
    <div class="container">
      <div>
        <!-- Dropdown button -->
        <div class="wrapper">
          <input type="checkbox" id="input" />
          <label for="input" class="button-dropdown">
            <div class="menu__item--meatball">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </label>
          <div class="menu">
            <ul>
              <li><a href="#">Signaler</a></li>
              <li><a href="#">S'abonner</a></li>
            </ul>
          </div>
        </div>
        <!-- Dropdown button -->

        <!-- Post -->
        <div class="card">
          <h2>Post 1</h2>
          <h3>Community</h3>
          <font-awesome-icon
            class="icon fas fa-arrow-right"
            :icon="['fas', 'arrow-right']"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum hic
            suscipit soluta nobis laudantium, autem eum dolor adipisci tempora
            odit ratione vero assumenda nisi magni cupiditate cum. Pariatur,
            aperiam sapiente.
          </p>
          <div class="pic"></div>
          <div class="icons">
            <font-awesome-icon
              v-on:click="like()"
              counter
              value="1"
              position="top-right"
              class="icon icon-1"
              :icon="['fas', 'thumbs-up']"
            />{{ loveCount }}
            <font-awesome-icon
              v-on:click="Dislike()"
              counter
              value="1"
              position="top-right"
              class="icon icon-2"
              :icon="['fas', 'thumbs-down']"
            />{{ dislikeCount }}
            <font-awesome-icon
              class="icon icon-4"
              :icon="['fas', 'bookmark']"
            />
          </div>

          <!-- author of the post -->
          <div class="author">
            <h4>author</h4>
            <img
              src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
              alt=""
              class="profile-cover"
              loading="lazy"
            />
          </div>

          <!-- view profil of the author -->
          <button></button>
        </div>

        <!-- comments -->
        <div class="container-comments">
          <div class="comments-header">
            <font-awesome-icon class="icon icon-3" :icon="['fas', 'comment']" />
            <p>
              {{ message }}
            </p>

            <!-- typing indicator -->
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <!-- typing indicator -->
          </div>

          <!-- comments -->
          <div>
            <ul class="comment-wrapper">
              <li
                class="comment"
                v-bind:title="message"
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :user="user"
              >
                <font-awesome-icon
                  :class="{ active: likedComment }"
                  v-on:click="upvote()"
                  counter
                  value="1"
                  :icon="['fas', 'thumbs-up']"
                />
                <span>{{ loveCommentCount }}</span>

                <font-awesome-icon
                  :class="{ active: dislikedComment }"
                  v-on:click="downvote()"
                  counter
                  value="1"
                  :icon="['fas', 'thumbs-down']"
                />
                <span>{{ dislikeCommentCount }}</span>

                <div class="comment-text">
                  <!-- <img :src="comment.authorImg" class="post-img" /> -->
                  <p>{{ comment.author.name }}</p>
                  <small>{{ comment.created_at }}</small>
                  <p>{{ comment.content }}</p>
                  <!-- <button v-if="editable">Edit</button> -->
                </div>
                
              </li>
            </ul>

            <!-- write a new comment -->
            <label for="writeComment"></label>
            <input
              placeholder="Ajouter un commentaire..."
              type="text"
              maxlength="250"
              required="true"
              id="writeComment"
              v-model="newComment"
              @keyup.enter="submitComment"
            />
            <!-- BTN submit new comment -->
            <span class="input-group-btn">
              <button
                class="btn btn-primary"
                type="button"
                @click="postComment"
              >
                Submit
              </button>
            </span>
          </div>
        </div>
        <!-- comments -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
    comment: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      message: "Commentaires",
      loveCount: 0,
      liked: false,
      dislikeCount: 0,
      disliked: false,
      newComment: "",
      loveCommentCount: 0,
      likedComment: false,
      dislikeCommentCount: 0,
      dislikeComment: false,
      //Some info about the current user
      current_user: {
        avatar: "http://via.placeholder.com/100x100/a74848",
        user: "exampler",
      },
      comments: [
        {
          id: 1,
          content: "Un premier commentaire",
          edited: false,
          created_at: new Date().toLocaleString(),
          // author: "Drake",
          author: {
            id: 1,
            name: "Nick Basile",
          },
        },
        {
          id: 2,
          content: "J'aime ce post",
          edited: false,
          created_at: new Date().toLocaleString(),
          // author: "Pharell Williams",
          author: {
            id: 1,
            name: "Drake",
          },
        },
      ],
    };
  },
  methods: {
    like() {
      // this.love++;
      // if (this.dislike != 0) this.dislike--;
      this.liked = !this.liked && !this.disliked;
      this.liked ? this.loveCount++ : this.loveCount--;
    },
    Dislike() {
      // this.dislike++;
      // if (this.love != 0) this.love--;
      this.disliked = !this.disliked && !this.liked;
      this.disliked ? this.dislikeCount++ : this.dislikeCount--;
    },
    postComment: function () {
      this.comments.push({
        content: this.newComment,
        created_at: new Date().toLocaleString(),
        author: {
          id: this.user.id,
          name: this.user.name,
        },
        votes: 0,
      });
      this.newComment = "";
    },
    upvote() {
      this.likedComment = !this.likedComment && !0;
      this.likedComment ? this.loveCommentCount++ : this.loveCommentCount--;
    },
    downvote() {
      this.dislikedComment = !this.dislikedComment;
      this.dislikedComment
        ? this.dislikeCommentCount++
        : this.dislikeCommentCount--;
    },
  },
  computed: {
    // a computed property to check if the current user can edit this comment.
    editable() {
      return this.user.id === this.comment.author.id;
    },
  },
};
</script>
<style lang="scss" scoped>
// comment
.container-comments {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 1rem;
  position: absolute;
}

.comments-header {
  display: flex;
  flex-direction: row;
}
// typing indicator
.typing-indicator {
  width: auto;
  margin-left: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  span {
    height: 4px;
    width: 4px;
    margin: 0 1px;
    background-color: #08708a;
    // display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s blink infinite ($i * 0.3333s);
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

.comment-wrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.comment {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  padding: 1rem;
  background: #292929;
  // border:2px solid #292929;
  // border-bottom: 10px dashed #292929;
  padding: 20px;
}

.comment-text {
  flex-direction: column;
  margin-left: 0.8rem;
}

// meatball buttons
.menu__item--meatball {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: transparent;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover,
  &:focus {
    transform: rotate(45deg);
  }
}

.circle {
  width: 6px;
  height: 6px;
  margin: 3px;
  background: #08708a;
  border-radius: 50%;
}
// end meatball button

// Dropdown button
.wrapper {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.button-dropdown {
  position: relative;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
}

#input {
  position: absolute;
  transform: scale(0);
}

.menu {
  overflow: hidden;
  position: absolute;
  z-index: 999;
  background: transparent;
  border-radius: 8px;
  margin-top: 25px;
  ul {
    width: 100%;
    margin: 0;
    transform: translateY(-100%);
    list-style: none;
    transition: all 0.3s;
    background: #08708a;
    li {
      display: flex;
      align-items: center;
      width: inherit;
      padding: 0 10px;
      background: #08708a;
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

#input:checked ~ .menu ul {
  transform: translateY(0);
}

#input:checked ~ .menu ul li a {
  background: #08708a;
}
// End Dropdown button

$img-url: "https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80";
$img-url2: "https://images.unsplash.com/photo-1528785198459-ec50485704c7?ixlib=rb-0.3.5&s=3a2fc3039516555bbb2e9cd2967bd321&auto=format&fit=crop&w=1537&q=80";

h3 {
  width: 100%;
  font-size: 1.075rem;
}
.author {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70px;
  @media only screen and (min-width: 576px) {
    width: 100px;
  }
  h4 {
    background-color: transparent;
    z-index: 100;
    position: absolute;
    bottom: 0;
    font-size: 0.8rem;
    pointer-events: none;
  }
  .profile-cover {
    margin-bottom: 0.5rem;
    z-index: 100;
    position: absolute;
    bottom: 1rem;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    @media only screen and (min-width: 576px) {
      width: 34px;
      height: 34px;
    }
  }
}
.pic-author {
  position: absolute;
  z-index: 100;
  height: 30px;
  width: 30px;
  object-fit: cover;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .card {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin-top: 20px;
    @media only screen and (min-width: 576px) {
      width: 530px;
    }

    h2 {
      background-color: transparent;
      z-index: 100;
      position: absolute;
      bottom: 0;
      right: 6rem;
      font-size: 1.2rem;
      pointer-events: none;
      @media only screen and (min-width: 576px) {
        right: 10rem;
      }
    }

    .fa-arrow-right {
      background-color: transparent;
      z-index: 100;
      position: absolute;
      right: 35px;
      bottom: 25px;
      font-size: 20px;
      cursor: pointer;
    }
    p {
      display: flex;
      height: 100px;
      align-items: center;
      background-color: transparent;
      z-index: 99;
      opacity: 0.7;
      font-size: 0.7rem;
      transition: all 0.2s ease;
      @media only screen and (min-width: 576px) {
        position: absolute;
        width: 125px;
        right: 35px;
        top: 54px;
        // height: 75%;
        // writing-mode: vertical-rl;
      }
    }
    .pic {
      object-fit: cover;
      width: 300px;
      height: 200px;
      border-radius: 20px 4px;
      background-image: url($img-url);
      background-size: 100% 100%;
      filter: grayscale(100%);
      @media only screen and (min-width: 576px) {
        width: 400px;
        height: 300px;
      }
    }

    .icons {
      width: 180px;
      height: 64px;
      left: 60px;
      top: 7rem;
      background-color: transparent;
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      @media only screen and (min-width: 576px) {
        top: 0.5rem;
      }
    }

    .icon-1 {
      transition-delay: 0.7s;
    }

    .icon-2 {
      transition-delay: 0.6s;
    }

    .icon-3 {
      transition-delay: 0.5s;
    }
    .icon-4 {
      transition-delay: 0.4s;
    }

    &:hover .icon {
      opacity: 1;
      transform: scale(1);
    }

    button {
      position: absolute;
      right: 14px;
      bottom: 14px;
      width: 30px;
      height: 30px;
      background-color: red;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      outline: none;
      transition: all 0.3s ease;
      mix-blend-mode: hard-light;
    }

    &:hover button {
      transform: scale(4.2);
      @media only screen and (min-width: 576px) {
        transform: scale(16.5);
      }
    }

    &:hover .pic {
      filter: grayscale(0);
    }
  }
}

// common to several icon
.icon {
  background: transparent;
  opacity: 0;
  font-size: 18px;
  will-change: transform;
  transform: scale(0.1);
  transition: all 0.2s ease;
}
</style>