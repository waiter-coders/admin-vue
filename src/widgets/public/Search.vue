<template>
    <div>
        <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item v-for="item in config.fields" :key="item.field">
                <el-input v-if="item.type == 'varchar'" :name="item.field" :placeholder="item.inputTip" v-model="searchData[item.field]"></el-input>
                <el-select v-if="item.type == 'enum'" v-model="searchData[item.field]" placeholder="请选择">
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
export default {
    name: 'search',
    props: ['config'],
    data(){
        return {
                searchData: this.getSearchData()
            }
    },
    methods: {
        search: function(){
            this.$emit('search', this.searchData);
        },
        getSearchData: function(){
            var searchModel = {}
            var item
            for (item in this.search) {
                searchModel[this.search[item].field] = this.search[item].value
            }
            return searchModel
        }
    }
}
</script>

