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
import { initFormData } from '@/utils/loader';
export default {
    name:'CheckBox',
    data() {
        return {
            formData: initFormData(this.field.field)
        }
    },
    props:['field'],
    methods: {

    }
}
</script>

