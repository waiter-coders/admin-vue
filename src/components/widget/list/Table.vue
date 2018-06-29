<template> 
  <el-table :data="listData.list" border width="800">
        <el-table-column v-if="publicActions" type="selection" width="50"></el-table-column>
        <el-table-column v-for="item in listData.fields" v-if="item.type!='enum'"  :prop="item.field" 
            :label="item.name" :key="item.id"></el-table-column>
        <el-table-column v-for="item in listData.fields" v-if="item.type=='enum'" :prop="item.field" 
            :label="item.name" :key="item.id"  :formatter="optionFormatter"></el-table-column>
        <el-table-column v-if="itemActions.length > 0" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" v-for="(action, index) in itemActions" :key="'itemAction_'+index" @click="handleAction( scope.row, action)">{{action.name}}</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>

export default {
  name: 'tableList',
  props: {
   listData: Object,
   itemActions: Array,
   publicActions: Boolean
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
      },
      handleAction(row, action){         
          console.log( row );
          console.log( action );
          if (action.type == 'page') {
              this.$router.push( {path: action.url, query: {id: row.id}});
          } 
      }
  }
}
</script>
<style lang="scss" scoped>

</style>

