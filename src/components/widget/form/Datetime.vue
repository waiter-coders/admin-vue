<template>
    <div>
        <el-form-item :label="field.name">
            <el-date-picker :type="field.datetime" v-model="formData[field.field]" :value-format="field.datetime | time"></el-date-picker>
        </el-form-item>
    </div>
</template>
<script>
import { initFormData, timeFormat } from '@/utils/loader';
export default {
    name: 'datetime',
    data() {
        return {
            formData: initFormData( this.field.field )
        }
    },
    props: ['field'],
    filters:{
        time: function(val){
            return timeFormat[val];
        }
    },
    methods: {

    }
}
</script>

