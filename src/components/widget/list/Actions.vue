<template>
<div>
    <el-button type="primary" v-for="action in actions" v-bind:key="action.index" @click="action.method(action)">{{ action.name }}</el-button>

    <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>{{dialogMessage}}</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{dialogCancelValue}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{dialogOkValue}}</el-button>
    </span>
    </el-dialog>
</div>
</template>
<script>

import request from '@/utils/service';
export default {
    props: {
      actions: Array,
      dialogTitle: {
        type:String,
        default:'提示'
      },
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
      }
    },
    data(){
      return {
        dialogVisible: false,
      }
    },
    created: function() {
        var action = [];
        for (action in this.actions) {
            this.actions[action]['method'] = this['handle'+this.actions[action]['type']];
        }
    },
    methods: {
        handlepage: function(action){
            this.$router.push({ path: action.url , params: action.params})
        },
        handleajax: function(action){
            this.dialogVisible = true;
            // request({
            //   url:action.url,
            //   method: 'post',
            //   data: {
            //   }}, ).then(res=>{
              
            // });
        },
        handlecallback: function(action){
          this.$emit(action['callback'], action);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    }
}
</script>

<style scoped>

</style>
