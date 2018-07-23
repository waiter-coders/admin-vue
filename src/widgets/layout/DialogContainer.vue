<template>
<div>
    <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="30%"
    :before-close="handleClose">
        <admin-builder :configs="configs"></admin-builder>
    </el-dialog>
</div>
</template>
<script>

import request from '@/utils/service';
export default {
    props: ['config'],
    data(){
      return {
          configs:[],
        actions: [],
        title:'提示真哥哥热榜',
        dialogMessage: {
            type:String,
            default:'你确定要执行吗？'
        },
        dialogCancelValue: {
            type:String,
            default:'取消'
        },
        dialogOkValue: {
            type:String,
            default:'确定'
        },
        isShow:true,
      }
    },
    created: function() {
        var action = [];
        for (action in this.actions) {
            this.actions[action]['method'] = this['handle'+this.actions[action]['type']];
        }
        this.configs = [this.config];
    },
    methods: {
        handlepage: function(action){
            this.$router.push({ path: action.url , params: action.params})
        },
        handleajax: function(action){
            this.dialogVisible = true;
        },
        handlecallback: function(action){
          this.$emit(action['callback'], action);
        },
        handleClose(done) {
            done();
        }
    }
}
</script>

<style scoped>

</style>
