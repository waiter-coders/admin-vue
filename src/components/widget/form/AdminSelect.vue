<template>
  <div>
  	<el-form-item :label="field.name">
      <el-select v-model="formData[field.field]" :name="field.field">
        <el-option v-for="(item,key) in field.enum" :key="'option_'+key" :label="item" :value="key"></el-option>
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
      formData: initFormData(this.field.field)
    }
  },
  props: ['field'],
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
