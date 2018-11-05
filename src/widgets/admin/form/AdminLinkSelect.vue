<template>
  <div>
  	<el-form-item :label="field.name">
      <el-select v-for="(select,index) in selectMap" :key="index" v-model="selectValues[index]" @input="changeSelect($event, index)">
        <el-option v-for="(item,key) in select" :key="'option_'+key" :label="item" :value="key"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'AdminTreeSelect',
  props: ['field', 'value'],
  data () {
    return {
      selectValues: []
    }
  },
  computed: {
    selectMap: function () {
      let map = [this.field.map[0][0]]
      for (var i = 0; i < this.field.map.length - 1; i++) {
        if (this.selectValues[i] === undefined) {
          map.push({})
        } else {
          map.push(this.field.map[i + 1][this.selectValues[i]])
        }
      }
      return map
    }
  },
  methods: {
    getTrace: function (value) {
      let selectValues = []
      if (value !== '') {
        let currentValue = value
        for (let i = this.field.map.length - 1; i >= 0; i--) {
          for (var key in this.field.map[i]) {
            if (currentValue in this.field.map[i][key]) {
              selectValues.unshift(currentValue)
              currentValue = key
            }
          }
        }
      }
      return selectValues
    },
    changeSelect: function (item, index) {
      if (index < this.selectValues.length - 1) {
        this.selectValues = this.selectValues.slice(0, index + 1)
      }
    }
  },
  watch: {
    selectValues: function (newValue, oldValue, a, b, c) {
      // 通知上层值的更改
      if (this.selectValues.length < this.field.map.length) {
        this.$emit('input', '')
      } else {
        this.$emit('input', this.selectValues[this.selectValues.length - 1])
      }
    },
    value: function (newValue, oldValue) {
      this.selectValues = this.getTrace(newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
