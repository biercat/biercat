<template>
  <div class="main">
    <linka v-show="$route.path !== '/home'"></linka>
    <router-view></router-view>
  </div>
</template>

<script>
import linka from "./link.vue";
export default {
  components: {
    linka,
  },
};
</script>

<style scodep>

.main {
  position: absolute;
  top: 50px;
  left: 16%;
  width: 80%;
  padding: 10px;
  overflow: hidden;
}
</style>