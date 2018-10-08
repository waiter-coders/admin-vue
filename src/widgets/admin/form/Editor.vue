<template>
    <div class="editor">
        <el-form-item :label="field.name">
            <vue-editor v-model="editorData"></vue-editor>
        </el-form-item>
        
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'editor',
  props: ['field', 'value'],
  components: {
    VueEditor
  },
  data () {
    return {
      id: 'editor1',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      editorData: this.value
    }
  },
  watch: {
    editorData: function (newValue, oldValue) {
      this.$emit('input', newValue)
    },
    value: function (newValue, oldValue) {
      this.editorData = newValue
    }
  }
}
</script>
<style lang="scss" scoped>
.editor {
  margin-bottom: 20px;
}
</style>

