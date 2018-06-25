<template>
    <div>
        <el-form-item :label="field.name">
            <el-checkbox-group v-model="formData[field.field]">
                <el-checkbox v-for="(item,key) in field.multi" :name="field.field" :label="item" :key="key">{{item}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
    </div>
</template>
<script>
export default {
    name:'CheckBox',
    data() {
        return {
            formData: this.getFormData()
        }
    },
    props:['field'],
    methods: {
        getFormData: function(){
            var model = {};
            model[this.field.field] = [];
            //console.log(model);
            return model;
        }
    }
}
</script>

