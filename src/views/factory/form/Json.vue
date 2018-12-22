<template>
  <div>
    <div v-for="(field,index) in jsonArray" :key="index" v-if="isList">
      <div class="topic_container">
        <div class="topic_index"> {{index + 1 }}.</div>
        <component :is="field.type | typeFilter" :params="field" :index="index" v-on:makeAnswer="makeAnswer" class="topic_main">组件初始化失败</component>
      </div>
    </div>
    <div v-else>
      <component :is="jsonArray.type | typeFilter" :params="jsonArray">组件初始化失败</component>
    </div>
  </div>
</template>

<script>

import JsonBlank from './json/Blank'
import JsonOrdered from './json/Ordered'
import JsonDefault from './json/Default'

const formConfig = {
  blank: 'JsonBlank',
  ordered: 'JsonOrdered'
}

export default {
  name: 'AdminJson',
  props: ['field', 'value', 'initData'],
  components: {
    JsonBlank, JsonOrdered, JsonDefault
  },
  data () {
    return {
      jsonArray: [],
      isList: true,
      isAnswer: false,
      answers: []
    }
  },
  created () {
    this.fillValues(this.value)
  },
  filters: {
    typeFilter: function (key) {
      if (formConfig[key] === undefined) {
        return 'JsonDefault'
      } else {
        return formConfig[key]
      }
    }
  },
  methods: {
    fillValues (values) {
      if (values === undefined) {
        return false
      }
      let jsonArray = []
      let answers = typeof values === 'string' ? JSON.parse(values) : values
      if (this.field.question !== undefined && this.initData[this.field.question] !== undefined) {
        let questions = this.initData[this.field.question]
        questions = typeof questions === 'string' ? JSON.parse(questions) : questions
        for (let i = 0; i < questions.length; i++) {
          jsonArray[i] = questions[i]
          jsonArray[i]['userAnswer'] = ''
          if (answers[i] !== undefined) {
            jsonArray[i]['userAnswer'] = answers[i]
          }
          this.isAnswer = true
        }
      } else {
        jsonArray = answers
      }
      this.jsonArray = jsonArray
      this.isList = this.jsonArray instanceof Array
    },
    makeAnswer (index, value) {
      this.$set(this.answers, index, value)
    }
  },
  watch: {
    answers: {
      handler (newValue, oldValue) {
        this.$emit('input', JSON.stringify(newValue))
      },
      deep: true
    },
    value: function (newValue, oldValue) {
      this.fillValues(newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topic_container{
  display: flex;
  margin-bottom: 20px;
}
.topic_index {
  padding: 0 15px 0 0;
}
.topic_main {
  flex:1;
}
</style>
