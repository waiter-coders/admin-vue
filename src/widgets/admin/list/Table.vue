<template> 
  <el-table :data="config.data" border width="800">
        <!-- <el-table-column v-if="tableActions" type="selection" width="50"></el-table-column> -->
        <el-table-column v-for="item in config.fields" v-if="item.type!='enum'"  :prop="item.field" 
            :label="item.name" :key="item.id"></el-table-column>
        <el-table-column v-for="item in config.fields" v-if="item.type=='enum'" :prop="item.field" 
            :label="item.name" :key="item.id"  :formatter="optionFormatter"></el-table-column>
        <el-table-column v-if="config.rowActions.length > 0" label="操作">
            <template slot-scope="scope">
                <button-group class="list-table-actions" :actions="config.rowActions" @click="rowActionClick" v-if="config.rowActions.length > 0"></button-group>
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
      rowActionClick(action, params){         
        this.$emit('click', action, params)
      }
  }
}
</script>
<style lang="scss" scoped>

</style>

