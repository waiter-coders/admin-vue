<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :search="config.search" @search="handleSearch"></search>
      <actions class="list-public-actions" :actions="config.publicActions" @download="handleDownload"></actions>
    </div>    
    <table-list class="list-table" :listData="listData" :itemActions="config.itemActions" :publicActions="config.publicActions.length > 0"></table-list>
    <paging class="list-paging" 
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :pageSize="pageSize" 
    :total="total" 
    :currentPage="currentPage"
    ></paging>
  </div>
  
</template>

<script>
import { getList } from '@/api/factory/list'
import Search from './list/Search';
import Actions from './list/Actions';
import TableList from './list/Table';
import Paging from './list/Paging';
import { Loading } from 'element-ui';

export default {
  name: 'List',
  props:['config'],
  data () {
    return {
      listData:{},
      pageSize: 30,
      total: 0,
      currentPage: 1,
    }
  },
  components: {
    TableList,
    Actions,
    Search,
    Paging
  },
  created() {
    this.getList('/paging/list', this.currentPage, this.pageSize);
  },
  methods: {
      getList(url, currentPage, pageSize, searchs) {
        var loadingInstance = Loading.service({ target:'.list-table', text:'加载中……'});
        getList(url, currentPage, pageSize, searchs).then(res=>{
          this.listData = res.data;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total
        });
        loadingInstance.close();
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getList('/paging/list', this.currentPage, this.pageSize);
      },
      handleSearch(searchValue) {
        this.getList('/paging/list', 1, this.pageSize, searchValue);
      },
      handleDownload(){
        this.$alert('下载');
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
  flex: 0 0 auto;
}
.list-public-actions{
  flex: 0 0 auto;
}

</style>
