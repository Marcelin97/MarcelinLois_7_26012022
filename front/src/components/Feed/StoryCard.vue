<template>
  <div class="main">
    <div class="wrapper">
      <div class="left-col">
        <div class="status-wrapper">
          <!-- LINK TO COMMUNITY -->
          <router-link
            class="more"
            :to="`/communities/profil/${this.id}`"
            aria-label="Profile de la communauté"
          >
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
.status-wrapper {
  width: 100%;
  border-radius: 2px;
  padding: 10px;
  padding-right: 0;
  overflow: hidden;
  overflow-x: auto;
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
  height: 15px;
  // overflow: hidden;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
