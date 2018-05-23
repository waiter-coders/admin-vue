<template>
    <div>
        <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item>
                <el-input placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
        return {
            "search" : [
                {"field":"username", "type":"text", "search":"like"},
                {"field":"sex", "type":"select"}
            ],
        }
    },
    methods: {

    }
}
</script>

