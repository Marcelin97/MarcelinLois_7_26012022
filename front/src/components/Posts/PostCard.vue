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
            <div class="_abm0">
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
      <p class="date">Hace 8 días</p>
      <hr />
    </div>

    <!-- add a comment -->
    <div class="instagram-card-footer">
      <input
        type="text"
        autocomplete="off"
        v-model="newComment"
        v-on:keyup.enter="addComment"
        :placeholder="'Commenter en tant que' + ' ' + user.username"
        class="task-input"
      />
    </div>
  </div>
</template>

<script>
// import DeleteBtn from "@/components/Base/DeleteBtn.vue";
// import ScrollDownMouse from "@/components/Base/ScrollDownMouse.vue";

export default {
  name: "Post-Card",
  props: ["post"],
  components: {
    // DeleteBtn,
    // ScrollDownMouse,
  },
  data() {
    return {
      show: false,
      user: [],
      creatorInfo: [], // creator of the post card
      newComment: "",
      comments: ["Looks great Julianne!", "bonjour"],
      likesCount: "55",
      disLikesCount: "33",
    };
  },
  mounted() {
    this.creatorInfo = this.post.users;
    console.log("icii ", this.creatorInfo);
    this.user = this.$store.state.user;
    console.log("currentUser ", this.user);
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;

  .dropdown-btn {
    background: transparent;
    border: none;
    font-size: 18px;
    font-weight: bolder;
  }

  .dropdown-content {
    display: none;

    /* Position it right below the trigger element */
    left: 0;
    padding-top: 4px;
    position: absolute;
    top: 100%;

    /* It should be on the top of other elements */
    background-color: #fff;
    z-index: 9999;

    /* Size */
    height: 200px;
    width: 200px;
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        a {
          display: block;
          width: 100%;
          padding: 5px 10px;
          text-decoration: none;
          color: #333;
          &:hover {
            background-color: rgb(208, 208, 208);
          }
        }
      }
    }
  }
  .show {
    display: block;
  }
}

.post {
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.instagram-card-header {
  // padding: 5px;
  // display: flex;
  // align-items: center;
  // border-bottom : 1px solid #ccc;
  background-color: rgb(255, 255, 255);
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
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: calc(100% - 48px);
  // padding: 14px 4px 14px 16px;
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
  text-decoration: none;
  color: #000;
}

.instagram-card-image img {
  width: 100%;
}

.menu {
  justify-content: center;
  padding-right: 4px;
}
._abl- {
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px;
}
._abm0 {
  align-items: center;
  display: flex;
  justify-content: center;
}
.instagram-card-content {
  padding: 15px;
}
.instagram-card-content-user {
  margin-bottom: 2rem;
  word-break: break-all;
}
.instagram-card-icon {
  font-size: 24px;
  color: #000;
  margin-right: 10px;
}
.instagram-bookmark {
  float: right;
  margin-right: 0;
}
.date {
  font-size: 10px;
  color: #4e5559;
  text-transform: uppercase;
}
hr {
  border: none;
  border-bottom: 1px solid #4e5559;
  margin: 0;
}
.vote {
  float: right;
  margin: -25px 0 0 20px;
  position: relative;
  width: 80px;
}
.like-count,
.icon-rocknroll {
  font-size: 0.75rem;
  opacity: 1;
}
.like-count {
  font-weight: 300;
}
.icon-rocknroll {
  color: red;
  font-size: 0.85rem;

  &:hover {
    opacity: 0.5;
  }
}
.like-count {
  color: red;

  &:hover {
    opacity: 0.5;
  }
}
article:hover .icon-rocknroll,
article:hover .like-count {
  opacity: 1;
}
.like-data {
  float: right;
}
.icon-rocknroll {
  background: none;
  border: 0;
  outline: none;
  cursor: pointer;
  margin: 0 0.125rem 0 0;
  padding: 0;
}

.task-input {
  display: flex;
  margin: 1rem auto;
  width: 90%;
  outline: none;
  border: none;
  border-bottom: 1px solid #4e5559;
  color: #4e5559;

  &:placeholder {
    color: #4e5559;
  }
}

#app {
  background: #212222;
  color: #fff;
  letter-spacing: 0.04em;
  text-align: center;
  margin: 60px;
  width: 370px;
  margin: 0 auto;
  display: table;
  padding: 20px;
  line-height: 1.4em;
}

.name {
  color: #ccc;
}

small {
  color: #bbb;
  font-size: 10px;
}

h3 {
  margin: 5px 0 4px;
}

.main-photo {
  width: 300px;
}

.main-profile {
  float: left;
  border: 3px solid white;
  margin: -25px 0 0 20px;
  position: relative;
  width: 80px;
}

.main-info {
  float: left;
  padding: 10px 20px;
  text-align: left;
  margin-bottom: 15px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

li {
  list-style: none outside none;
  text-align: left;
  padding: 10px 0;
  border-bottom: 1px solid #555;
}

ul {
  width: inherit;
  margin: 0;
  padding: 0 35px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

input {
  width: 280px;
  margin: 30px 0;
  padding: 8px 10px;
  outline: 0;
}
</style>