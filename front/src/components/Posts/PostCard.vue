<template>
  <div class="post">
    <!-- header card -->
    <div class="instagram-card-header">
      <img
        class="instagram-card-user-image"
        src="https://pbs.twimg.com/profile_images/564682290303729665/Nl1tsx2v_400x400.jpeg"
      />
      <a
        class="instagram-card-user-name"
        href="https://twitter.com/adhamdannaway"
        >AdhamDannaway</a
      >
    </div>
    <!-- image card -->
    <div class="instagram-card-image">
      <img src="https://pbs.twimg.com/media/CjLbBP7VAAAX0HP.jpg:large" />
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
        10 must-read UX design books
        fnezoifnzoejfzoipjfozj,fopzjeopfjzpojffozjoifejozijefozjeopjfozpijfjzpjfefz
      </p>
      <ul class="comments">
        <li v-for="(comment, index) in comments"
        :key="index"
        :comment="comment">

        </li>{{comment}}</ul>
      <p class="date">Hace 8 días</p>
      <hr />
    </div>

    <!-- add a comment -->
    <div class="instagram-card-footer">
      <input
        v-model="newComment"
        v-on:keyup.enter="addComment"
        placeholder="Ajoute un commentaire..."
      />
    </div>
  </div>
</template>

<script>
// import DeleteBtn from "@/components/Base/DeleteBtn.vue";
// import ScrollDownMouse from "@/components/Base/ScrollDownMouse.vue";

export default {
  components: {
    // DeleteBtn,
    // ScrollDownMouse,
  },
  data() {
    return {
      newComment: "",
      comments: ["Looks great Julianne!", "bonjour"],
      likesCount: "55",
      disLikesCount: "33",
    };
  },
};
</script>
<style lang="scss" scoped>
.post {
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
}

.instagram-card-header {
  padding: 15px;
  padding-top: 40px;
  display: flex;
  align-items: center;
}
.instagram-card-user-image {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 15px;
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
  color: #ccc;
  text-transform: uppercase;
}
hr {
  border: none;
  border-bottom: 1px solid #ccc;
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