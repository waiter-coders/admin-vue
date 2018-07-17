<template>
<div>
    <el-button :type="action.color ? action.color : 'default'" :size="action.size ? action.size : 'mini'" v-for="(action, index) in actions" v-bind:key="index" @click.stop="click(index)" :disabled="action.isDisabled == true" :class="{'btn-hide':action.isShow != true}">{{ action.name }}</el-button>
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
  props: ['config'],
  data(){
    return {'actions':[]}
  },
  created(){
    this.actions = this.config.actions
  },
  methods: {
    click: function(index) {
      this.$emit('click', this.actions[index].id, this.actions[index]);
    }
  }
};
</script>

<style scoped>
.btn-hide{display: none;}
</style>
