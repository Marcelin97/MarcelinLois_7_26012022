<template>
  <div class="post">
    <!-- header card -->
    <div class="instagram-card-header">
      <div class="header">
        <div class="header-left">
          <div class="profile-pic">
            <img
              class="instagram-card-user-image"
              v-if="creatorInfo.imageUrl"
              :src="`http://localhost:3000${creatorInfo.imageUrl}`"
              :alt="'Avatar de ' + creatorInfo.imageUrl"
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

          <p class="instagram-card-user-name">{{ creatorInfo.username }}</p>
        </div>
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
              <li><a href="">Mofifier</a></li>
              <li><a href="">Signaler</a></li>
              <li><a href="">Supprimer</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- image card -->
    <div class="instagram-card-image">
      <img alt="photo du post" :src="`http://localhost:3000${post.imageUrl}`" />
    </div>
    <!-- content card -->
    <div class="instagram-card-content">
      <div class="like-data">
        <button class="icon-rocknroll">☝️</button
        ><span class="like-count">{{ likesCount }}</span>
      </div>
      <div class="like-data">
        <button class="icon-rocknroll">👎</button
        ><span class="like-count">{{ disLikesCount }}</span>
      </div>
      <p class="instagram-card-content-user">
        {{ post.content }}
      </p>
      <ul class="comments">
        <li
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
        ></li>
        {{
          comment
        }}
      </ul>
      <!-- <p class="date">Hace 8 días</p> -->
    </div>

    <!-- add a comment -->
    <div class="instagram-card-footer">
      <input
        type="text"
        autocomplete="off"
        v-model="newComment"
        v-on:keyup.enter="addComment"
        :placeholder="'Commenter en tant que' + ' ' + currentUser.username"
        class="task-input"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "Post-Card",
  props: ["post", "creatorInfo"],
  components: {
    // DeleteBtn,
    // ScrollDownMouse,
  },
  data() {
    return {
      currentUser: [],
      show: false,
      newComment: "",
      comments: ["Looks great Julianne!", "bonjour"],
      likesCount: "5",
      disLikesCount: "3",
    };
  },
  mounted() { 
   this.currentUser = this.$store.state.user;
  }
};
</script>
<style lang="scss" scoped>
.post {
  max-width: 480px;
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

        a {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 5px 10px;
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

// post title
.instagram-card-content-user {
  margin-bottom: 2rem;
  word-break: break-all;
}

// .date {
//   font-size: 10px;
//   color: #4e5559;
//   text-transform: uppercase;
// }

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
</style>