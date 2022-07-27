<template>
  <div>
    <!-- header -->
    <!-- <Header /> -->

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
        position="bottom right"
        :duration="3000"
        :ignoreDuplicates="true"
        :reverse="true"
        :animation-type="velocity"
      />
    </main>

    <!-- footer -->
    <footer />
  </div>
</template>

<script>
// import Header from "@/components/Menu/HeaderNavigation.vue"

export default {
  name: "App",
  components: {
    // Header,
  }
};
</script>

<style lang="scss">

.nav-header{
  visibility: hidden !important;
}
body {
  background-color: #ffff;
}
</style>
