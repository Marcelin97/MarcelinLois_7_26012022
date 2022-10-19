<template>
  <div id="comments" ref="loadingContainer" class="vld-parent">
    <h2>Poster un commentaire</h2>
    <!-- Post comment form -->
    <form action="#" method="post" @submit.prevent="postComment()">
      <div>
        <textarea
          name="answer-comment"
          id="answer-comment"
          rows="10"
          placeholder="Répondre au poste... (min 5 caractères)"
          maxlength="255"
          minlength="5"
          required
          v-model="commentContent"
        ></textarea>
      </div>

      <Button type="submit" success>Répondre</Button>
    </form>

    <!-- Comments list -->
    <h2>Liste des commentaires</h2>
    <PostComment
      v-for="comment in comments"
      :key="comment.id"
      :separator="separator"
      v-bind="comment"
      :Community="Community"
      @delete-comment="this.$emit('delete-comment', $event)"
      @add-subcomment="postSubComment"
    />

    <p v-if="comments.length === 0">
      Il n'y a aucun commentaire pour le moment. Soyez le premier !
    </p>
  </div>
</template>