<template>
  <div class="main">
    <div class="wrapper">
      <div class="left-col">
        <div class="status-wrapper">
          <router-link class="more" :to="`/communities/profil/${this.id}`">
            <div class="status-card">
              <div class="profile-pic">
                <img
                  :src="`http://localhost:3000${community.icon}`"
                  :alt="'Avatar de ' + community.title"
                  aria-label="Photo de la communauté"
                />
              </div>
              <p class="username">{{ community.title }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Community-List",
  props: ["community"],
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.community.id;
  },
};
</script>

<style lang="scss" scoped>
.main {
  justify-content: center;
  display: flex;
  flex-direction: row;
}
.wrapper {
  width: 70%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 100% 100%;
  grid-gap: 30px;
}
.left-col {
  display: flex;
  flex-direction: column;
}
.status-wrapper {
  width: 100%;
  border-radius: 2px;
  padding: 10px;
  padding-right: 0;
  // display: flex;
  // align-items: center;
  overflow: hidden;
  overflow-x: auto;
}
.status-wrapper::-webkit-scrollbar {
  display: none;
}
.status-card {
  flex: 0 0 auto;
  width: 80px;
  max-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
}
.profile-pic {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  padding: 3px;
  background: linear-gradient(45deg, #ffd7d7, #f34642 80%);
}
.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #fff;
}
.username {
  width: auto;
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
}
</style>