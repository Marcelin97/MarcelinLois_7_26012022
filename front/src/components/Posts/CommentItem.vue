<template>
  <div>
    <div>
      <p>{{ comment.content }}</p>
      
    </div>
    <div>
      <p>
        {{ comment.author.name }} <span>&bull;</span
        >{{ comment.created_at }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        user: {
        required: true,
        type: Object,
    },
            comment: {
                required: true,
                type: Object,
            }
        },
  data: function () {
    return {
        state: 'default',
        data: {
            content: this.comment.content,
        }
    };
  },
  computed: {
    editable() {
        return this.user.id === this.comment.author.id;
    }
}
};
</script>