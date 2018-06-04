<template>
<div>
    <el-button type="primary" v-for="action in actions" v-bind:key="action.index">{{ action.name }}</el-button>
</div>
</template>
<script>
export default {
    data(){
        return {
            actions:[
                {"name":"添加", "index":0},
                {"name":"复制", "index":1},
                {"name":"下载", "index":2},
            ]
        };
    }
}
</script>

<style scoped>

</style>
