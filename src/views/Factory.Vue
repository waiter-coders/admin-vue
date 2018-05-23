<template>
    <div>
        <component :is="component.type" :config="component.config" v-for="component in components" v-bind:key="component.index">组件初始化失败</component>
    </div>
</template>

<script>
import { getConfig } from '@/api/factory/config'

import {Form, List, Statistics} from '@/components/widget'
export default {
    name: 'factory',
    components:{
        Form, List, Statistics
    },        
    data() {
        return {
            components: []
        };
    },
    created:function(){
        this.getComponents();
    },
    methods:{
        getComponents(){
            var _this = this;
            getConfig('aa').then(function(response){
                var configs = [];
                for (var i = 0; i < response.data.length; i++) {
                    var config = response.data[i];      
                    config.index = i;
                    configs.push(config);
                }
                _this.components = configs;
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