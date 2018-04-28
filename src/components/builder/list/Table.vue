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
            {"id":1,"name":"名字1", "publishTime":"2017-12-12 00:11:11","username":"nihao","sex":"男"},
            {"id":2,"name":"名字2", "publishTime":"2017-12-12 00:11:11","username":"sss","sex":"女"}
        ]
      }
  },
  methods:{
      optionFormatter(value,row,column){
          console.log(row);
          console.log(column);
          console.log(value);
          return 2;
      }
  }
}
</script>
<style lang="scss" scoped>

</style>

