<template>
    <div>
        <el-form-item :label="field.name">
            <el-date-picker type="datetime" v-model="inputValue"  :value-format="field.datetime | time" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
    </div>
</template>
<script>
import { timeFormat } from '@/utils/loader'
import dateFormatter from '@/utils/date'

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
      if (oldValue !== undefined) {
        this.$emit('input', dateFormatter.getDateString(newValue))
      }
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

