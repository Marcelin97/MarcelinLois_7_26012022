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
              aria-label="Menu déroulant"
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
                  title="Signaler ce post"
                    type="button"
                    @click="$refs.reportPost.openModal()"
                    text="Signaler ce post"
                    aria-label="Signaler ce post"
                  >
                    Signaler
                  </button>
                </li>
                <li
                  v-if="canModerate(this.post.creatorId, this.post.communityId)"
                >
                  <button
                  title="Supprimer ce post"
                    type="button"
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
        <!-- btn like -->
        <div class="vote-data">
          <button
          type="button"
            aria-label="Like"
            class="like icon-vote"
            title="Mettre un j'aime"
            @click="sendLike(1, id)"
          >
            <svg
              class="heart"
              id="heart"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              viewBox="0 0 32 31"
            >
              <title>J'aime</title>
              <g stroke-width="2">
                <path
                  id="heart"
                  d="M10.55 2.31a8.07 8.07 0 0 0-8.07 8.08c0 3.15 2.16 5.66 4.28 7.61 3.35 3.44 6.46 7.37 9.59 11.08 2.92-3.86 5.48-7.41 8.91-11.36 1.72-2.24 4.71-4.18 4.7-7.33a8.07 8.07 0 0 0-0.79-3.49l0.02-0.06-0.05-0.01a8.07 8.07 0 0 0-12.85-2.26l-0.12 0.02a8.07 8.07 0 0 0-5.62-2.28z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  v-bind:fill="like_color"
                ></path>
              </g>
            </svg>
          </button>
          <span class="vote-count">{{ showLikesCount }}</span>
        </div>

        <!-- btn dislike -->
        <div class="vote-data">
          <button
          type="button"
            aria-label="Dislike"
            class="dislike icon-vote"
            title="j'aime pas"
            @click="sendLike(-1, id)"
          >
            <svg
              class="disheart"
              id="heart"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              viewBox="0 0 32 31"
            >
              <title>Enlever mon j'aime</title>
              <g stroke-width="2">
                <path
                  id="heart"
                  d="M10.55 2.31a8.07 8.07 0 0 0-8.07 8.08c0 3.15 2.16 5.66 4.28 7.61 3.35 3.44 6.46 7.37 9.59 11.08 2.92-3.86 5.48-7.41 8.91-11.36 1.72-2.24 4.71-4.18 4.7-7.33a8.07 8.07 0 0 0-0.79-3.49l0.02-0.06-0.05-0.01a8.07 8.07 0 0 0-12.85-2.26l-0.12 0.02a8.07 8.07 0 0 0-5.62-2.28z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  v-bind:fill="dislike_color"
                ></path>
              </g>
            </svg>
          </button>
          <span class="vote-count">{{ showDislikesCount }}</span>
        </div>

        <!-- section data of post -->
        <div>
          <p class="post__content">
            {{ post.title }}
          </p>
          <p class="post__content">
            {{ post.content }}
          </p>
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
            v-bind:communityId="post.communityId"
            @delete-comment="onDeleteComment"
            class="comments-list"
          />

          <!-- if no comment(s) -->
          <p v-if="comments.length === 0" class="noComment">
            Il n'y a aucun commentaire pour le moment. Soyez le premier !
          </p>

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

    <!-- modal report post -->
    <modalStructure ref="reportPost">
      <template v-slot:header>
        <h1>Signaler ce post</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="post" @closed="v$.$reset()">
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
              aria-label="Confirmer signalement"
              @click.prevent.stop="reportPostClick(index, id)"
            >
              Confirmer signalement
            </button>
          </form>
        </div>
      </template>

      <template v-slot:footer>
        <!-- gestion erreur API avec axios -->
        <div class="error-api">
          <p class="error-msg">{{ apiErrors }}</p>
        </div>
        <!-- gestion erreur API avec axios -->
      </template>
    </modalStructure>

    <!-- modal delete post -->
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
            title="Annuler"
            aria-label="Annuler la suppression"
            @click="$refs.deletePost.closeModal()"
          >
            Annuler
          </button>
          <deleteBtn @click.prevent.stop="deletePostClick(index, id)" />
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

import timeAgo from "../../services/timeAgo";

export default {
  name: "Post-Card",
  props: ["post", "id", "index", "creatorInfo", "posts"],
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
      dislikesCount: 0,
      comments: [],
      like_color: "",
      dislike_color: "",
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
    showLikesCount() {
      return this.likesCount
    },
    showDislikesCount() {
      return this.dislikesCount
    },
  },
  async created() {
    this.postId = this.$route.params.id;

    // I get all my comments by post
    this.comments = await commentsApi.getPostComments(this.id);
  },
  mounted() {
    this.currentUser = this.$store.state.user;

    axiosInstance
      .get(`posts/${this.id}/likesByPost`)
      .then((response) => {
        // console.log("likePost", response.data.result);

        let voteLike = response.data.result.filter((item) => {
          return item.vote == 1;
        });
        // console.log("là", voteLike.length);
        this.likesCount = voteLike.length;

        let voteDislike = response.data.result.filter((item) => {
          return item.vote == -1;
        });
        this.dislikesCount = voteDislike.length;

        // for (const iterator of response.data.result) {
        //   console.log(iterator)
        // }
      })

      .catch((e) => {
        // console.log(error);
        this.apiErrors = e.data;
        alert(e.data.message);
      });
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
    async reportPostClick(index, postId) {
      try {
        await postsApi.reportPost(`${postId}`, this.state.post);

        // close report modal
        this.$refs.reportPost.closeModal();
        this.v$.$reset();

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
          this.like_color = "rgb(255,255,255)";
          this.dislike_color = "rgb(255,255,255)";
        }
        if (this.vote === 1 && valeurLike === 0) {
          this.vote = -1;
        }
        if (this.vote === 0 && valeurLike === 1) {
          this.vote = 1;
        }
        if (this.vote === 1 && valeurLike === -1) {
          this.vote = -1;
          this.like_color = "rgb(255,255,255)";
          this.dislike_color = "rgb(255,255,255)";
        }
        if (this.vote === -1 && valeurLike === 1) {
          this.vote = 1;
          this.like_color = "rgb(255,255,255)";
          this.dislike_color = "rgb(255,255,255)";
        }
      }
      if (valeurLike === 1) {
        this.like_color = "rgb(255, 54, 54)";

        this.$notify({
          type: "success",
          title: `J'aime enregistré !`,
          duration: 2000,
        });
      }
      if (valeurLike === -1) {
        this.dislike_color = "rgb(0,0,204)";

        this.$notify({
          type: "success",
          title: `Je n'aime pas enregistré !`,
          duration: 2000,
        });
      }
      if (valeurLike === 0) {
        this.$notify({
          type: "success",
          title: `Vote enlevé !`,
          duration: 2000,
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
            duration: 3000,
          });
        });
    },
    async onAddComment({ content }) {
      try {
        const response = await commentsApi.addComment(this.post.id, content);
        this.comments.push(response);

        this.$notify({
          type: "success",
          title: `Commentaire posté`,
          duration: 2000,
        });
      } catch (e) {
        // console.error(e.data);
        this.apiErrors = e.data;
        alert(e.data.message);
      }
    },
    async onDeleteComment(commentId) {
      try {
        if (confirm("Souhaitez-vous vraiment supprimer ce commentaire ?")) {
          await commentsApi.deleteComment(commentId);
          this.comments = this.comments.filter(
            (comment) => comment.id !== commentId
          );
          this.$notify({
          type: "success",
          title: `Commentaire supprimé`,
          duration: 2000,
        });
        }
      } catch (e) {
        this.apiErrors = e.data;
        alert(e.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  margin: 0 0 auto;
  padding: 0 12px;
}

// btn like or dislike
.vote-data {
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

.heart,
.disheart {
  transition: all 0.1s ease;
  stroke: #ff3636;
  fill: none;
}

.heart {
  stroke: #ff3636;
}
.disheart {
  stroke: #1530de;
}

button:active .heart,
.disheart {
  transform: scale(0.9);
}

// post content info
.post__content {
  margin-bottom: calc((8px) * 2);
  word-break: break-all;
}

// Comment
.comments-list {
  margin-bottom: calc((5px) * 2);
}
.post-comment {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: calc((5px) * 2);
}

// Date of publication
.post-createdat,
.noComment {
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-left: 1rem;
  line-height: 1rem;
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
