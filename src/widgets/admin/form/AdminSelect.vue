<template>
  <div>
  	<el-form-item :label="field.name">
      <el-select v-model="selectValue" :name="field.field">
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
      selectValue: this.value
    }
  },
  watch: {
    selectValue: function (newValue, oldValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
