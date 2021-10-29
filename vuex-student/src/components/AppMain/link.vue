<template>
  <div class="ll">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item id="line" :to="{ path: $route.path }"
        >{{$route.meta.title}}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  
}
/* .el-breadcrumb-item {
  cursor: pointer;
} */
.el-breadcrumb__inner {
  cursor: pointer !important;
}
.ll{
  margin-bottom: 20px;
}
</style>