<template>
  <div class="comments">
    <div class="comments-content">
      <p class="comments-createdAt">{{ showDate }}</p>
      <p class="comments-text">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import commentsApi from "@/api/comments";
import timeAgo from "@/services/timeAgo";

export default {
  name: "List-Comment",
  props: ["comment", "content", "index"],
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
      if (
        confirm(
          "L'administrateur sera notifié, souhaitez-vous signaler ce commentaire ?"
        )
      ) {
        try {
          await commentsApi.commentReport(this.comment.id);
          alert("Commentaire signalé avec succès");
        } catch (e) {
          alert(e.data.message);
        }
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
</style>