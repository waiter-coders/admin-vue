<template>
  <div class="admin-form">
  	<el-form ref="form" :model="formData" label-width="80px" class="form-inline" @submit.native.prevent>
       <component :is="field.type | typeFilter" :field="field" v-for="(field,index) in config.fields" v-bind:key="index">组件初始化失败</component>
       <el-form-item>
         <el-button type="primary" @click="submitForm">提交</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {CheckBox, Datetime, Editor, AdminInput, AdminSelect} from './form'
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
      var value = '';
      switch (key) {
        case 'int':
          value = 'admin-input'
          break;
        case 'enum':
          value = 'admin-select'
          break;
        case 'multi':
          value = 'check-box'
          break;
        default:
          value = 'admin-input'
          break;
      }
      return value;
    }
  },
  methods :{
    submitForm: function(){
      console.log( this );
      console.log( this.$ref );
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
