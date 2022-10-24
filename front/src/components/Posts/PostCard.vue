<template>
  <div>
    <div class="post-card">
      <!-- header card -->
      <div class="post-card__header">
        <div class="header">
          <div class="header__left">
            <div class="profile-pic" v-if="post.user">
              <img
                v-if="post.user.imageUrl"
                class="profile-pic__user"
                :src="`http://localhost:3000${post.user.imageUrl}`"
                :alt="'Avatar de ' + post.user.username"
                aria-label="Photo d'utilisateur"
              />
              <img
                class="profile-pic__user"
                v-else
                src="../../assets/img/avataaars.png"
                alt="Avatar par défaut"
                aria-label="Avatar par défaut"
              />
            </div>
            <div class="profile-pic" v-else-if="creatorInfo">
              <img
                v-if="creatorInfo.imageUrl"
                class="profile-pic__user"
                :src="`http://localhost:3000${creatorInfo.imageUrl}`"
                :alt="'Avatar de ' + creatorInfo.username"
                aria-label="Photo d'utilisateur"
              />
              <img
                class="profile-pic__user"
                v-else
                src="../../assets/img/avataaars.png"
                alt="Avatar par défaut"
                aria-label="Avatar par défaut"
              />
            </div>

            <p class="profile-pic__username" v-if="post.user">
              {{ post.user.username }}
            </p>
            <p
              class="profile-pic__username"
              v-else-if="creatorInfo.length != 0"
            >
              {{ creatorInfo.username }}
            </p>
          </div>

          <!-- Menu dropdown -->
          <div class="dropdown">
            <button
              class="dropdown-btn"
              v-on:click="show = !show"
              type="button"
              tabindex="0"
            >
              <div>
                <div style="height: 24px; width: 24px">
                  <svg
                    aria-label="Plus d’options"
                    class="_ab6-"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6" cy="12" r="1.5"></circle>
                    <circle cx="18" cy="12" r="1.5"></circle>
                  </svg>
                </div>
              </div>
            </button>

            <div class="dropdown-content" v-bind:class="{ show: show }">
              <ul>
                <li v-if="canAdmin(this.post.creatorId)">
                  <router-link
                    :postId="postId"
                    class="btn__update"
                    :to="'/posts/' + post.id + '/update'"
                  >
                    Modifier
                  </router-link>
                </li>
                <li v-if="this.$store.state.user.id != this.post.creatorId">
                  <button
                    type="button"
                    @click="$refs.reportPost.openModal()"
                    text="Signaler ce post"
                    aria-label="Signaler ce post"
                  >
                    Signaler
                  </button>
                </li>
                <li v-if="canAdmin(this.post.creatorId)">
                  <button
                    @click="$refs.deletePost.openModal()"
                    text="Supprimer ce post"
                    aria-label="Supprimer ce post"
                  >
                    Supprimer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- image card -->
      <div class="post-image">
        <img
          alt="photo du post"
          :src="`http://localhost:3000${post.imageUrl}`"
        />
      </div>
      <!-- content card -->
      <div class="post-content">
        <!-- btn dislike -->
        <div class="vote-data">
          <!-- <button class="icon-rocknroll">👎</button> -->
          <button
            aria-label="Dislike"
            class="dislike icon-vote"
            title="Enlever mon j'aime"
            @click="sendLike(-1, id)"
          >
            <i
              class="fa fa-thumbs-down"
              v-bind:class="{ redLike: vote === -1 }"
            ></i>
          </button>
          <span class="vote-count">{{ dislikesCount }}</span>
        </div>
        <!-- btn like -->
        <div class="vote-data">
          <!-- <button class="icon-rocknroll">☝️</button> -->
          <button
            aria-label="Like"
            class="like icon-vote"
            title="Mettre un j'aime"
            @click="sendLike(1, id)"
          >
            <!-- <i class="fa fa-thumbs-up blueLike" v-bind:class="{ blueLike: vote === 1 }"></i> -->

            <svg
              class="icon icon-thumbs-up"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 1000 1000"
            >
              <title>thumbs-up</title>
              <path
                d="M141.62 478.51v416.58H58.38V478.51h83.24M200 420.14H0v533.33h200zM600 91.71a8.3 8.3 0 0 1 8.29 8.29v153.05a75.15 75.15 0 0 1-16.54 47l-24.18 30.08-76.35 95H900a41.63 41.63 0 0 1 31 69.36l-34.85 38.93L931 572.27a41.65 41.65 0 0 1-20 67.9l-63 17.15L872.06 718a41.72 41.72 0 0 1-23.54 54.1l-1.31.49-38.92 13.76v47a78.14 78.14 0 0 1-.67 10.14l-1.12 8.35 1.29 8.34a43 43 0 0 1 .5 6.51 41.68 41.68 0 0 1-41.62 41.62H400a75 75 0 0 1-75-75V393.44l151.11-130.06 8.64-7.44 5.25-10.15 64.84-126.49A50.54 50.54 0 0 1 600 91.71m0-58.38a109.15 109.15 0 0 0-97.1 59.32L438 219.15 266.67 366.67v466.66A133.33 133.33 0 0 0 400 966.67h366.67a100.07 100.07 0 0 0 98.81-115.46 135.37 135.37 0 0 0 1.19-17.88v-5.69a100.11 100.11 0 0 0 60.9-127.81c-.39-1.12-.81-2.22-1.24-3.32a100 100 0 0 0 48.21-163.17A100 100 0 0 0 900 366.67H613.07l24.18-30.08a133.31 133.31 0 0 0 29.42-83.54V100A66.67 66.67 0 0 0 600 33.33z"
              />
            </svg>
          </button>
          <span class="vote-count">{{ likesCount }}</span>
        </div>

        <!-- section data of post -->
        <div>
          <p class="post__content">
            {{ post.title }}
          </p>
          <p class="post__content">
            {{ post.content }}
          </p>
          <!-- <p class="instagram-card-content-user">
          Communauté : {{ post.communityId }}
        </p> -->
        </div>

        <!-- section comment(s) -->
        <div>
          <div v-if="this.comments.length != 0">
            {{ showCommentsCount }}
            <span> <font-awesome-icon icon="fa-regular fa-comments" /></span>
          </div>
          <!-- comment(s) list -->
          <PostComments
            v-for="(comment, index) in this.comments"
            :key="index"
            :comment="comment"
            v-bind:content="comment.content"
            v-bind:index="index"
            @delete-comment="onDeleteComment"
          />
          <!-- add a comment -->
          <div class="post-comment">
            <AddComment @add-comment="onAddComment" />
          </div>
        </div>
      </div>

      <!-- publication date -->
      <p class="post-createdat">
        {{ showDate }}<font-awesome-icon icon="fa-regular fa-clock" />
      </p>
    </div>

    <!-- modal report community -->
    <modalStructure ref="reportPost">
      <template v-slot:header>
        <h1>Signaler ce post</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="post" @submit.prevent="reportPostClick">
            <div class="FormGroup">
              <label class="FormGroupLabel" for=""
                >Pourquoi signalez-vous ce post ?</label
              >
              <div class="FormTextboxWrapper">
                <textarea
                  cols="50"
                  rows="5"
                  required
                  class="FormTextbox"
                  type="text"
                  placeholder="Explique nous les raisons de ce signalement."
                  v-model="state.post.content"
                  @blur="v$.post.content.$touch"
                  :class="v$.post.content.$error === true ? 'error' : 'dirty'"
                />
              </div>

              <!-- Error Message -->
              <template v-if="v$.post.content.$dirty">
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.post.content.$errors"
                  :key="index"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </template>
              <!-- Error Message -->
            </div>

            <button
              type="submit"
              class="btn button"
              title="Signaler"
              text="Signaler"
              @click="reportPostClick(index, id)"
            >
              Confirmer signalement
            </button>
          </form>
        </div>
      </template>

      <template v-slot:footer>
        <!-- gestion erreur API avec axios -->
        <div class="error-api">
          <p class="error-msg">{{ apiError }}</p>
        </div>
        <!-- gestion erreur API avec axios -->
      </template>
    </modalStructure>

    <!-- modal delete account -->
    <modalStructure ref="deletePost">
      <template v-slot:header>
        <h1>Supprimer la publication</h1>
      </template>

      <template v-slot:body>
        <p>
          Si vous ne voulez pas supprimer cette publication, vous pouvez
          annuler.
        </p>
      </template>

      <template v-slot:footer>
        <div class="modal__actions">
          <button
            class="btn"
            text="Annuler"
            @click="$refs.deletePost.closeModal()"
          >
            Annuler
          </button>
          <deleteBtn @click="deletePostClick(index, id)" />
        </div>
      </template>
    </modalStructure>
  </div>
</template>

<script>
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";

import PostComments from "../Comments/PostComments";
import AddComment from "../Comments/AddComment.vue";

import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import axiosInstance from "../../services/api";
import postsApi from "../../api/posts";
import commentsApi from "../../api/comments";

import roleMixin from "../../mixins/role.mixin";

import timeAgo from "@/services/timeAgo";

export default {
  name: "Post-Card",
  props: ["post", "id", "index", "creatorInfo"],
  components: {
    deleteBtn,
    modalStructure,
    PostComments,
    AddComment,
  },
  data() {
    return {
      postId: "",
      currentUser: [],
      show: false,
      apiErrors: "",
      vote: 0,
      likesCount: 0,
      disLikesCount: 0,
      comments: [],
    };
  },
  mixins: [roleMixin],
  setup() {
    const state = reactive({
      post: {
        content: "",
      },
    });

    const rules = computed(() => ({
      post: {
        content: {
          $autoDirty: true,
          $lazy: true,
          minLength: helpers.withMessage(
            "Ce champ doit être long d'au moins 5",
            minLength(5)
          ),
          maxLength: helpers.withMessage(
            "La longueur maximale autorisée est de 255",
            maxLength(255)
          ),
        },
      },
    }));

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  validationConfig: {
    $lazy: true,
  },
  computed: {
    showCommentsCount() {
      return this.comments.length;
    },
    showDate() {
      if (this.post.createdAt !== this.post.updatedAt) {
        return `Mis à jour ${timeAgo.format(new Date(this.post.updatedAt))}`;
      }
      return `Posté ${timeAgo.format(new Date(this.post.createdAt))}`;
    },
  },
  async created() {
    this.postId = this.$route.params.id;

    // I get all my comments by post
    this.comments = await commentsApi.getPostComments(this.id);
  },
  mounted() {
    this.currentUser = this.$store.state.user;
  },
  methods: {
    async deletePostClick(index, id) {
      this.$emit("deletePostClick", index, id);

      // close delete modal
      this.$refs.deletePost.closeModal();

      // notification success
      this.$notify({
        type: "success",
        title: `Suppression`,
        text: `La publication est supprimer`,
        duration: 30000,
      });
    },
    async reportPostClick(index, id) {
      try {
        await postsApi.reportPost(`${id}`, this.state.post);
        // force refresh page
        // this.$router.go(0);

        // notification success
        this.$notify({
          type: "success",
          title: `Signalement`,
          text: `Merci, votre rapport a été envoyé.`,
          duration: 30000,
        });
      } catch (error) {
        const errorMessage = (this.apiErrors = error);
        this.errorMessage = errorMessage;

        // notification error message
        this.$notify({
          type: "error",
          title: `Erreur lors de l'envoi du rapport`,
          text: `${errorMessage}`,
          duration: 3000,
        });
      }
    },
    sendLike(valeurLike, id) {
      if (this.vote == undefined || this.vote == null || this.vote === 0) {
        this.vote = valeurLike;
      } //si l'utilisateur à déjà (dis)liké le post
      else {
        if (this.vote === valeurLike) {
          valeurLike = 0;
          this.vote = 0;
        }
        if (this.vote === 1 && valeurLike === 0) {
          this.vote = -1;
        }
        if (this.vote === 0 && valeurLike === 1) {
          this.vote = 1;
        }
        if (this.vote === 1 && valeurLike === -1) {
          this.vote = -1;
        }
        if (this.vote === -1 && valeurLike === 1) {
          this.vote = 1;
        }
      }
      if (valeurLike === 1) {
        this.$notify({
          type: "success",
          title: `J'aime enregistré !`,
          duration: 5000,
        });
      }
      if (valeurLike === -1) {
        this.$notify({
          type: "success",
          title: `Je n'aime pas enregistré !`,
          duration: 5000,
        });
      }
      if (valeurLike === 0) {
        this.$notify({
          type: "success",
          title: `Vote enlevé !`,
          duration: 5000,
        });
      }
      // data send to axios request
      const infoLike = {
        vote: valeurLike,
        postId: id,
        userId: this.currentUser.id,
      };
      axiosInstance
        .post(`posts/${id}/likes`, infoLike)
        .then((res) => {
          // console.log("likePost", res.data);
          if (res) {
            return res.json;
          }
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = (this.apiErrors = error);
          this.errorMessage = errorMessage;

          this.$notify({
            type: "error",
            title: `Erreur lors de l'ajout du vote`,
            text: `Erreur reporté : ${errorMessage}`,
            duration: 30000,
          });
        });
    },
    // Comment
    async onAddComment({ content }) {
      try {
        const response = await commentsApi.addComment(this.post.id, content);
        this.comments.push(response);
      } catch (e) {
        console.error(e.data);
        this.errors = e.data;
      }
    },
    async onDeleteComment(commentId) {
      try {
        if (confirm('Souhaitez-vous vraiment supprimer ce commentaire ?')) {
          await commentsApi.deleteComment(commentId)
          this.comments = this.comments.filter((comment) => comment.id !== commentId)
        }
      } catch (e) {
        alert(e.data.message)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-thumbs-up {
  fill: black;
  &:active {
    fill: green;
  }
}
.post-card {
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 0.4rem;
  margin-bottom: 2rem;
  &__header {
    border-bottom: 1px solid #ccc;
    background-color: transparent;
  }
}

.header {
  display: flex;
  align-content: stretch;
  align-items: center;
  flex-direction: row;
  &__left {
    margin: 8px 4px 8px 12px;
    padding: unset;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    max-width: calc(100% - 48px);
    position: relative;
  }
}

.profile-pic {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  padding: 1px;
  background: linear-gradient(45deg, #ffd6d6, #f34642 80%);
  margin-right: 10px;
  &__user {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  &__username {
    font-size: 12px;
    font-weight: bold;
  }
}

// dropdown menu
.dropdown {
  position: relative;

  .dropdown-btn {
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 8px;
  }

  .dropdown-content {
    display: none;
    right: 10px;
    position: absolute;
    top: 100%;
    z-index: 9999;
    height: auto;
    width: 8rem;
    padding: 4px;
    border-radius: 0.8rem;
    background-color: #ffff;
    box-shadow: 0 0 20px rgb(66 50 98 / 35%);

    ul {
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        height: 2rem;
        margin-bottom: 4px;

        a,
        button {
          font-size: 1rem;
          background: none;
          border: none;
          outline: none;
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 5px 10px;
          cursor: pointer;
          &:hover {
            color: #ffd7d7;
          }
        }
      }
    }
  }
  .show {
    display: block;
  }
}

// card image
.post-image img {
  width: 100%;
}

// card content
.post-content {
  padding: 15px;
}

// btn like or dislike
.vote-data {
  float: right;
}
.vote-count,
.icon-vote {
  font-size: 0.75rem;
}

.icon-vote {
  background: none;
  border: 0;
  outline: none;
  cursor: pointer;
  margin: 0 0.125rem 0 0;
  padding: 0;
}

.blueLike {
  color: blue;
}

.redLike {
  color: red;
}

// btn disable
.disabled {
  color: orange;
}
// post content info
.post__content {
  margin-bottom: 1rem;
  word-break: break-all;
}

// Comment
.post-comment {
  display: flex;
}

// Date of publication
.post-createdat {
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-left: 1rem;
}

// Section modal
.modal {
  &__actions {
    display: flex;
    justify-content: space-around;
  }
}

// error if input is invalid
.dirty {
  border-color: #8de8fe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  background: #fdd;
  border-color: #fd4444;
  opacity: 0.7;
}

.error:focus {
  outline-color: #f99;
}

// error message
.error-msg {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
  max-width: 15rem;
  @media only screen and (min-width: 576px) {
    max-width: 25rem;
  }
}
</style>