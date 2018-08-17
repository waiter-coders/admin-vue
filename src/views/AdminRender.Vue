<template>
    <div>
        <admin-builder :configs="configs"></admin-builder>
    </div>
</template>

<script>
import { getConfigs } from "@/api/admin/adminRender";
export default {
  name: "factory",
  data() {
    return {
      configs: []
    };
  },
  created: function() {
    this.getConfigs();
  },
  methods: {
    getConfigs() {
      var _this = this;
      var controller = _this.$route.path;
      console.log(controller);
      // _this.$store.dispatch('addConfig', controller);
      getConfigs(controller).then(function(response) {
        _this.configs = response;
        console.log(_this.configs);
        console.log("-------get configs is over");
      });
    }
  }
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