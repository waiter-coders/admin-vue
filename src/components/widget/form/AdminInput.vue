<template>
  <div>
  	<el-form-item :label="field.name" v-if="!field.primaryKey">
      <el-input v-model="formData[field.field]" :name="field.field"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import { initFormData } from '@/utils/loader';
export default {
  name: 'AdminInput',
  data () {
    return {
      formData: initFormData(this.field.field)
    }
  },
  props: ['field'],
  mounted:function(){
    //console.log(this.formData);
  },
  methods: {
    getFormData: function(){
      var model = {};
      model[this.field.field] = '';
      return model;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
