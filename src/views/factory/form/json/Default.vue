<template>
  <div>
    <div v-for="(value,key) in jsonObject" :key="key">
      <admin-input :field="{'name':key,'field':key}" :value="format_value(value)"></admin-input>
    </div>
  </div>
</template>

<script>

import AdminInput from '../Input'

export default {
  name: 'AdminJsonDefault',
  props: ['params'],
  components: {
    AdminInput
  },
  data () {
    return {
      jsonObject: this.params
    }
  },
  methods: {
    format_value (value) {
      if (typeof value === 'string') {
        return value
      }
      return JSON.stringify(value)
    }
  },
  watch: {
    jsonObject: function (newValue, oldValue) {
      // this.$emit('input', newValue)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
