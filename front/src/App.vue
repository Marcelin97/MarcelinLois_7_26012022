<template>
  <header></header>
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
  <footer></footer>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  background-color: #4E5166;
}
</style>
