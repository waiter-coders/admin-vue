<template>
    <div>
        <el-form-item :label="field.name">
            <el-checkbox-group v-model="formData[field.field]">
                <el-checkbox v-for="(item,key) in field.map" :label="key" :key="key" :checked=" ( field.value && field.value.includes(key) )">{{item}}</el-checkbox>
                <!-- :checked="field.value && field.value.includes(key)" -->
            </el-checkbox-group>
        </el-form-item>
    </div>
</template>
<script>
// import { initFormData } from '@/utils/loader';
export default {
    name:'CheckBox',
    data() {
        return {
            //formData: initFormData(this.field.field, this.field.value)
            formData: this.getFormData(this.field.field,this.field.value),
        }
    },
    props:['field'],
    methods: {
        getFormData: function(field, val){
            let model = {};
            model[field] = val || new Array();
            return model;
        }
    }
}
</script>

