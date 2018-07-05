<template>
    <div>
        <component :is="config.type" :config="config" v-for="(config,index) in configs" v-bind:key="index">组件初始化失败</component>
    </div>
</template>

<script>
import { getConfigs } from '@/api/admin/adminRender'

import {AdminForm, AdminList, AdminStatistics} from '@/widgets/admin'
export default {
    name: 'factory',
    components:{
        AdminForm, AdminList, AdminStatistics
    },        
    data() {
        return {
            configs: []
        };
    },
    created:function(){
        this.getConfigs();
    },
    methods:{
        getConfigs(){
            var _this = this;
            var controller = _this.$route.path;
            // _this.$store.dispatch('addConfig', controller);
            getConfigs(controller).then(function(response){
                _this.configs = response;
                console.log(_this.configs);
            });
        },
    }
}
</script>

<style lang="scss">
 .app-wrapper{
  width:100%;
  height:100%;
 .main-container{
  min-height:100%;
  margin-left:180px;
  transition:margin-left 0.28s;
 }
 .menu-wrapper{
  width:180px;
 }
 &.hideSidebar{
 .main-container{
  margin-left:64px;
 }
 .menu-wrapper{
  width:64px;
 }
 }
 }

</style>