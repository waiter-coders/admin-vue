<template>
  <div class="admin-form">
  	<el-form ref="form" :model="formData" label-width="100px" class="form-inline" @submit.native.prevent>
       <component :is="field.type | typeFilter" :field="field" v-for="(field,index) in config.fields" v-bind:key="index">组件初始化失败</component>
       <el-form-item>
         <el-button type="primary" @click="submitForm">提交</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {CheckBox, Datetime, Editor, AdminInput, AdminSelect} from './form'
import { formConfig }  from '@/utils/loader'
import { add } from '@/api/factory/form'
export default {
  name: 'AdminForm',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      formData: {}
    }
  },
  props: ['config'],
  components: {
    CheckBox, Datetime, Editor, AdminInput, AdminSelect
  },
  filters: {
    typeFilter: function(key){
      return formConfig[key];
    }
  },
  methods :{
    getFormData: function(){
     
    },
    submitForm: function(){
      let url = this.config.url;
      let $el = this.$children[0].$children;
      let data = {};

      // let data = 
      console.log( this.$children[0].$children );
      $el.forEach(element => {
        Object.assign( data, element.formData);
      });
      console.log( data );
      add(url,data).then( res => {
        
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.admin-form{
  padding: 20px 30px;
  .form-inline{
    width:800px;
  }
}
</style>
