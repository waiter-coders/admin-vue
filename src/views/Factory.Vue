<template>
    <div>
        <component :is="config.type" :config="config" v-for="config in configs" v-bind:key="config.index">组件初始化失败</component>
    </div>
</template>

<script>
import { getConfigs } from '@/api/factory/config'

import {Form, List, Statistics} from '@/components/widget'
export default {
    name: 'factory',
    components:{
        Form, List, Statistics
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
            getConfigs('aa').then(function(response){
                var configs = [];
                for (var i = 0; i < response.data.length; i++) {
                    var config = response.data[i];      
                    config.index = i;
                    configs.push(config);
                }
                _this.configs = configs;
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