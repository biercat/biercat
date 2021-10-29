<template>
  <div class="layout">
    <app-header></app-header>

    <app-nav-bar></app-nav-bar>

    <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader/index.vue";
import AppNavBar from "./AppNavbar/index.vue";
import AppMain from "./AppMain/index.vue";
export default {
  components: {
    AppHeader,
    AppNavBar,
    AppMain,
  },
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}


</style>