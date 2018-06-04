<template>
    <div>
        <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item>
                <el-input placeholder="请输入搜索内容" v-model="searchValue"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  icon="el-icon-search" @click="searchResult">搜索</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
export default {
    name: 'search',
    props: {
      search: Array
    },
    data(){
        return {
            searchValue: ''
        }
    },
    methods: {
        searchResult: function(){
            this.$emit('search', this.searchValue);
        }
    }
}
</script>

