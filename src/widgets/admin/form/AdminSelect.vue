<template>
  <div>
  	<el-form-item v-bind:label="field.name">
      <el-select v-model="field.value" v-bind:name="field.field">
        <el-option v-for="(item,key) in field.map" v-bind:key="'option_'+key" v-bind:label="item" v-bind:value="key"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import { initFormData } from "@/utils/loader";
export default {
  name: "AdminSelect",
  data() {
    return {
      formData: initFormData(this.field.field, this.field.value)
    };
  },
  props: ["field"],
  mounted: function() {
    console.log(this.formData);
  },
  methods: {
    checkElementLegal() {
      return this.formData[this.field.field] != "";
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
