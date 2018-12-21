<template>
  <div>
      <span v-for="(value,key) in topic" :key="key">
        <input v-if="value == '@input@'" style="padding:5px 8px;" v-model="userAnswer[key]">
        <br v-else-if="value == '@br@'">
        <div v-else-if="value == '@textarea@'"><textarea style="resize:none;width:50%;height:150px;margin:16px 0 0 0;padding:12px 15px;"  v-model="userAnswer[key]"></textarea></div>
        <span v-else>{{ value }}</span>
      </span>
  </div>
</template>

<script>

import AdminInput from '../Input'

export default {
  name: 'AdminJsonDefault',
  props: ['params', 'index'],
  components: {
    AdminInput
  },
  data () {
    return {
      topic: this.params.topic,
      userAnswer: []
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
    userAnswer: function (newValue, oldValue) {
      let response = []
      for (let i = 0; i < this.topic.length; i++) {
        if (this.topic[i] === '@input@' || this.topic[i] === '@textarea@') {
          let input = newValue[i]
          input = input === undefined ? '' : input
          response.push(input)
        }
      }
      this.$emit('makeAnswer', this.index, response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
