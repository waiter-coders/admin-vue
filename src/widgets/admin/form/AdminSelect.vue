<template>
  <div>
  	<el-form-item :label="field.name">
      <el-select v-model="formData[field.field]" :name="field.field">
        <el-option v-for="(item,key) in field.map" :key="'option_'+key" :label="item" :value="key"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import { initFormData } from '@/utils/loader';
export default {
  name: 'AdminSelect',
  data () {
    return {
      formData: initFormData(this.field.field, this.field.value)
    }
  },
  props: ['field'],
  mounted:function(){
    console.log( this.formData );
  },
  methods: {
    getElementData(key){
      var model = {};
      model[this.field.field] =  '';
      console.log( model );
      return model;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
