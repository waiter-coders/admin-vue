<template>
  <div>
  	<el-form-item :label="field.name" v-if="!field.primaryKey">
      <el-input v-model="field.value" :name="field.field"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import { initFormData } from "@/utils/loader";
export default {
  name: "AdminInput",
  props: ["field"],
  mounted: function() {
    //console.log(this.formData);
  },
  methods: {
    checkElementLegal() {
      return this.field.value.length > 0;
    },
    getElementData() {
      var result = {};
      result[this.field.field] = this.field.value;
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
