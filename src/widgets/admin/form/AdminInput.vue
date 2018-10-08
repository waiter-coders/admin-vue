<template>
  <div>
  	<el-form-item :label="field.name">
      <el-input v-model="inputValue" :name="field.field"></el-input>
    </el-form-item>
  </div>
</template>

<script>
// import { initFormData } from '@/utils/loader'
export default {
  name: 'AdminInput',
  props: ['field', 'value'],
  data () {
    return {
      inputValue: this.value
    }
  },
  watch: {
    inputValue: function (newValue, oldValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
