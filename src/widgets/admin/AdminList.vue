<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :config="search" @search="searchClick" v-if="search.fields.length > 0"></search>
      <button-group class="list-table-actions" :actions="tableActions" @click="actionsClick" v-if="tableActions.length > 0"></button-group>
    </div>    
    <table-list class="list-table" :config="list" @click="actionsClick"></table-list>
    <paging class="list-paging" 
    @changePaging="changePaging"
    :config="paging"
     v-if="paging.totalNum > paging.pageSize"></paging>
  </div>
  
</template>

<script>
import { getList, getTotalNum, deleteByIds } from '@/api/admin/adminList'
import ButtonGroup from '@/widgets/public/ButtonGroup'
import Search from '@/widgets/public/Search'
import TableList from './list/Table'
import Paging from './list/Paging'
import { Loading } from 'element-ui'

import fetch from '@/utils/service'
import pageUtil from '@/utils/page'

export default {
  name: 'AdminList',
  props:['config'],
  data () {
    return {
      baseUrl:this.$route.path,
      fields:[],
      search:{'url':this.$route.path, 'fields':[]},
      tableActions:[],
      list:{fields:[], rowActions:[], data:[]},
      paging:{
        pageSize: 12,
        totalNum: 0,
        currentPage: 1,
      }      
    }
  },
  components: {
    TableList,
    ButtonGroup,
    Search,
    Paging
  },
  created() {
    this.fields = this.config.fields;
    this.search.fields = this.filterSearchFields(this.config.search, this.config.fields);
    this.tableActions = this.config.tableActions;
    this.list.fields = this.fields;
    this.list.rowActions = this.config.rowActions;
    this.paging.pageSize = 'pageSize' in this.config.paging ? this.config.paging['pageSize'] : 12;    
    this.reloadData();
  },
  methods: {
      reloadData() {
        var search = [];
        var _this = this;
        // var loading = Loading.service({ target:'.list-table', text:'加载中……', fullscreen: false});
        getTotalNum(_this.baseUrl, search).then(totalNum=>{
          _this.paging.totalNum = parseInt(totalNum);
          if (totalNum == 0) {
            return Promise.resolve([]);
          }          
          var offset = (_this.paging.currentPage - 1) * _this.paging.pageSize;
          return getList(_this.baseUrl, search, _this.paging.pageSize, offset);          
        }).then(data=>{
          _this.list.data = data;
          // loading.close();
        });;
        
      },
      changePaging(paging) {
        this.paging = paging;
        this.reloadData();
      },
      searchClick(searchValue) {
        // this.search = searchValue;
        this.reloadData();
      },
      actionsClick(action, params) {
        var _this = this;
          var type = 'type' in params ? params.type : 'page'
          if (type == 'page') {
            this.$router.push({ path: params.url , params: params.params})
          }
          else if (type == 'ajax') {
            pageUtil.fetch(params.url, params, params.confirm, params.success, params.error).then(function(){
              _this.reloadData()
            })
          }
          else if (type == 'dialog') {

          }
      },
      filterSearchFields(searchFields, allFields){
        var fields = [];        
        allFields.forEach(row => {
          searchFields.forEach((search, index) => {
            if (search.field == row.field) {
              fields[index] =row;
              fields[index]['searchType'] = search.searchType;
            }
          });
          
        });
        return fields;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container{
  padding:20px 30px;
}
.list-header{
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.list-search{
  flex: 1;
}
.list-table-actions{
  flex: 1;
  text-align: right;
}

</style>
