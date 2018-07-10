<template>
    <div>
        <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item v-for="item in config.fields" :key="item.field">
                <el-input v-if="item.type == 'string'" :name="item.field" :placeholder="item.inputTip" v-model="item.value"></el-input>
                <el-select v-if="item.type == 'select'" v-model="item.value" placeholder="请选择">
                    <el-option
                    v-for="(value, index) in item.enum"
                    :key="index"
                    :label="value"
                    :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>        
    </div>
</template>
<script>
/*
【search 组件】
提供行级的搜索渲染功能

@配置：
config:{
    fields:[
        {name:"", field:"", type:"", value:""} // type包括：string number text html select multiSelect linkSelect date datetime image file等
    ]
}

@事件：
search(searchData)

*/
export default {
    name: 'search',
    props: ['config'],
    methods: {
        search: function(){
            this.$emit('search', this.getSearchData());
        },
        getSearchData: function(){
            var data = {}
            for (var item in this.config.fields) {
                data[this.config.fields[item].field] = this.config.fields[item].value
            }
            return data
        }
    }
}
</script>

