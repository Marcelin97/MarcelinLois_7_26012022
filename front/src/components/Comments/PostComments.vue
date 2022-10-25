<template>
  <div class="comments">
    <div class="comments-content">
      <p class="comments-createdAt">{{ showDate }}</p>
      <p class="comments-text">{{ content }}</p>
    </div>
    <div class="actions">
      <deleteBtn class="btn-danger" @click.prevent.stop="$emit('delete-comment', this.comment.id)"
/>
      <button
        type="button"
        @click="$refs.reportComment.openModal()"
        text="Signaler ce commentaire"
        aria-label="Signaler ce commentaire"
      >
        Signaler
      </button>
    </div>

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
          <p class="error-msg">{{ apiError }}</p>
        </div>
        <!-- gestion erreur API avec axios -->
      </template>
    </modalStructure>
  </div>
</template>

<script>
import modalStructure from "../Modal/ModalStructure.vue";
import deleteBtn from "../Base/DeleteBtn.vue";

import commentsApi from "@/api/comments";

import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import roleMixin from "../../mixins/role.mixin";

import timeAgo from "@/services/timeAgo";

export default {
  name: "List-Comment",
  props: ["comment", "content", "index"],
  components: {
    modalStructure,
    deleteBtn
  },
  data() {
    return {
      currentUser: [],
      apiErrors: "",
    };
  },
  mixins: [roleMixin],
  setup() {
    const state = reactive({
      comment: {
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
    }));

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  validationConfig: {
    $lazy: true,
  },
  computed: {
    showDate() {
      if (this.comment.createdAt !== this.comment.updatedAt) {
        return `Mis à jour ${timeAgo.format(new Date(this.comment.updatedAt))}`;
      }
      return `Posté ${timeAgo.format(new Date(this.comment.createdAt))}`;
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
            // notification success
            this.$notify({
              type: "success",
              title: `Signalement`,
              text: `Merci, votre rapport a été envoyé.`,
              duration: 30000,
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
}

.comments-content {
  display: flex;
  flex-direction: column;
  border-bottom: 1px #ccc dashed;
  margin-bottom: 1rem;
}

.comments-createdAt {
  font-size: 0.4rem;
  text-transform: uppercase;
}
// .comments-text{
//   margin-bottom: 1rem;
// }

// Actions 
.actions{
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
}
.btn-danger{
  width: 5rem;
  height: auto;
  font-size: 0.4rem;
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