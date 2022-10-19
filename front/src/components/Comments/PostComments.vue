<template>
  <div class="py-4 comments">
    <div class="col-12 comments-content">
      <!-- <p class="comments-createdAt">{{ showDate }}</p> -->
      <p class="comments-text">{{ comment.content }}</p>
    </div>
  </div>

</template>

<script>
import commentsApi from '@/api/comments'
export default {
  name: 'List-Comment',
  props: ["comment"],
  methods: {
    async onCommentReport () {
      if (confirm('L\'administrateur sera notifié, souhaitez-vous signaler ce commentaire ?')) {
        try {
          await commentsApi.commentReport(this.comment.id)
          alert('Commentaire signalé avec succès')
        } catch (e) {
          alert(e.data.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comments {
  &:nth-child(even) {
    background: rgb(255,255,255);
    background: linear-gradient(130deg, white 60%, #f4f4f4 100%);
  }
  &-title {
    position: relative;
    svg {
      font-size: 1.8rem;
    }
  }
  &-report {
    text-align: right;
    a {
      font-weight: bold;
      &.warning {
        color: darkred;
      }
    }
  }
  &-createdAt {
    font-size: 0.8rem;
  }
}
</style>