<template>
<div>
    <el-button v-bind:type="action.color ? action.color : 'default'" v-bind:size="action.size ? action.size : 'mini'" v-for="(action, index) in actions" v-bind:key="index" @click.stop="click(index)" v-bind:disabled="action.isDisabled == true" v-bind:class="{'btn-hide':action.isShow != true}">{{ action.name }}</el-button>
</div>
</template>
<script>
/*
【按钮组渲染组件】
用于后台渲染一组按钮，实现了config配置渲染机制，及自动折叠等。
@配置：
config:{
  actions:[
      
  ]
}


@事件：
click(action, actionParams)

*/
import request from "@/utils/service";
export default {
  props: ["config"],
  data() {
    return {
      actions: []
    };
  },
  created() {
    this.actions = this.config.actions;
  },
  watch: {
    config: {
      handler(newValue, oldValue) {
        this.actions = newValue.actions;
      },
      deep: true
    }
  },
  methods: {
    click: function(index) {
      this.$emit("click", this.actions[index].id, this.actions[index]);
    }
  }
};
</script>

<style scoped>
.btn-hide {
  display: none;
}
</style>
