<template>
<div>
    <el-dialog
    :title="title"
    :visible.sync="display"
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
        title:'弹框',
        display:false,
      }
    },
    created: function() {
        this.configs = 'config' in this.config ? [this.config.config] : [];
        this.display = 'display' in this.config ? this.config.display : false;
        this.title = 'title' in this.config ? this.config.title : '弹框';
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
