<template>
 <div>主页{{ msg }}</div>
</template>

<script>
 // 获取域的config信息，根据config信息装载对应模块
    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: 'sss'
            }
        },
        method:{
            getConfig:function(){
                alert(1);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
