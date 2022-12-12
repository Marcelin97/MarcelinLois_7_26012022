<template>
  <div>
    <!-- header -->
    <Header v-if="!isLogin" />

    <!-- main -->
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
      <notifications
        id="notifications"
        position="top right"
        :duration="3000"
        :ignoreDuplicates="true"
        :reverse="true"
      />
    </main>

    <!-- footer -->
    <Footer v-if="!isLogin" />
  </div>
</template>

<script>
import Header from "@/components/Menu/HeaderNavigation.vue";
import Footer from "@/components/Footer/FooterPage.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    isLogin() {
      // Hide a components using router name
      return (
        this.$route.name === "home" ||
        this.$route.name === "account" ||
        this.$route.name === "signup" ||
        this.$route.name === "login"
      );
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffff;
}
main{
  margin-top: 3rem;
}
</style>
