<template>
<div>
    <el-button :type="action.color ? action.color : 'default'" :size="action.size ? action.size : 'mini'" v-for="(action, index) in actions" v-bind:key="index" @click="triggerAction(index)" :disabled="action.isDisabled == true" :class="{'btn-hide':action.isShow != true}">{{ action.name }}</el-button>
</div>
</template>
<script>
import request from "@/utils/service";
export default {
  props: ['actions'],
  methods: {
    triggerAction: function(index) {
      this.$emit('click', this.actions[index].id, this.actions[index]);
    }
  }
};
</script>

<style scoped>
.btn-hide{display: none;}
</style>
