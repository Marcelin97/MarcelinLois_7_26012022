<template>
  <div class="comments">
    <div class="comments-content">
      <p class="comments-createdAt">{{ showDate }}</p>
      <p class="comments-text">{{ content }}</p>
    </div>
    <div class="actions">
      <button
        v-if="canModerate(this.comment.userId, this.communityId)"
        type="button"
        text="Supprimer ce commentaire"
        aria-label="Supprimer ce commentaire"
        class="btn-danger"
        title="Supprimer ce commentaire"
        @click.stop.prevent="$emit('delete-comment', this.comment.id)"
      >
        Supprimer
      </button>

      <button
        v-if="canAdmin(this.comment.userId)"
        type="button"
        class="btn-update"
        title="Modifier ce commentaire"
        @click="$refs.updateComment.openModal()"
        text="Modifier ce commentaire"
        aria-label="Modifier ce commentaire"
      >
        Modifier
      </button>

      <button
        v-if="this.$store.state.user.id != this.comment.userId"
        type="button"
        class="btn-report"
        title="Signaler ce commentaire"
        @click="$refs.reportComment.openModal()"
        text="Signaler ce commentaire"
        aria-label="Signaler ce commentaire"
      >
        Signaler
      </button>

      <button
        aria-label="Like"
        class="like icon-vote"
        type="button"
        title="Mettre un j'aime"
        @click="like()"
        :class="addClass ? 'liked' : 'unliked'"
        v-text="love"
      ></button>
      <!-- <span :class="addClass"> {{ likeCount }}</span> -->
    </div>

    <!-- modal update comment -->
    <modalStructure ref="updateComment">
      <template v-slot:header>
        <h1>Modifier ce commentaire</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="put">
            <div class="form-group">
              <label class="title-newcomment" for="content"
                >Nouveau commentaire</label
              >
              <input
                class="content-newcomment"
                placeholder="Nouveau commentaire"
                autocomplete="off"
                minlength="3"
                maxlength="255"
                aria-label="Nouveau commentaire"
                id="content"
                type="text"
                v-model="state.commentUpdate.content"
                @blur="v$.commentUpdate.content.$touch"
                :class="
                  v$.commentUpdate.content.$error === true ? 'error' : 'dirty'
                "
              />

              <!-- Error Message -->
              <template v-if="v$.commentUpdate.content.$dirty">
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.commentUpdate.content.$errors"
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
                aria-label="Modifier"
                title="Modifier"
                type="submit"
                class="btn"
                @click.stop.prevent="onUpdateComment"
              >
                Modifier
              </button>
            </div>
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

    <!-- modal report comment -->
    <modalStructure ref="reportComment">
      <template v-slot:header>
        <h1>Signaler ce commentaire</h1>
      </template>

      <template v-slot:body>
        <div class="container">
          <form action="#" method="post">
            <div class="FormGroup">
              <label class="FormGroupLabel" for=""
                >Pourquoi signalez-vous ce commentaire ?</label
              >
              <div class="FormTextboxWrapper">
                <textarea
                  cols="50"
                  rows="5"
                  required
                  class="FormTextbox"
                  type="text"
                  placeholder="Explique nous les raisons de ce signalement."
                  v-model="state.comment.content"
                  @blur="v$.comment.content.$touch"
                  :class="
                    v$.comment.content.$error === true ? 'error' : 'dirty'
                  "
                />
              </div>

              <!-- Error Message -->
              <template v-if="v$.comment.content.$dirty">
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.comment.content.$errors"
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
              @click.prevent.stop="onCommentReport"
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
  </div>
</template>

<script>
import modalStructure from "../Modal/ModalStructure.vue";

import commentsApi from "@/api/comments";
import axiosInstance from "@/services/api";

import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import roleMixin from "../../mixins/role.mixin";

import timeAgo from "@/services/timeAgo";

export default {
  name: "List-Comment",
  props: ["comment", "content", "index", "communityId"],
  emits: ["update-comment", "delete-comment"],
  components: {
    modalStructure,
  },
  data() {
    return {
      currentUser: [],
      apiErrors: "",
      hasLiked: false,
      // likeCount: 0,
      love: "like",
    };
  },
  mixins: [roleMixin],
  setup() {
    const state = reactive({
      comment: {
        content: "",
      },
      commentUpdate: {
        content: "",
      },
    });

    const rules = computed(() => ({
      comment: {
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
      commentUpdate: {
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
  mounted() {
    this.state.commentUpdate.content = this.comment.content;
  },
  computed: {
    showDate() {
      if (this.comment.createdAt !== this.comment.updatedAt) {
        return `Mis à jour ${timeAgo.format(new Date(this.comment.updatedAt))}`;
      }
      return `Posté ${timeAgo.format(new Date(this.comment.createdAt))}`;
    },
    addClass() {
      return this.hasLiked ? "liked" : "";
    },
  },
  methods: {
    async onCommentReport() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        if (
          confirm(
            "L'administrateur et le modérateur seront notifié, souhaitez-vous signaler ce commentaire ?"
          )
        ) {
          try {
            await commentsApi.commentReport(
              this.comment.id,
              this.state.comment
            );

            // close delete modal
            this.$refs.reportComment.closeModal();

            // notification success
            this.$notify({
              type: "success",
              title: `Signalement`,
              text: `Merci, votre rapport a été envoyé.`,
              duration: 20000,
            });
          } catch (e) {
            alert(e.data.message);
          }
        }
      } else {
        // notification d'erreur
        this.$notify({
          type: "warn",
          title: `Veuillez faire un signalement complet.`,
        });

        // montre les erreurs à l'écran
        this.$nextTick(() => {
          let domRect = document
            .querySelector(".error")
            .getBoundingClientRect();
          window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop
          );
        });
      }
    },
    async onUpdateComment() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        axiosInstance
          .put(`/comments/update/${this.comment.id}`, this.state.commentUpdate)
          .then((response) => {
            // console.log(response.data.datas);
            // console.log("test");
            this.$emit("update-comment", response.data.datas, this.comment.id);

            // close delete modal
            this.$refs.updateComment.closeModal();

            // notification de succès
            this.$notify({
              type: "success",
              title: `Commentaire mis à jour`,
              text: `Vous allez être redirigé vers le fil d'actualité.`,
            });
          })
          .catch((error) => {
            this.apiErrors = error;

            // notification error message
            this.$notify({
              type: "error",
              title: `Erreur lors de l'envoi du rapport`,
              text: `${this.apiErrors}`,
              duration: 3000,
            });
          });
      }
    },
    // Like a comment
    async like() {
      try {
        await axiosInstance.post(`/comments/likes/${this.comment.id}`, {
          vote: !this.hasLiked,
        });
        this.hasLiked = !this.hasLiked;
        if (this.hasLiked) {
          this.love = "UnLike";
          this.$notify({
            type: "success",
            title: `Vous aimez ce commentaire`,
          });
        } else {
          this.love = "Like";
        }
      } catch (error) {
        this.apiErrors = error;

        this.$notify({
          type: "error",
          title: `Erreur lors de l'ajout du like`,
          text: `Erreur reporté : ${this.apiErrors}`,
          duration: 30000,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.comments {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 0.8rem;
  color: #95989a;
  padding-top: 0.3rem;

  &:hover {
    .actions {
      opacity: 1;
    }
  }
}

.comments-content {
  display: flex;
  flex-direction: column;
}

.comments-createdAt {
  font-size: 0.4rem;
  text-transform: uppercase;
}

.comments-text {
  margin-bottom: 0.3rem;
}

// Actions
.comments:hover,
.actions {
  transition: 0.25s opacity linear;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  opacity: 0;
}

.btn-danger {
  color: #cc0033;
}

.btn-report {
  color: rgb(0, 149, 246);
}

.liked,
.unliked,
.btn-update,
.btn-report,
.btn-danger {
  opacity: 0.3;
  border: none;
  cursor: pointer;
  font-size: 0.5rem;
  text-align: center;
  text-overflow: ellipsis;
  width: auto;
  background: transparent;
  transition: opacity 0.5s;

  &:hover {
    opacity: initial;
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

// button like or dislike a comment

.liked {
  color: rgb(0, 0, 204);
}

.unliked {
  color: rgb(255, 54, 54);
}

// modal update a comment
.title-newcomment {
  display: flex;
}

.content-newcomment {
  width: 100%;
  padding: 0.2rem;
  margin: 1rem auto;
}
</style>
