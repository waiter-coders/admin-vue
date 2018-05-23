<template> 
  <el-table :data="list" border width="800">
      <el-table-column v-for="item in fields" v-if="item.type!='enum'"  :prop="item.field" 
            :label="item.name" :key="item.id"></el-table-column>
      <el-table-column v-for="item in fields" v-if="item.type=='enum'" :prop="item.field" 
            :label="item.name" :key="item.id"  :formatter="optionFormatter"></el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'tableList',
  data(){
      return {
        fields:[
            {"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},
            {"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
            {"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}}
        ],
        list:[
            {"id":1, "name":"名字1", "publishTime":"2017-12-12 00:11:11", "username":"nihao","sex":"1"},
            {"id":2, "name":"名字2", "publishTime":"2017-12-12 00:11:11", "username":"sss","sex":"2"},
            {"id":1, "name":"名字1", "publishTime":"2017-12-12 00:11:11", "username":"nihao","sex":"2"},
            {"id":2, "name":"名字2", "publishTime":"2017-12-12 00:11:11", "username":"sss","sex":"2"}
        ]
      }
  },
  methods:{
      optionFormatter(value,row,column){
          var fields = this.fields;
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

