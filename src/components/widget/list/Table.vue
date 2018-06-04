<template> 
  <el-table :data="listData.list" border width="800">
      <el-table-column v-for="item in listData.fields" v-if="item.type!='enum'"  :prop="item.field" 
            :label="item.name" :key="item.id"></el-table-column>
      <el-table-column v-for="item in listData.fields" v-if="item.type=='enum'" :prop="item.field" 
            :label="item.name" :key="item.id"  :formatter="optionFormatter"></el-table-column>
  </el-table>
</template>
<script>

export default {
  name: 'tableList',
  props: {
   listData: Object
  },
  methods:{
      optionFormatter(value,row,column){
          var fields = this.listData.fields;
          var format = fields.find(function(val,i){
              if(val.field == row.property){
                  return val;
              }
          });
          return format.enum[value[row.property]];      
      }
  }
}
</script>
<style lang="scss" scoped>

</style>

