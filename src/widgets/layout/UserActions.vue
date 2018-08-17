<template>
  <el-dropdown class="avatar-container" trigger="click">
    <div class="avatar-wrapper">
      用户名
      <i class="el-icon-caret-bottom"></i>
    </div>
    <el-dropdown-menu class="user-dropdown" slot="dropdown">
      <router-link class='inlineBlock' to="/">
        <el-dropdown-item>
          首页
        </el-dropdown-item>
      </router-link>
      <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  methods: {
    logout () {
      //    this.$store.dispatch('LogOut').then(() => {
      //      location.reload()// 为了重新实例化vue-router对象 避免bug
      //    })
    }
  }
}
</script>

<style scoped>
</style>
