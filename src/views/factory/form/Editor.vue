<template>
    <div class="editor">
        <el-form-item :label="field.name">
            <mce-editor v-model="editorData" class="editor" :uploadImageHandle="uploadImage" :init="init"></mce-editor>
        </el-form-item>        
    </div>
</template>
<script>

import MceEditor from './editor/Tinymve'
import service from '@/utils/service'

export default {
  name: 'editor',
  props: ['field', 'value'],
  components: {
    MceEditor
  },
  data () {
    return {
      id: 'editor1',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      editorData: this.value,
      init: {
        height: 500,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste imagetools wordcount'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
        // imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      }
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
    uploadImage: function (file) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('editor', file)
        return service.post(this.$route.path + '/editorUpload?field=editor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: this.query
        }).then(response => {
          resolve(response)
        })
      })
    },
    whenCopy: function () {

    }
  }
}
</script>
<style lang="scss" scoped>
.editor {
  margin-bottom: 20px;
  width: 950px;
  height:650px;
}
</style>

