<template>
    <div>
        <component :is="config.type" :config="config" v-for="(config,index) in configs" v-bind:key="index">组件初始化失败</component>
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
            var controller = _this.$route.path;
            _this.$store.dispatch('addConfig', controller);
            getConfigs(controller).then(function(response){
                ///var configs = [];
                console.log( response.data );
                // for (var i = 0; i < response.data.length; i++) {
                //     var config = response.data[i];  
                //    // console.log( config );    
                //     config.index = i;
                //     configs.push(config);
                // }
                _this.configs = response.data;
                //console.log( configs );
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