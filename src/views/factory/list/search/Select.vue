<template>
  <div>
  	<el-form-item :label="field.name">
      <el-select v-model="selectValue" :name="field.field" filterable placeholder="请选择">
        <el-option v-for="(item,key) in field.map" :key="'option_'+key" :label="item" :value="key"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'AdminSelect',
  props: ['field', 'value'],
  data () {
    return {
      selectValue: ''
    }
  },
  created () {
    if (this.value !== undefined) {
      this.selectValue = parseInt(this.value)
    }
  },
  watch: {
    selectValue: function (newValue, oldValue) {
      this.$emit('input', newValue)
    },
    value: function (newValue, oldValue) {
      this.selectValue = newValue
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
