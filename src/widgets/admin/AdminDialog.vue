<template>
<div>
    <el-dialog
    v-bind:title="config.title"
    :visible.sync="config.display"
    :before-close="closeCallback">
        <admin-builder v-bind:configs="config.config"></admin-builder>
    </el-dialog>
</div>
</template>
<script>
import request from "@/utils/service";
export default {
  props: ["config"],
  methods: {
    handlepage: function(action) {
      this.$router.push({ path: action.url, params: action.params });
    },
    handleajax: function(action) {
      this.dialogVisible = true;
    },
    handlecallback: function(action) {
      this.$emit(action["callback"], action);
    },
    closeCallback(done) {
      done();
    }
  }
};
</script>

<style scoped>
</style>
