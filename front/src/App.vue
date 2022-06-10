<template>
  <main>
    <header></header>
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </main>
    <footer></footer>
  </main>
</template>

<script>

export default {
  name: "App",
};
</script>

<style lang="scss">
* {
  background-color: rgb(12, 19, 31);
}
</style>
