<template>
    <div>
        <el-form-item :label="field.name">
            <el-checkbox-group v-model="selectValue">
                <el-checkbox v-for="(item,key) in field.map" :label="key" :key="key">{{item}}</el-checkbox>
                <!-- :checked="field.value && field.value.includes(key)" -->
            </el-checkbox-group>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: 'CheckBox',
  props: ['field', 'value'],
  data () {
    return {
      selectValue: this.value
    }
  },
  watch: {
    selectValue: function (newValue, oldValue) {
      this.$emit('input', newValue)
    },
    value: function (newValue, oldValue) {
      this.selectValue = newValue
    }
  },
  methods: {
  }
}
</script>

