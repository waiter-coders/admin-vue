<template>
    <div class="editor">
        <el-form-item v-bind:label="field.name">
            <vue-editor v-model="formData[field.field]"></vue-editor>
        </el-form-item>
        
    </div>
</template>
<script>
import { initFormData } from "@/utils/loader";
//  import { VueEditor } from "vue2-editor";
export default {
  name: "editor",
  components: {
    //  VueEditor
  },
  data() {
    return {
      id: "editor1",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      //  content:"<h1>Some initial content</h1>",
      formData: initFormData(this.field.field, this.field.value)
    };
  },
  props: {
    field: {
      type: Object
    }
  },
  methods: {
    getElementData() {
      return this.formData;
    }
  }
};
</script>
<style lang="scss" scoped>
.editor {
  margin-bottom: 20px;
}
</style>

