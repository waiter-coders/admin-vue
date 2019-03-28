<template>
  <div>
  	<el-form-item :label="field.name">
      <mavon-editor
        class="mavon-editor"
        v-model="inputValue"
        :subfield = "subfield"
        :defaultOpen = "defaultOpen"
        :toolbarsFlag = "toolbarsFlag"
        :editable="editable"
        :scrollStyle="scrollStyle"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'AdminMarkdown',
  props: ['field', 'value'],
  data () {
    return {
      inputValue: this.value,
      subfield: true, // 单双栏模式
      defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
      editable: true,
      toolbarsFlag: false,
      scrollStyle: true
    }
  },
  watch: {
    inputValue: function (newValue, oldValue) {
      this.$emit('input', newValue)
    },
    value: function (newValue, oldValue) {
      this.inputValue = newValue
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mavon-editor {
  width: 100%;
  height: 550px;
}
</style>
