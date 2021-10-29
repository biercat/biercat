<template>
  <div class="navbar">
    <el-menu
      :router="true"
      :default-active="msg"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 有个BUG   在当前页面选中其他路由的时候  在次刷新  样式显示不正确 -->
      <!-- 以解决 刷新时 让default的值  实时等于   当前路径 -->
      <el-menu-item index="/teacher">
        <i class="el-icon-user-solid"></i>
        <span slot="title">教师管理</span>
      </el-menu-item>

      <el-menu-item index="/student">
        <i class="el-icon-table-lamp"></i>
        <span slot="title">学员管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
 data () {
   return {
     msg:this.$route.path
   }
 }
};
</script>

<style scoped>
.navbar {
  position: absolute;
  width: 16%;
  top: 50px;
  left: 0px;
  overflow: hidden;
}
</style>