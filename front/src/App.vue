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
      <notifications
        position="bottom right" :duration="3000" :ignoreDuplicates="true" :reverse="true" :animation-type="velocity"
      />
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
