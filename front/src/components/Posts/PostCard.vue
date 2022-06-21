<template>
  <section>
    <div class="scroll-down-mouse">
      <ScrollDownMouse />
    </div>

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
              <!-- <li><a href="#">S'abonner</a></li> -->
              <li><router-link to="#">Voir le profil</router-link></li>
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
            />
            <span class="icon icon-1">{{ loveCount }}</span>
            <font-awesome-icon
              v-on:click="Dislike()"
              counter
              value="1"
              position="top-right"
              class="icon icon-2"
              :icon="['fas', 'thumbs-down']"
            />
            <span class="icon icon-2">{{ dislikeCount }}</span>
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

        <!-- comments structure -->
        <div class="container-comments">
          <div class="comments-header">
            <font-awesome-icon
              class="icon-comment"
              :icon="['fas', 'comment']"
            />
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
          <div class="comment-list">
            <ul class="comment-wrapper">
              <li
                class="comment"
                v-bind:title="message"
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :user="user"
                @comment-updated="updateComment($event)"
                @comment-deleted="deleteComment($event)"
              >
                <font-awesome-icon
                  class="comment-icon-plus"
                  :class="{ active: likedComment }"
                  v-on:click="upvote()"
                  counter
                  value="1"
                  :icon="['fas', 'thumbs-up']"
                />
                <span>{{ loveCommentCount }}</span>

                <font-awesome-icon
                  class="comment-icon-minus"
                  :class="{ active: dislikedComment }"
                  v-on:click="downvote()"
                  counter
                  value="1"
                  :icon="['fas', 'thumbs-down']"
                />
                <span>{{ dislikeCommentCount }}</span>

                <!-- Comment items -->
                <div class="comment-item" v-show="state === 'default'">
                  <div v-if="!edit" class="comment-text">
                    <p>{{ comment.body }}</p>
                    <button class="btn-edit-1" @click="state = 'editing'">
                      <font-awesome-icon
                        class="xmark"
                        :icon="['fas', 'pencil']"
                      />
                    </button>
                  </div>
                  <div class="holes-lower"></div>
                  <div class="comment-author">
                    <p>
                      {{ comment.author.name }} <span>&bull;</span
                      >{{ comment.created_at }}
                    </p>
                  </div>
                </div>
                <div class="editing" v-show="state === 'editing'">
                  <div>
                    <h3>Update Comment</h3>
                  </div>
                  <div class="wrapper-update">
                    <input
                      v-model="data.body"
                      type="text"
                      maxlength="250"
                      required="true"
                      id="updateComment"
                    />
                    <label class="placeholder" for="updateComment"
                      >Update your comment</label
                    >
                  </div>

                  <!-- btn comment -->
                  <div class="btn-editing">
                    <button class="btn-edit btn-update" @click="saveEdit">
                      <font-awesome-icon
                        class="xmark"
                        :icon="['fas', 'pencil']"
                      />
                    </button>
                    <button class="btn-edit btn-cancel" @click="resetEdit">
                      <font-awesome-icon
                        class="xmark"
                        :icon="['fas', 'xmark']"
                      />
                    </button>
                    <!-- <button @click="deleteComment">Delete</button> -->
                    <DeleteBtn class="btn-edit-delete" @click="deleteComment" />
                  </div>
                  <!-- btn comment -->
                </div>
                <!-- Comment items -->
              </li>
            </ul>

            <!-- write a new comment -->
            <div class="wrapper-update">
              <input
                type="text"
                maxlength="250"
                required="true"
                id="writeComment"
                v-model="data.body"
                @keyup.enter="submitComment"
              />
              <label class="placeholder" for="writeComment"
                >Ajouter un commentaire...</label
              >
            </div>

            <!-- BTN submit new comment -->
            <div class="btn-submit">
              <button class="btn" type="button" @click="saveComment">
                Publier
              </button>
            </div>
          </div>
          <!-- comments -->
        </div>
        <!-- comments structure -->
      </div>
    </div>
  </section>
</template>

<script>
// import comment from "./CommentItem";
import DeleteBtn from "@/components/Base/DeleteBtn.vue";
import ScrollDownMouse from "@/components/Base/ScrollDownMouse.vue";

export default {
  components: {
    DeleteBtn,
    ScrollDownMouse,
  },
  props: {
    // user: {
    //   required: true,
    //   type: Object,
    // },
    comment: {
      required: true,
      type: Object,
    },
  },
  data: function () {
    return {
      state: "default",
      data: {
        edit: false,
        body: this.newComment,
      },
      message: "Commentaires",
      loveCount: 0,
      liked: false,
      dislikeCount: 0,
      disliked: false,
      loveCommentCount: 0,
      likedComment: false,
      dislikeCommentCount: 0,
      dislikeComment: false,
      newComment: "",
      user: {
        id: 3,
        name: "example",
      },
      comments: [
        {
          id: 1,
          body: "How's it going?",
          edited: false,
          created_at: new Date().toLocaleString(),
          author: {
            id: 1,
            name: "Nick Basile",
          },
        },
        {
          id: 2,
          body: "Pretty good. Just making a painting.",
          edited: false,
          created_at: new Date().toLocaleString(),
          author: {
            id: 2,
            name: "Bob Ross",
          },
        },
      ],
    };
  },
  computed: {
    editable() {
      return this.user.id === this.comments.id;
    },
  },
  methods: {
    like() {
      // this.love++;
      // if (this.dislike != 0) this.dislike--;
      this.liked = !this.liked && !0;
      this.liked ? this.loveCount++ : this.loveCount--;
    },
    Dislike() {
      // this.dislike++;
      // if (this.love != 0) this.love--;
      this.disliked = !this.disliked && !0;
      this.disliked ? this.dislikeCount++ : this.dislikeCount--;
    },
    postComment: function () {
      this.comments.push({
        edit: false,
        body: this.newComment,
        created_at: new Date().toLocaleString(),
        author: {
          id: this.current_user.id,
          name: this.current_user.name,
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
      this.dislikedComment = !this.dislikedComment && !0;
      this.dislikedComment
        ? this.dislikeCommentCount++
        : this.dislikeCommentCount--;
    },
    resetEdit() {
      this.state = "default";
      this.data.body = this.comment.body;
    },
    saveEdit() {
      this.state = "default";
      this.$emit("comment-updated", {
        id: this.comment.id,
        body: this.data.body,
      });
    },

    updateComment($event) {
      let index = this.comments.findIndex((element) => {
        return element.id === $event.id;
      });
      this.comments[index].body = $event.body;
    },
    deleteComment($event) {
      let index = this.comments.findIndex((element) => {
        return element.id === $event.id;
      });
      this.comments.splice(index, 1);
    },
    saveComment() {
      let newComment = {
        id: this.comments[this.comments.length - 1].id + 1,
        body: this.data.body,
        edited: false,
        created_at: new Date().toLocaleString(),
        author: {
          id: this.user.id,
          name: this.user.name,
        },
      };
      this.comments.push(newComment);
      this.data.body = "";
    },
  },
};
</script>
<style lang="scss" scoped>
// Mouse scroll down
.scroll-down-mouse {
  visibility: hidden;
  background: transparent;
  @media only screen and (min-width: 675px) {
    visibility: visible;
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: none;
    z-index: 98;
    display: flex;
    justify-content: flex-end;
  }
}

$img-url2: "https://images.unsplash.com/photo-1528785198459-ec50485704c7?ixlib=rb-0.3.5&s=3a2fc3039516555bbb2e9cd2967bd321&auto=format&fit=crop&w=1537&q=80";

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
    background: transparent;
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
      background-image: url($img-url2);
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
  background: transparent;
}

.button-dropdown {
  position: relative;
  // z-index: 1000;
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

h3 {
  width: 100%;
  font-size: 1.075rem;
  background: transparent;
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
    // z-index: 100;
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

// comment structure
.container-comments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  background: transparent;
  position: relative;
}

.comments-header {
  display: flex;
  flex-direction: row;
  padding: 0.3rem;
  background: transparent;
  p {
    font-weight: bold;
    background: transparent;
  }
}

.icon-comment {
  margin-right: 0.3rem;
  background: transparent;
}

// typing indicator
.typing-indicator {
  width: auto;
  margin-left: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background: transparent;
  span {
    height: 4px;
    width: 4px;
    margin: 0 1px;
    background-color: #8de8fe;
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

// comments
.comment-list {
  display: flex;
  flex-direction: column;
  background: transparent;
}
.comment-wrapper {
  flex-direction: column;
  justify-content: center;
  width: 300px;
  background: transparent;

  @media only screen and (min-width: 576px) {
    width: 530px;
  }
}
.comment {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  padding: 0.3rem;
  border-bottom: 1px solid #8de8fe;
  background: transparent;
  span {
    background: transparent;
  }
}

.comment-icon-plus,
.comment-icon-minus {
  margin: 0 0.3rem;
  background: transparent;
}

// v-show="state === 'default'"
.comment-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.8rem;
  background: transparent;
}
.comment-text {
  flex-direction: column;
  font-size: 0.8rem;
  background: transparent;

  p {
    margin-bottom: 0.2rem;
    max-width: 8rem;
    background: transparent;
  }
}

.btn-edit-1 {
  border: none;
  height: 2rem;
  cursor: pointer;
  outline: none;
  background: transparent;
}

.xmark {
  background: transparent;
}
.holes-lower {
  position: relative;
  margin: 0.3rem;
  // border: 1px dashed #8de8fe;
  border-bottom: 1px dashed #292929;
  background: transparent;
}

.comment-author {
  font-size: 0.5rem;
  background: transparent;
  p {
    background: transparent;
  }
}

// v-show="state === 'editing'"
.editing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.8rem;
  margin-left: 0.3rem;
  background: transparent;

  h3 {
    margin-bottom: 0.8rem;
    background: transparent;
  }
  @media only screen and (min-width: 576px) {
    margin-left: 6rem;
  }
}

.wrapper-update {
  position: relative;
  height: 56px;
  width: 200px;
  border-radius: 0.5rem;
  border: 1px solid #292929;
  background: transparent;
  margin-bottom: 0.5rem;
  margin-top: 0.8rem;
  @media only screen and (min-width: 576px) {
    width: 300px;
  }
  input {
    position: relative;
    width: 200px;
    height: 56px;
    background: transparent;
    border: none;
    font-weight: 700;
    text-indent: 0.75rem;
    color: rgba(#fff, 0.875);
    &:focus {
      outline: none;
    }
    &:focus ~ label,
    &:valid ~ label {
      top: -20px;
      background: rgb(12, 19, 31);
      // transform: translate(0.625rem, -10px) scale(0.5);
    }
    @media only screen and (min-width: 576px) {
      width: 300px;
    }
  }
  .placeholder {
    color: rgba(white, 0.875);
    position: absolute;
    z-index: 0;
    top: 5px;
    left: 5px;
    padding: 0 0.25rem;
    font-weight: 700;
    font-size: 0.8rem;
    transform: translate(0.5rem, 15px);
    transform-origin: 0% 0%;
    background: transparent;
    pointer-events: none;
    transition: 300ms ease all;
  }
}

.btn-submit {
  background: transparent;
}
.btn-editing {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (min-width: 576px) {
    flex-direction: row;
  }
}

.btn-edit-delete {
  margin-bottom: 1.3rem;
}
.btn-edit {
  color: mix(white, #424242, 70%);
  border: none;
  margin-right: 0.4rem;
  margin-bottom: 1.3rem;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  outline: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    color: mix(black, mix(white, #424242, 70%), 30%);
    // box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
  }
  &.btn-update {
    background: #2196f3;
    color: mix(white, #2196f3, 70%);
    &:hover {
      background: darken(#2196f3, 10%);
      color: mix(white, #2196f3, 85%);
    }
  }
  &.btn-cancel {
    background: #eee;
    &:hover {
      background: darken(#eee, 10%);
      color: mix(black, mix(white, #424242, 70%), 30%);
    }
  }
  @media only screen and (min-width: 576px) {
    // width: 6rem;
    padding: 0 10px;
    margin-right: 1.4rem;
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