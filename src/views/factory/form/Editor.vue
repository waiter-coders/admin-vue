<template>
    <div class="editor">
        <el-form-item :label="field.name">
            <vue-editor v-model="editorData" @imageAdded="uploadImage"></vue-editor>
        </el-form-item>
        
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import service from '@/utils/service'
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
  },
  methods: {
    uploadImage: function (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('editor-uploader', file)
      service.post({
        url: this.$route.path + '/formUpload',
        method: 'POST',
        data: formData
      }).then(function () {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.editor {
  margin-bottom: 20px;
}
</style>

