<template>
  <div>
    <div class="post">
      <!-- header card -->
      <div class="instagram-card-header">
        <div class="header">
          <div class="header-left">
            <div class="profile-pic" v-if="post.user">
              <img
                v-if="post.user.imageUrl"
                class="instagram-card-user-image"
                :src="`http://localhost:3000${post.user.imageUrl}`"
                :alt="'Avatar de ' + post.user.username"
                aria-label="Photo d'utilisateur"
              />
              <img
                class="instagram-card-user-image"
                v-else
                src="../../assets/img/avataaars.png"
                alt="Avatar par défaut"
                aria-label="Avatar par défaut"
              />
            </div>
            <div class="profile-pic" v-else-if="creatorInfo">
              <img
                v-if="creatorInfo.imageUrl"
                class="instagram-card-user-image"
                :src="`http://localhost:3000${creatorInfo.imageUrl}`"
                :alt="'Avatar de ' + creatorInfo.username"
                aria-label="Photo d'utilisateur"
              />
              <img
                class="instagram-card-user-image"
                v-else
                src="../../assets/img/avataaars.png"
                alt="Avatar par défaut"
                aria-label="Avatar par défaut"
              />
            </div>

            <p class="instagram-card-user-name" v-if="post.user">
              {{ post.user.username }}
            </p>
            <p
              class="instagram-card-user-name"
              v-else-if="creatorInfo.length != 0"
            >
              {{ creatorInfo.username }}
            </p>
          </div>

          <!-- Menu dropdown -->
          <div class="dropdown">
            <button
              class="_abl- dropdown-btn"
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
      <div class="instagram-card-image">
        <img
          alt="photo du post"
          :src="`http://localhost:3000${post.imageUrl}`"
        />
      </div>
      <!-- content card -->
      <div class="instagram-card-content">
        <!-- btn dislike -->
        <div class="like-data">
          <!-- <button class="icon-rocknroll">👎</button> -->
          <button
            aria-label="Dislike"
            class="dislike icon-rocknroll"
            title="Enlever mon j'aime"
            @click="sendLike(-1, id)"
          >
            <i
              class="fa fa-thumbs-down like"
              :class="{ disabled: downvoted }"
            ></i>
          </button>
          <span class="like-count">{{ dislikesCount }}</span>
        </div>
        <!-- btn like -->
        <div class="like-data">
          <!-- <button class="icon-rocknroll">☝️</button> -->
          <button
            aria-label="Like"
            class="like icon-rocknroll"
            title="Mettre un j'aime"
            @click="sendLike(1, id)"
          >
            <i class="fa fa-thumbs-up like" :class="{ disabled: upvoted }"></i>
          </button>
          <span class="like-count">{{ likesCount }}</span>
        </div>

        <!-- section data of post -->
        <div>
          <p class="instagram-card-content-user">
          {{ post.title }}
        </p>
        <p class="instagram-card-content-user">
          {{ post.content }}
        </p>
        <!-- <p class="instagram-card-content-user">
          Communauté : {{ post.communityId }}
        </p> -->
        </div>


        <!-- section comment(s) -->
        <div>
          <div v-if="this.comments.length != 0">
            {{ showCommentsCount }} <span> <font-awesome-icon icon="fa-regular fa-comments" /></span>
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
          <div class="instagram-card-footer">
            <AddComment @onAddComment="onAddComment" />
          </div>
        </div>
      </div>

      <!-- publication date -->
      <p class="card-createdat">
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

      //  close delete modal
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
        // // force refresh page
        this.$router.go(0);

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
          //l'utilisateur souhaite être neutre
          valeurLike = 0;
          this.vote = 0;
        }
        if (this.vote === 1 && valeurLike === 0) {
          this.vote = -1;
        }
        if (this.vote === 0 && valeurLike === 1) {
          //si l'utilisateur like plutôt que dislike un post.
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
        const response = await commentsApi.addComment(
          this.postId,
          this.currentUser.id,
          content
        );
        this.comments.push(response);
      } catch (e) {
        console.error(e.data);
        this.errors = e.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 0.4rem;
  margin-bottom: 2rem;
}

// card header
.instagram-card-header {
  border-bottom: 1px solid #ccc;
  background-color: transparent;
}
.header {
  display: flex;
  align-content: stretch;
  align-items: center;
  flex-direction: row;
}

.header-left {
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

.profile-pic {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  padding: 1px;
  background: linear-gradient(45deg, #ffd6d6, #f34642 80%);
  margin-right: 10px;
}
.instagram-card-user-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #fff;
}
.instagram-card-user-name {
  font-size: 12px;
  font-weight: bold;
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
.instagram-card-image img {
  width: 100%;
}

// card content
.instagram-card-content {
  padding: 15px;
}
.like-data {
  float: right;
}
.like-count,
.icon-rocknroll {
  font-size: 0.75rem;
}
.like-count {
  &:hover {
    opacity: 0.5;
  }
}

.icon-rocknroll {
  background: none;
  border: 0;
  outline: none;
  cursor: pointer;
  margin: 0 0.125rem 0 0;
  padding: 0;
  &:hover {
    opacity: 0.5;
  }
}

.disabled {
  color: orange;
}
// post title
.instagram-card-content-user {
  margin-bottom: 1rem;
  word-break: break-all;
}

// add comment
.task-input {
  display: flex;
  margin: 1rem auto;
  width: 90%;
  outline: none;
  border: none;
  color: #4e5559;

  &:placeholder {
    color: #4e5559;
  }
}

// Date of publication
.card-createdat{
  font-size : 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-left: 1rem;
}
.modal {
  &__actions {
    display: flex;
    justify-content: space-around;
  }
}
</style>