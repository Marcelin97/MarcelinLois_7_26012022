<template>
  <div>
    <div class="post-card">
      <!-- header card -->
      <div class="post-card__header">
        <div class="header">

          <!-- Owner information -->
          <div class="header__left">
            <!-- post owner profile picture -->
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

            <!-- Post owner name -->
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
            <!-- BTN dropdown menu -->
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
            
            <!-- BTN ACTIONS -->
            <div class="dropdown-content" v-bind:class="{ show: show }">
              <ul>
                <!-- BTN update post -->
                <li v-if="canAdmin(this.post.creatorId)">
                  <button
                    type="button"
                    text="Modifier ce post"
                    class="btn__update"
                    aria-label="Modifier ce post"
                    @click="$refs.updatePost.openModal()"
                  >
                    Modifier
                  </button>
                </li>
                <!-- BTN report post -->
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
                <!-- BTN delete post -->
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

      <!-- Picture publication -->
      <div class="post-image">
        <img
          alt="photo du post"
          :src="`http://localhost:3000${post.imageUrl}`"
        />
      </div>

      <!-- content card -->
      <div class="post-content">
        <!-- BTN like -->
        <div class="vote-data">
          <button
            type="button"
            aria-label="Like"
            class="like icon-vote"
            title="Mettre un j'aime"
            @click="sendLike(1, id)"
          >
          <svg class="heart" id="heartLike" xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 32 31">
            <title>J'aime</title>
            <g stroke-width="2">
              <path id="heartLike"
                d="M10.55 2.31a8.07 8.07 0 0 0-8.07 8.08c0 3.15 2.16 5.66 4.28 7.61 3.35 3.44 6.46 7.37 9.59 11.08 2.92-3.86 5.48-7.41 8.91-11.36 1.72-2.24 4.71-4.18 4.7-7.33a8.07 8.07 0 0 0-0.79-3.49l0.02-0.06-0.05-0.01a8.07 8.07 0 0 0-12.85-2.26l-0.12 0.02a8.07 8.07 0 0 0-5.62-2.28z"
                stroke-linecap="round" stroke-linejoin="round" :class="isLikedByUser ? 'like' : ''"></path>
            </g>
          </svg>
          </button>

          <span class="vote-count" :class="isLikedByUser ? 'like' : ''" >{{ showLikesCount }}</span>
        </div>

        <!-- BTN dislike -->
        <div class="vote-data">
          <button
            type="button"
            aria-label="Dislike"
            class="dislike icon-vote"
            title="j'aime pas"
            @click="sendLike(-1, id)"
          >
          <svg class="heart" id="heartDislike" xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 32 31">
            <title>J'aime pas</title>
            <g stroke-width="2">
              <path id="heartDislike"
                d="M10.55 2.31a8.07 8.07 0 0 0-8.07 8.08c0 3.15 2.16 5.66 4.28 7.61 3.35 3.44 6.46 7.37 9.59 11.08 2.92-3.86 5.48-7.41 8.91-11.36 1.72-2.24 4.71-4.18 4.7-7.33a8.07 8.07 0 0 0-0.79-3.49l0.02-0.06-0.05-0.01a8.07 8.07 0 0 0-12.85-2.26l-0.12 0.02a8.07 8.07 0 0 0-5.62-2.28z"
                stroke-linecap="round" stroke-linejoin="round" fill:blue stroke: :class="isDisLikedByUser ? 'dislike' : ''"></path>
            </g>
          </svg>
          
          </button>
          <span class="vote-count" :class="isDisLikedByUser ? 'dislike' : ''" >{{ showDislikesCount }}</span>
        </div>

        <!-- Post informations -->
        <div>
          <p class="post__content">
            {{ post.title }}
          </p>
          <p class="post__content">
            {{ post.content }}
          </p>
        </div>

        <!-- Section comment(s) -->
        <div>
          <div>
            {{ showCommentsCount }}
            <span>
              <font-awesome-icon icon="fa-regular fa-comments" />
            </span>
          </div>
          <!-- Comment(s) list -->
          <PostComments
            v-for="(comment, index) in comments"
            :key="index"
            :comment="comment"
            v-bind:content="comment.content"
            v-bind:index="index"
            v-bind:communityId="post.communityId"
            @delete-comment="onDeleteComment"
            @update-comment="onUpdateComment"
            class="comments-list"
          />

          <!-- if no comment(s) -->
          <p class="noComment">
            Il n'y a aucun commentaire pour le moment.
            <br />
            Soyez le premier !
          </p>

          <!-- Component add a comment -->
          <div class="post-comment">
            <AddComment @add-comment="onAddComment" />
          </div>
        </div>
      </div>

      <!-- Date of publication -->
      <p class="post-createdat">
        {{ showDate }}
        <font-awesome-icon icon="fa-regular fa-clock" />
      </p>
    </div>

    <!-- modal update post -->
    <modalStructure ref="updatePost">
      <template v-slot:header>
        <h1>Modifier mon post</h1>
      </template>

      <template v-slot:body>
        <form action="#" method="patch" enctype="multipart/form-data">
          <div class="form-group">
            <label for="title">Nouveau titre de la publication</label>
            <input
              placeholder="TITRE"
              autocomplete="off"
              minlength="3"
              maxlength="255"
              aria-label="Titre de votre post"
              id="title"
              type="text"
              v-model="state.postUpdate.title"
              @blur="v$.postUpdate.title.$touch"
              :class="v$.postUpdate.title.$error === true ? 'error' : 'dirty'"
            />

            <!-- Error Message -->
            <template v-if="v$.postUpdate.title.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.postUpdate.title.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>

          <div class="form-group">
            <label for="content">Nouvelle description de la publication</label>
            <input
              id="content"
              type="text"
              placeholder="À PROPOS de..."
              minlength="2"
              maxlength="400"
              aria-label="description de votre publication"
              v-model="state.postUpdate.content"
              @blur="v$.postUpdate.content.$touch"
              :class="v$.postUpdate.content.$error === true ? 'error' : 'dirty'"
            />

            <!-- Error Message -->
            <template v-if="v$.postUpdate.content.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.postUpdate.content.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>

          <div class="form-group">
            <label for="PostImage">Nouvelle photo de la publication</label>
            <input
              class="input-file"
              id="picture"
              type="file"
              accept=".jpeg,.jpg,png"
              ref="file"
            />

            <!-- Error Message -->
            <template v-if="v$.postUpdate.image.$dirty">
              <div
                class="input-errors"
                v-for="(error, index) of v$.postUpdate.image.$errors"
                :key="index"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </template>
            <!-- Error Message -->
          </div>

          <!-- button submit -->
          <div class="button-container">
            <button
              type="submit"
              class="btn"
              @click.stop.prevent="onUpdatePost"
            >
              Modifier
            </button>
          </div>
        </form>
      </template>
    </modalStructure>

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
          <deleteBtn @click="deletePost()" />
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

// API requests
import axiosInstance from "../../services/api";
// Posts requests
import postsApi from "../../api/posts";
// Comments requests
import commentsApi from "../../api/comments";

// Manage roles
import roleMixin from "../../mixins/role.mixin";

// Manage time
import timeAgo from "../../services/timeAgo";

export default {
  name: "Post-Card",
  props: ["post", "id", "index", "creatorInfo"],
  emits: ["delete-post", "update-post"],
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
      comments: [],
    };
  },
  mixins: [roleMixin],
  setup() {
    const state = reactive({
      post: {
        content: "",
      },
      postUpdate: {
        title: "",
        image: "",
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
        image: {
          $autoDirty: true,
          $lazy: true,
        },
      },
      postUpdate: {
        title: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(3),
          maxLength: maxLength(25),
        },
        image: {
          $autoDirty: true,
          $lazy: true,
        },
        content: {
          $autoDirty: true,
          $lazy: true,
          minLength: minLength(2),
          maxLength: maxLength(400),
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
      let like = this.post.likePosts.filter((p) => p.vote === 1);
      // console.log(like.length);
      return like.length;
    },
    showDislikesCount() {
      let disLike = this.post.likePosts.filter((p) => p.vote === -1);
      // console.log(disLike.length);
      return disLike.length;
    },
    isLikedByUser() {
      return this.post.likePosts.find((like) => like.vote === 1 && like.userId === this.$store.state.user.id)
    },
    isDisLikedByUser() {
      return this.post.likePosts.find((like) => like.vote === -1 && like.userId === this.$store.state.user.id)
    },
  },
  async created() {
    this.postId = this.$route.params.id;

    // I get all my comments by post
    this.comments = this.post.comments;
  },
  mounted() {
    this.currentUser = this.$store.state.user;
  },
  methods: {
    async onUpdatePost() {
      let bodyFormData = new FormData();
      const imagefile = document.getElementById("picture");
      // console.log("DEBUG IMAGE LOAD" , imagefile);

      if (imagefile) bodyFormData.append("image", imagefile.files[0]);

      for (let key of ["title", "content"]) {
        const param = this.state.postUpdate[key];
        // console.log(param, key);
        if (param) {
          bodyFormData.append(key, param);
        }
      }

      axiosInstance
        .patch(`/posts/${this.post.id}/update`, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          this.$emit("update-post", result.data.datas, this.post.id);

          // close update post modal
          this.$refs.updatePost.closeModal();

          // notification de succès
          this.$notify({
            type: "success",
            title: `Post mis à jour`,
            text: `Vous allez être redirigé vers le fil d'actualité.`,
          });
        })
        .catch((err) => {
          this.apiErrors = err.response;

          // notification error message
          this.$notify({
            type: "error",
            title: `Erreur lors de la mise à jour de l'utilisateur'`,
            text: `Erreur reporté : ${this.apiErrors}`,
            duration: 30000,
          });
        });
    },
    async deletePost() {
      try {
        if (!this.isAuthenticated) return;
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) return;
        await postsApi.deletePost(this.id);
        this.$emit("delete-post", this.id);

        // notification success
        this.$notify({
          type: "success",
          title: `Publication supprimé`,
          duration: 20000,
        });

        // close delete modal
        this.$refs.deletePost.closeModal();
      } catch (error) {
        this.apiErrors = error;

        this.$notify({
          type: "error",
          title: `Erreur lors de la suppression`,
          text: `Erreur reporté : ${this.apiErrors}`,
          duration: 20000,
        });
      }
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
          duration: 20000,
        });
      } catch (error) {
        this.apiErrors = error;

        // notification error message
        this.$notify({
          type: "error",
          title: `Erreur lors de l'envoi du rapport`,
          text: `${this.apiErrors}`,
          duration: 2000,
        });
      }
    },
    sendLike(valeurLike, id) {
      const likePost = this.post.likePosts.find(
        (like) => like.userId === this.currentUser.id
      );

      let valueLikeToSend = 0;
      // console.log("DEBUG POSTREAD", this.post.likePosts);
      if (!likePost || !likePost.vote || likePost.vote + valeurLike === 0)
        valueLikeToSend = valeurLike;

      const infoLike = {
        vote: valueLikeToSend,
        postId: id,
        userId: this.currentUser.id,
      };

      axiosInstance
        .post(`posts/${id}/likes`, infoLike)
        .then((res) => {
          // console.log("likePost", res.data);
          const currentPost = this.post;
          const otherLikes = currentPost.likePosts.filter(
            (like) => like.userId !== this.currentUser.id
          );

          if (res) {
            this.$emit(
              "update-post",
              { ...currentPost, likePosts: [...otherLikes, infoLike] },
              id
            );
            return res.json;
          }
        })
        .catch((error) => {
          this.apiErrors = error;

          this.$notify({
            type: "error",
            title: `Erreur lors de l'ajout du vote`,
            text: `Erreur reporté : ${this.apiErrors}`,
            duration: 3000,
          });
        });
    },
    async onAddComment({ content }) {
      try {
        const response = await commentsApi.addComment(this.id, content);
        const currentComment= this.post.comments;
        // console.log(response.post);
        // console.log(response.post.comments[response.post.comments.length - 1]);
        currentComment.push(
          response.post.comments[response.post.comments.length - 1]
        );
        // console.log(this.comments);
        this.state.content = ""

        this.$notify({
          type: "success",
          title: `Commentaire posté`,
          duration: 2000,
        });
      } catch (error) {
        this.apiErrors = error;

        this.$notify({
          type: "error",
          title: `Erreur lors de l'ajout du commentaire`,
          text: `Erreur reporté : ${this.apiErrors}`,
          duration: 2000,
        });
      }
    },
    onUpdateComment(data, commentId) {
      this.comments = this.comments.map((comment) => {
        if (comment.id === commentId) {
          comment.content = data.content;
        }
        return comment;
      });
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
      } catch (error) {
        this.apiErrors = error;

        this.$notify({
          type: "error",
          title: `Erreur lors de la suppression du commentaire`,
          text: `Erreur reporté : ${this.apiErrors}`,
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post__liked {
  fill: red;
}
.post-card {
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 0.4rem;
  margin-bottom: 2rem;
  flex-basis: 70%;

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
  font-size: 0.4rem;
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
