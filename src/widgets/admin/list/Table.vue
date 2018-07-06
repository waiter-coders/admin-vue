<template> 
  <el-table :data="config.data" border width="800">
        <el-table-column v-for="item in config.fields" v-if="item.type!='enum'"  :prop="item.field" 
            :label="item.name" :key="item.id"></el-table-column>
        <el-table-column v-for="item in config.fields" v-if="item.type=='enum'" :prop="item.field" 
            :label="item.name" :key="item.id"  :formatter="optionFormatter"></el-table-column>
        <el-table-column v-if="config.rowActions.length > 0" label="操作">
            <template slot-scope="scope">
                <button-group class="list-table-actions" :actions="actionFomrmatter(config.rowActions, scope.row)" @click="rowActionClick" v-if="config.rowActions.length > 0"></button-group>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
import ButtonGroup from '@/widgets/public/ButtonGroup';
export default {
  name: 'tableList',
  components:{ButtonGroup},
  props: ['config'],
  methods:{
      optionFormatter(value,row,column){ 
          var fields = this.fields;
          var format = fields.find(function(val,i){
              if(val.field == row.property){
                  return val;
              }
          });
          return format.enum[value[row.property]];      
      },
      actionFomrmatter(rowActions, rowData){
        var newRowActions = rowActions//.splice(0)
        var primaryKey = this.config.fields.filter(function(row){return 'primaryKey' in row})[0].field;
        return newRowActions.map(function(action){
            for (var field in rowData) {
                action.url = action.url.replace('@data.' + field, rowData[field])
            }            
            action.url = action.url.replace('@primaryKey', primaryKey)
            return action
        })
      },
      rowActionClick(action, params){         
        this.$emit('click', action, params)
      }
  }
}
</script>
<style lang="scss" scoped>

</style>

