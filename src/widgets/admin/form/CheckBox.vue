<template>
    <div>
        <el-form-item v-bind:label="field.name">
            <el-checkbox-group v-model="formData[field.field]">
                <el-checkbox v-for="(item,key) in field.map" v-bind:label="key" v-bind:key="key" v-bind:checked=" ( field.value && field.value.includes(key) )">{{item}}</el-checkbox>
                <!-- v-bind:checked="field.value && field.value.includes(key)" -->
            </el-checkbox-group>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: "CheckBox",
  data() {
    return {
      formData: this.initElementData(this.field.field, this.field.value)
    };
  },
  props: ["field"],
  methods: {
    initElementData: function(key, value) {
      var model = {};
      model[key] = value || new Array();
      return model;
    },
    checkElementLegal() {
      return this.formData[this.field.field].length > 0;
    },
    getElementData: function() {
      return this.formData;
    }
  }
};
</script>

