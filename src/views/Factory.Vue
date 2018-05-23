<template>
    <div>
        <component :is="component.type" :config="component.config" v-for="component in components" v-bind:key="component.index">组件初始化失败</component>
    </div>
</template>

<script>
import ConfigApi from '@/api/factory/config'

import {Form, List, Statistics} from '@/components/widget'
export default {
    name: 'factory',
    components:{
        Form, List, Statistics
    },        
    data() {
        components: []
    },
    created:function(){
        this.getComponents();
    },
    methods:{
        getComponents(){
            ConfigApi.getConfig().then(function(response){
                this.components = [];
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