<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<style>
body,html {
  margin: 0px auto;
  width: 100%;
  height: 100%; 
}
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
[v-cloak]{
  display: none;
}

</style>
