<template>
    <div>
        <el-form-item :label="field.name">
            <el-date-picker :type="field.datetime" v-model="inputValue" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :value-format="field.datetime | time"></el-date-picker>
        </el-form-item>
    </div>
</template>
<script>
import { timeFormat } from '@/utils/loader'
export default {
  name: 'datetime',
  props: ['field', 'value'],
  data () {
    return {
      inputValue: this.value
    }
  },
  watch: {
    inputValue: function (newValue, oldValue) {
      this.$emit('input', newValue)
    },
    value: function (newValue, oldValue) {
      this.inputValue = newValue
    }
  },
  filters: {
    time: function (val) {
      return timeFormat[val]
    }
  }
}
</script>

