<template>
    <div>
        <component v-bind:is="config.type" v-bind:config="config" v-for="(config,index) in configs" v-bind:key="index">组件初始化失败</component>
    </div>
</template>

<script>

import {
  AdminForm,
  AdminList,
  AdminTree,
  AdminStatistics
} from "@/widgets/admin";
export default {
  name: "factory",
  components: {
    AdminForm,
    AdminList,
    AdminTree,
    AdminStatistics
  },
  props: ["configs"]
};
</script>

<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  .main-container {
    min-height: 100%;
    margin-left: 180px;
    transition: margin-left 0.28s;
  }
  .menu-wrapper {
    width: 180px;
  }
  &.hideSidebar {
    .main-container {
      margin-left: 64px;
    }
    .menu-wrapper {
      width: 64px;
    }
  }
}
</style>